export const UserDisplay = ({user}) => {

    return (
        <>
        <img src={user.data.avatar_url}/>
        <h1>
            <a href={user.data.html_url}>
                {user.data.login}
            </a>
        </h1>
        <p>{user.data.bio}</p>
        </>
    )

}