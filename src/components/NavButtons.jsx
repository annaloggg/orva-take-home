export const NavButtons = ({numberRepos, currentPage, setCurrentPage }) => {

    const handlePrevRepos = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }

    }

    const handleNextRepos = () => {
        setCurrentPage(currentPage + 1);
    }

    const buttonStyle = "mx-2 py-2 px-4 bg-stone-200 rounded-full";
    const lastPage = numberRepos/30;

    return (
        <div className="inset-shadow-sm py-6 flex flex-row justify-center items-center">
            <button disabled={currentPage == 1} className={buttonStyle + (currentPage === 1 ? " cursor-not-allowed opacity-50" : " hover:bg-stone-300 ")} onClick={handlePrevRepos}>prev</button>
            <h6>{currentPage}</h6>
            <button disabled={currentPage >= lastPage} className={buttonStyle + (currentPage >= lastPage ? " cursor-not-allowed opacity-50" : " hover:bg-stone-300 ")} onClick={handleNextRepos}>next</button>
        </div>
    )


}