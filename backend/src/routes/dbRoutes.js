import express from 'express';
import prisma from '../prismaClient.js';

// add all our API endpoints to the router
// exported to server file to use there

export const dbRoutes = {

    // 1. get users from db --> GET
    async fetchUserFromDb(username) {
        try {

            const user = await prisma.user.findUnique({
                where: { username }
            });

            return user ? user : null;

        } catch (error) {
            console.error(error);
        }
    },

    // 2. insert users into db --> POST
    async insertUserInDb(props) {
        
        const {
            gitId,
            username,
            name,
            htmlUrl,
            apiUrl,
            bio,
            avatarUrl,
            etag,
            repos } = props;

        try {

            const user = await prisma.user.create({
                data: {
                    gitId,
                    username,
                    name,
                    htmlUrl,
                    apiUrl,
                    bio,
                    avatarUrl,
                    etag,
                    repos
                }
            })

            return user ? user : null;

        } catch (error) {
            console.error(error);
        }
    },

    // 3. update user in db --> PUT
    async updateUserInDb(props) {
        const {
            gitId,
            username,
            name,
            htmlUrl,
            apiUrl,
            bio,
            avatarUrl,
            etag,
            repos
        } = props

        try {

            const updatedUser = await prisma.user.update({
                where: {username},
                data: {
                    gitId,
                    username,
                    name,
                    htmlUrl,
                    apiUrl,
                    bio,
                    avatarUrl,
                    etag,
                    repos
                }
            });

            res.json(updatedUser);

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}
