export const NavButtons = ({ numRepos, repos, setRepos, currentPage, setCurrentPage }) => {

    const handlePrevRepos = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
        
    }

    const handleNextRepos = () => {
        setCurrentPage(currentPage + 1);
    }

    // parse link to get last page number
    const getLastPage = (lastPattern) => {

        if (lastPattern) {
            const link = lastPattern[0];
            const urlObj = new URL(link);
            const lastPage = urlObj.searchParams.get("page");
            return lastPage;
        }

        return null;

    }


    if (repos.headers.link) {

        const link = repos.headers.link;
        const buttonStyle = "mx-2 py-2 px-4 bg-stone-200 rounded-full"

        const prevPattern = link.match(/(?<=<)([\S]*)(?=>; rel="prev")/i);
        const nextPattern = link.match(/(?<=<)([\S]*)(?=>; rel="next")/i);
        const lastPattern = link.match(/(?<=<)([\S]*)(?=>; rel="last")/i);
        const lastPage = getLastPage(lastPattern);

        return (
            <div className="pb-12 flex flex-row justify-center items-center">
               
                    <button disabled={currentPage == 1} className={buttonStyle + (currentPage === 1 ? " cursor-not-allowed opacity-50" : " hover:bg-stone-300 ")} onClick={handlePrevRepos}>prev</button>
                
                <h6>{currentPage}</h6>
                
                    <button disabled={currentPage >= lastPage} className={buttonStyle + (currentPage >= lastPage ? " cursor-not-allowed opacity-50" : " hover:bg-stone-300 ")}  onClick={handleNextRepos}>next</button>
            </div>
        )

    } else {
        return (
            <>
            </>
        )
    }

}