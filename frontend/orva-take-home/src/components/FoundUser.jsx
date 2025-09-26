import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Octokit } from 'octokit';
import { UserDisplay } from './userDisplay';
import { RepoList } from './RepoList';
import { NotFoundPage } from './NotFoundPage';

export const FoundUser = () => {

    let params = useParams();
    const octokit = new Octokit({
        userAgent: "annas-take-home",
        auth: import.meta.env.VITE_GIT_TOKEN,
    });

    const [currentUser, setCurrentUser] = useState(null);
    const [currentRepos, setCurrentRepos] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchGithubUserData() {

        // fetch user from github using username param
        try {
            setLoading(true);
            const user = await octokit.request('GET /users/{username}', {
                username: params.username,
                headers: { 'accept': 'application/vnd.github+json' }
            });

            // if request successful --> return the user
            return user;

        } catch (error) {
            if (error.status === 404) {
                console.error("OH NOES! USER NOT FOUND :(");
            } else {
                console.error("This request was cursed by an unexpected error");
            }

            return null;
        } finally {
            setLoading(false);
        }
    }

    async function fetchGithubUserRepos() {
        try {
            setLoading(true);
            const repos = await octokit.request('GET /users/{username}/repos', {
                username: params.username,
                headers: { 'accept': 'application/vnd.github+json' }
            });

            // if request successful --> return the repos
            return repos;

        } catch (error) {
            if (error.status === 422) {
                console.error("OH NOES! VALIDATION FAILED OR ENDPOINT SPAMMED");
            } else {
                console.error("This request was cursed by an unexpected error");
            }

            return null;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            const user = await fetchGithubUserData();
            console.log(user);
            if (user) {
                const repos = await fetchGithubUserRepos();
                if (repos) {
                    setCurrentUser(user);
                    setCurrentRepos(repos);
                    return true;
                }
            }

            return false;
        }

        const res = fetchData();

    }, [params]);

    return (
        <>
            {currentUser && currentRepos ? (
                <>
                    <UserDisplay user={currentUser} />
                    <RepoList repos={currentRepos}/>
                </>
            )
                : <NotFoundPage />}
        </>
    )
}