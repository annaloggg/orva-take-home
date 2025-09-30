import { Octokit } from 'octokit';

const octokit= new Octokit({
    userAgent: "annas-take-home",
    auth: import.meta.env.VITE_GIT_TOKEN,
});

export async function fetchGithubUserData(username) {

    // fetch user from github using username param
    const user = await octokit.request('GET /users/{username}', {
        username: username,
        headers: { 'accept': 'application/vnd.github+json' }
    });

    return user;
}

export async function fetchGithubUserRepos(username, repoLink) {
    const repos = await octokit.request(`GET ${repoLink}`, {
        username: username,
        headers: { 'accept': 'application/vnd.github+json' }
    });

    return repos;
}