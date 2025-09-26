export const RepoCard = ({name, desc, stars, languages, url}) => {

    return (
        <>
        <section>
            <h1>
                <a href={url} target="_blank">{name}</a>
            </h1>
            <p>{desc}</p>
            <h3>{stars}</h3>
            <h3>{languages}</h3>
        </section>
        </>
    )
}