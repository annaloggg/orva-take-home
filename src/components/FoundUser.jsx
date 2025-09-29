import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Octokit } from 'octokit';
import { UserDisplay } from './userDisplay';
import { RepoList } from './RepoList';
import { NotFoundPage } from './NotFoundPage';
import { NavButtons } from './NavButtons';
import { LoadingPage } from './LoadingPage';

export const FoundUser = () => {

    let params = useParams();
    const octokit = new Octokit({
        userAgent: "annas-take-home",
        auth: import.meta.env.VITE_GIT_TOKEN,
    });

    const [currentUser, setCurrentUser] = useState(null);
    const [currentRepos, setCurrentRepos] = useState(null);
    const [displayedRepos, setDisplayedRepos] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageMin, setPageMin] = useState(0);
    const [pageMax, setPageMax] = useState(29);
    const [numRepos, setNumRepos] = useState(0);
    const reposRef = useRef(null);

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
            const repos = await octokit.paginate('GET /users/{username}/repos', {
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

    function handleDisplayNext(repos) {

            const repositories = repos ? repos : currentRepos;

            const newMin = (currentPage-1) * 30;
            const newMax = (currentPage * 30) - 1;
            setPageMin(newMin);
            setPageMax(newMax);
            
            const toBeDisplayed = repositories.slice(newMin, newMax);
            setDisplayedRepos(toBeDisplayed);
    }

    // handle change in params
    useEffect(() => {
        const fetchData = async () => {
            const user = await fetchGithubUserData();
            if (user) {
                const repos = await fetchGithubUserRepos();
                if (repos) {
                    setCurrentUser(user);
                    setCurrentRepos(repos);
                    setNumRepos(user.data.public_repos);
                    handleDisplayNext(repos);

                    return true;
                }
            }



            return false;
        }

        fetchData();

    }, [params]);

    // handle change in page
    useEffect(() => {

        if (reposRef.current) {
            reposRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }

        if (currentRepos) { handleDisplayNext(); }

    }, [currentPage]);

    return (
        <>
            {currentUser && currentRepos ? (
                <div className='h-screen font-Coolvetica bg-neutral-50 flex flex-col justify-between'>
                    <header className="z-10 flex flex-col justify-center items-center py-6 shadow-sm">
                        <UserDisplay user={currentUser} />
                    </header>
                    <RepoList repos={displayedRepos ? displayedRepos : currentRepos} ref={reposRef} />
                    <footer>
                        {numRepos > 30 ? <NavButtons
                            numberRepos={numRepos}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        /> : <></>}
                    </footer>

                </div>
            )
                : loading ?
                    <LoadingPage />
                    :
                    <NotFoundPage />}

        </>
    )
}