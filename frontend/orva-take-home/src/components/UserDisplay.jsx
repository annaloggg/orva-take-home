export const UserDisplay = ({user}) => {

    return (
        <>
        <img src={user.data.avatar_url}/>
        <h1>{user.data.login}</h1>
        <p>{user.data.bio}</p>
        </>
    )

}