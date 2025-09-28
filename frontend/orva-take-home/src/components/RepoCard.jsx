export const RepoCard = ({ name, desc, stars, languages, url }) => {

    return (
        <>
            <section className="hover:shadow-md hover:bg-stone-100 w-1/2 m-3 p-4 border border-slate-600 rounded-xl ">
                <div className="flex flex-row justify-between">
                    <h1>
                        <a className="text-stone-900 text-2xl pb-2 font-bold" href={url} target="_blank">{name}</a>
                    </h1>
                    <h3>{stars}⭐️</h3>
                </div>
                <p className="pt-1 text-med text-stone-600">{desc}</p>
                <h3 className={languages ? "pt-4" : ""}>{languages}</h3>
            </section>
        </>
    )
}