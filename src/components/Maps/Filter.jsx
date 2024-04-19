import { useState } from "react";
import { Search } from "@mui/icons-material";
import Select from "react-select";
import { useSelector } from "react-redux";

export const Filter = () => {
    const [filter, setFilter] = useState({
        filterDiv: false,
        RegionFilter: false,
        selectedRegion: null,
        WoredaFilter: false,
        selectedWoreda: null,
        KebeleFilter: false,
        selectedKebele: null,
        SiteFilter: false,
        selectedSite: null,
        isFiterFocused: false,
    });
    const ALL_REGIONS = useSelector((state) => state.geoJson.GeoJson.AllRegions)
    // console.log("ALL_REGIONS____>", ALL_REGIONS[0].feature.properties.name);
    const regions = [];
    
    ALL_REGIONS.forEach((region) => {
        console.log("t_e_s_t", region);
         regions.push({ value: region.feature.properties.id, label: region.feature.properties.name });
    });
    
    console.log("this_is form the_regions_array...", regions)
    const handleMouseEnter = () => {
        setFilter({ ...filter, RegionFilter: true });
    };

    const handleMouseLeave = () => {
        if (!filter.isFiterFocused) {
            setFilter({ ...filter, RegionFilter: false });
        }
    };

    const handleRegionChange = selectedRegion => {
        setFilter({ ...filter,selectedRegion:selectedRegion, WoredaFilter: true });
    };

    const handleWoredaChange = selectedWoreda => {
        setFilter({ ...filter,selectedWoreda:selectedWoreda, KebeleFilter: true });
    };
    const handleKebeleChange = selectedKebele => {
        setFilter({ ...filter,selectedKebele:selectedKebele, SiteFilter: true });
    };

    const handleSiteChange = selectedSite => {
        setFilter({...filter,selectedSite:selectedSite});
    };

    const handleFilterFocus = () => {
        setFilter({ ...filter, isFiterFocused: true });
    };

    const handleFilterBlur = () => {
        setFilter({ ...filter, isFiterFocused: false });
    };

    return (
        <>
            <div className="flex cursor-pointer align-text-bottom w-fit flex-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Search />
                <Select
                    className={`ml-2 ${filter.RegionFilter || filter.isFiterFocused ? '' : 'hidden'} w-[300px] z-50`}
                    value={filter.selectedRegion}
                    onChange={handleRegionChange}
                    options={regions}
                    onFocus={handleFilterFocus}
                    onBlur={handleFilterBlur}
                    placeholder="You can Search region here"
                />
               {filter.WoredaFilter && <Select
                    className={`ml-2 ${filter.RegionFilter || filter.isFiterFocused ? '' : 'hidden'}  w-[300px] `}
                    value={filter.selectedWoreda}
                    onChange={handleWoredaChange}
                    options={regions}
                    onFocus={handleFilterFocus}
                    onBlur={handleFilterBlur}
                    placeholder="You can Search Woreda here"
                />}


             {filter.KebeleFilter && <Select
                    className={`ml-2 ${filter.RegionFilter || filter.isFiterFocused ? '' : 'hidden'}  w-[300px] `}
                    value={filter.selectedKebele}
                    onChange={handleKebeleChange}
                    options={regions}
                    onFocus={handleFilterFocus}
                    onBlur={handleFilterBlur}
                    placeholder="You can Search Kebele here"
                />}

                {filter.SiteFilter &&<Select
                    className={`ml-2 ${filter.RegionFilter || filter.isFiterFocused ? '' : 'hidden'}  w-[300px] `}
                    value={filter.selectedSite}
                    onChange={handleSiteChange}
                    options={regions}
                    onFocus={handleFilterFocus}
                    onBlur={handleFilterBlur}
                    placeholder="You can Search Site here"
                />}
            </div>
        </>
    );
};
