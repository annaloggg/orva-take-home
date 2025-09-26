import express from 'express';
import prisma from '../prismaClient.js';
import { githubRoutes } from './githubRoutes.js';
import { dbRoutes } from './dbRoutes.js';

/*
    Overall Workflow:
    1. Attempt to fetch user data from db
        a. If user in db
            i. return user
            ii. get etag
            iii. make API call if etag has changed, else return stored user
        b. If user not in db --> make octokit api call
            i. store user data in the db
*/
const router = express.Router();

router.get('/:username', async (req, res) => {

    const { username } = req.params;

    try {

        const userInDb = await prisma.user.findUnique({ where: { username } });         // check if user already in db
        const updated = userInDb ?
            await githubRoutes.fetchUserData(username, userInDb.etag) :                 // in db --> pass stored etag to check for update
            await githubRoutes.fetchUserData(username, null);                           // not in db --> pass null etag

        if (userInDb) {     // CASE: User already in db

            if (updated && updated.status === 200) {           // if user data has changed

                const updatedUser = await prisma.user.update({      // update db values
                    where: { username },
                    data: {
                        "gitId": updated.user.data.id,
                        "username": username,
                        "name": updated.user.data.name,
                        "htmlUrl": updated.user.data.html_url,
                        "apiUrl": updated.user.data.url,
                        "bio": updated.user.data.bio,
                        "avatarUrl": updated.user.data.avatar_url,
                        "etag": updated.user.headers.etag,
                    }
                });

                res.status(201).json(updatedUser);      // send back updated user from db
            } else if (updated.status === 304) {
                res.status(200).json(userInDb);         // send back stored user from db
            }

        } else {        // CASE: user not already in db

            if (updated && updated.status === 200) {        // if fetch valid

                const newUser = await prisma.user.create({  // add new user to db
                data: {
                    "gitId": updated.user.data.id,
                    "username": username,
                    "name": updated.user.data.name,
                    "htmlUrl": updated.user.data.html_url,
                    "apiUrl": updated.user.data.url,
                    "bio": updated.user.data.bio,
                    "avatarUrl": updated.user.data.avatar_url,
                    "etag": updated.user.headers.etag,
                }
            });

            res.status(201).json({ "new user": newUser });      // return new user

            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("oh noes!");
    }
});

export default router