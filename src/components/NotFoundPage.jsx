/* eslint-disable react/react-in-jsx-scope */
export const NotFoundPage = () => {
    return (
        <div className="flex flex-col justify-center items-center font-Coolvetica bg-neutral-50 h-screen">
            <h1 className="text-5xl pb-4 font-bold">Oh no!</h1>
            <p className="text-lg">
                Looks like we can&apos;t find what you&apos;re looking for
            </p>
            <img className="w-1/2" src="../src/assets/sad.png"></img>
        </div>
    );
};
