import EmptyComponent from "../components/Resource/Utility/EmptyComponent"

export const No_Data = (resourceName) => {
    return(
        <>
         <h4 className="px-9 py-2 font-bold text-sm">{resourceName}:</h4>
         <EmptyComponent/>
         </>
    )
}