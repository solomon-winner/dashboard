import { useState } from 'react';
import { useActivityQuery } from "../../redux/Activity/ActivityApi";
import { dateFormat } from '../../redux/DateFormat/dateFormat';

export const Activity = () => {
const [count, setCount] = useState(1);
    const {
        data: user,
        isLoading: userLoading,
        isSuccess: userSuccess,
        isError,
        error
    } = useActivityQuery(count); 
    const History = userSuccess && user.data;
    console.log(History.length)
const seeNext = () => {
    setCount(count+1);
}
const seePrevious = () => {

    setCount(count - 1);
}
    return (
        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
            {History && History.map((history, index) => {
                const subjectType = history.subject_type && history.subject_type.split('\\').pop();

                return (
                    <div className="relative px-4" key={index} >
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        <div className="flex items-center w-full my-6 -ml-1.5">
                            <div className="w-1/12 z-10">
                                <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="w-11/12">
                                <p className="text-sm">
                                    {history.description}
                                    <a href="#" className="text-green-500 font-bold"> {subjectType}</a>.
                                </p>
                                <p className="text-xs text-gray-500">{dateFormat(history.created_at)}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
           <div className="flex justify-around w-full">
{ count !== 1 && <button className="bg-green-400 text-white font-bold py-2 px-4 hover:bg-darkMain rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold outline-none"  onClick={seePrevious}>Previous</button>} 
<span>page: {count}</span>
{History.length === 10 && <button className="bg-green-400 text-white font-bold py-2 px-4 hover:bg-darkMain rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold outline-none"  onClick={seeNext}>Next</button>}
</div>


        </div>
    );
};
