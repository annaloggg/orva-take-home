import { RepoCard } from "./repoCard";

export const RepoList = ({repos}) => {

    const repoCards = repos.data.map(repo =>
        <li className="flex flex-col items-center" key={repo.id}>
            <RepoCard
                name={repo.name}
                desc={repo.description}
                stars={repo.stargazers_count}
                languages={repo.language}
                url={repo.html_url}
            />
        </li>
    );

    return (
        <ul>{repoCards}</ul>
    )

}