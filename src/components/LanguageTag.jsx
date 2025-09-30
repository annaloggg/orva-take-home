/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import GitHubColors from 'github-colors';

export const LanguageTag = ({ language }) => {
    const res = GitHubColors.get(language, true);

    return (
        <div className="inline-block mt-4 mb-2">
            <div className="flex flex-row justify-start items-center text-stone-100 bg-stone-700 rounded-full p-2">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: res.color }}
                ></div>
                <p className=" pl-1 text-sm">{language}</p>
            </div>
        </div>
    );
};
