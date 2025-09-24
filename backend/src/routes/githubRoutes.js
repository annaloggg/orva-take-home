import { Octokit } from "octokit";

// create Octokit instance (rest endpoint inst);
const octokit = new Octokit({
    userAgent: "orva-take-home",
    auth: process.env.TOKEN,
});

export const githubRoutes = {

    async fetchUserData(username, etag) {
        try {
            // attempt to fetch data with the Github API
            // header 'if-none-match' flags the request to only return
            // user data if it has been updated since the last retrieval
            const user = await octokit.request('GET /users/{username}', {
                username: username,
                headers: {
                    'accept': 'application/vnd.github+json',
                    ...(etag && { 'If-None-Match': etag })
                }
            });

            if (user && user.status === 200) {          // if the user HAS been updated since last retrieval / first fetch
                return {
                    user: user,
                    status: 200
                };
            }
        } catch (error) {
            if (error.status === 304) {                        // if the user HAS NOT been updated since last retrieval
                console.log("resource not modified");
                return {
                    user: null,
                    status: 304
                }
            } else {
                console.error(error);
            }
        }
    },

    async fetchRepoData(username, etag) {

        try {
            // get repos --> GET /user/repos/
            const repos = await octokit.request('GET /user/{username}/repos', {
                username: username,
                headers: {
                    'accept': 'application/vnd.github+json',
                    'If-None-Match': etag,
                }
            });

            if (repos && repos.status === 200) {             // if the user repos HAVE been updated since last retrieval
                console.log("resource not modified");
                return repos;
            } else if (user && repos.status === 304) {       // if the user repos HAVE NOT been updated since last retrieval
                console.log("resource modified");
                return repos;
            } else {
                console.log("resource not found");           // repos not found (?)
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
