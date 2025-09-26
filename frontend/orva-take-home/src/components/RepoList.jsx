import { RepoCard } from "./repoCard";

export const RepoList = ({repos}) => {

    console.log(repos.data);

    const repoCards = repos.data.map(repo =>
        <li>
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