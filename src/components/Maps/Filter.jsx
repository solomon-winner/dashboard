import { useState } from "react";
import {Search} from "@mui/icons-material"

export const Filter = () => {
    const [filter, setFilter] = useState(
        {
          filterDiv: false,
          RegionFilter: false,
          Region_List: false,
          WoredaFilter: false,
          Woreda_List: false,
          KebeleFilter: false,
          Kebele_List: false,
          SiteFilter: false,
          Site_List: false,
        }
      );
      const [showInput, setShowInput] = useState(false);

      const handleMouseEnter = () => {
          setShowInput(true);
      };
  
      const handleMouseLeave = () => {
          setShowInput(false);
      };
      const ShowFilter = () => {
        setFilter( (Filter) =>({...Filter,filterDiv:!Filter.filterDiv}));
      }
    return (
        <>
        <div className="flex cursor-pointer align-text-bottom w-fit" onClick={ShowFilter}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        {/* <i className="fas fa-search ml-10 text-green fa-1x"></i> */}
        <Search/>
        <input className={`ml-2 ${showInput ? '' : 'hidden'}`} placeholder="You can Search region here" />
        </div>

        </>
    )
}