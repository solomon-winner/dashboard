import React from "react";
import Select from "react-select";
import Loadings from "../../Loading/Loadings";

const RegionSelect = ({
  regions,
  isLoadingRegions,
  selectedRegion,
  setSelectedRegion,
  handleChange,
  formData,
  setFormData,
}) => {
  const regionOptions = isLoadingRegions
    ? [
        {
          value: "loading",
          label: (
            <div className="flex justify-center">
              <Loadings />
            </div>
          ),
        },
      ]
    : regions.map((region) => ({
        value: region.id,
        label: region.region_name,
      }));

  return (

      <div className="w-full lg:w-2/5 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-500 text-xs font-bold mb-2"
            htmlFor="region"
          >
            Region
          </label>
          <Select
            name="region_id"
            options={regionOptions}
            value={
              formData && formData.selectedRegionName
                ? {
                    value: selectedRegion,
                    label: formData.selectedRegionName,
                  }
                : null
            }
            onChange={(option) => {
              setSelectedRegion(option.value);
              handleChange({
                target: {
                  name: "region_id",
                  value: option.value,
                },
              });
              setFormData({
                ...formData,
                selectedRegionName: option.label,
                selectedWeredaName: "",
                selectedKebele: "",
                selectedSite: "",
              });
            }}
          />
        </div>
      </div>

  );
};

export default RegionSelect;
