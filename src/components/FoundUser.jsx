/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from 'react';
import { UserDisplay } from './userDisplay';
import { RepoList } from './RepoList';
import { NotFoundPage } from './NotFoundPage';
import { NavButtons } from './NavButtons';
import { LoadingPage } from './LoadingPage';
import { fetchGithubUserData } from '../services/apiServices';
import { fetchGithubUserRepos } from '../services/apiServices';
import { useParams } from 'react-router-dom';

export const FoundUser = () => {
    let params = useParams();

    // Handles state of current user + repos
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRepos, setCurrentRepos] = useState(null);
    const [repoLink, setRepoLink] = useState('/users/{username}/repos');

    // Loading State (display loading page while fetching data)
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingRepos, setLoadingRepos] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // Navigation
    const [currentPage, setCurrentPage] = useState(1);
    const reposRef = useRef(null);

    // handle change in params
    useEffect(() => {
        if (reposRef.current) {
            reposRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }

        const fetchData = async () => {
            try {
                setLoadingUser(true);
                setLoadingRepos(true);
                const user = await fetchGithubUserData(params.username);
                const repos = await fetchGithubUserRepos(
                    params.username,
                    repoLink
                );

                setCurrentUser(user);
                setCurrentRepos(repos);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingUser(false);
                setLoadingRepos(false);
                setIsFirstLoad(false);
            }
        };

        fetchData();
    }, [currentPage, params.username, repoLink]);

    if (isFirstLoad) {
        return <LoadingPage />;
    }

    if (!loadingUser && !loadingRepos && (!currentUser || !currentRepos)) {
        return <NotFoundPage />;
    }

    return (
        <div className="h-screen font-Coolvetica bg-neutral-50 flex flex-col justify-between">
            <header className="z-10 flex flex-col justify-center items-center py-6 shadow-sm">
                <UserDisplay user={currentUser} />
            </header>
            <RepoList repos={currentRepos} ref={reposRef} />
            <footer>
                {currentUser.data.public_repos > 30 && (
                    <NavButtons
                        setRepoLink={setRepoLink}
                        repos={currentRepos}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </footer>
        </div>
    );
};
