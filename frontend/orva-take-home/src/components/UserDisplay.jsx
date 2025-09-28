export const UserDisplay = ({user}) => {

    return (
        <>
        <img className="w-3xs rounded-full" src={user.data.avatar_url}/>
        <h1 className="hover:text-stone-950 text-stone-900 text-4xl mt-4 mb-2 font-bold">
            <a href={user.data.html_url}>
                {user.data.login}
            </a>
        </h1>
        <p>{user.data.bio}</p>
        </>
    )

}