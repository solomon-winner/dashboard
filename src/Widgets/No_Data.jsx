export const No_Data = ({resourceName}) => {
    return(
        <>
         <h4 className="px-9 py-2 font-bold text-sm">{resourceName}:</h4>
         <div className="flex justify-center items-center bg-gray-100 rounded-md p-4">
            <p className="text-gray-500 font-semibold">No {resourceName} information available.</p>
         </div>
         </>
    )
}