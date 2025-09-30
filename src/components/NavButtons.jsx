/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
export const NavButtons = ({
    setRepoLink,
    repos,
    currentPage,
    setCurrentPage,
}) => {
    const handlePrevRepos = (prevLink) => {
        setCurrentPage(currentPage - 1);
        setRepoLink(prevLink[0]);
    };

    const handleNextRepos = (nextLink) => {
        setCurrentPage(currentPage + 1);
        setRepoLink(nextLink[0]);
    };

    const getLastPage = (lastPattern) => {
        if (lastPattern) {
            const link = lastPattern[0];
            const urlObj = new URL(link);
            const lastPage = urlObj.searchParams.get('page');
            return lastPage;
        }

        return null;
    };

    if (repos.headers.link) {
        const link = repos.headers.link;
        const buttonStyle = 'mx-2 py-2 px-4 bg-stone-200 rounded-full';

        // extract links to previous, next, and last pages from link header
        const prevPattern = link.match(/(?<=<)([\S]*)(?=>; rel="prev")/i);
        const nextPattern = link.match(/(?<=<)([\S]*)(?=>; rel="next")/i);
        const lastPattern = link.match(/(?<=<)([\S]*)(?=>; rel="last")/i);
        const lastPage = getLastPage(lastPattern);

        return (
            <div className="inset-shadow-sm py-6 flex flex-row justify-center items-center">
                <button
                    disabled={currentPage == 1}
                    className={
                        buttonStyle +
                        (currentPage === 1
                            ? ' opacity-50'
                            : ' hover:bg-stone-300 ')
                    }
                    onClick={() => {
                        handlePrevRepos(prevPattern);
                    }}
                >
                    prev
                </button>
                <h6>{currentPage}</h6>
                <button
                    disabled={currentPage >= lastPage}
                    className={
                        buttonStyle +
                        (currentPage >= lastPage
                            ? ' opacity-50'
                            : ' hover:bg-stone-300 ')
                    }
                    onClick={() => {
                        handleNextRepos(nextPattern);
                    }}
                >
                    next
                </button>
            </div>
        );
    }
};
