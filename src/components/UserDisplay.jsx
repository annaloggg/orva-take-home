export const UserDisplay = ({ user }) => {

    return (
        <div className="flex flex-row justify-start items-center ">
            <img className="w-30 rounded-full object-contain" src={user.data.avatar_url} />
            <div className="flex flex-col pl-4">
                <h1 className="hover:text-stone-950 text-stone-900 text-3xl/5 mt-4 mb-2 font-bold">
                    <a href={user.data.html_url} target="_blank">
                        {user.data.login}
                    </a>
                </h1>
                <p>{user.data.bio}</p>
            </div>

        </div>
    )

}