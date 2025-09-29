import { forwardRef } from "react";
import { RepoCard } from "./repoCard";

export const RepoList = forwardRef(({repos}, ref) => {

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
        <section ref={ref} className="h-32 flex-1 overflow-y-auto">
            <ul>{repoCards}</ul>
        </section>
    )
});