/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { LanguageTag } from './LanguageTag';

export const RepoCard = ({ name, desc, stars, languages, url }) => {
    return (
        <section
            onClick={() => {
                window.open(url, '_blank', 'noreferrer');
            }}
            className="hover:cursor-pointer hover:shadow-md shadow-sm hover:bg-stone-200 w-2/3 m-3 px-4 py-2 bg-stone-100 rounded-xl "
        >
            <div className="flex flex-row justify-between">
                <h1 className="text-stone-900 text-xl font-bold">{name}</h1>
                <div className="flex flex-row items-center">
                    <h3>{stars}</h3>
                    <i
                        style={{ color: '#ecae03ff' }}
                        className="fa-solid fa-star pl-1"
                    ></i>
                </div>
            </div>
            <p className="hover:cursor-pointer pt-1 text-med text-stone-600">
                {desc}
            </p>
            {languages && <LanguageTag language={languages} />}
        </section>
    );
};
