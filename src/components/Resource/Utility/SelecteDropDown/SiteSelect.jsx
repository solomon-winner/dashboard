import React from "react";
import Select from "react-select";
import Loadings from "../../Loading/Loadings";

const SiteSelect = ({
  getsitesByKebele,
  siteFetching,
  selectedSite,
  setSelectedSite,
  handleChange,
  formData,
  setFormData,
}) => {
  const siteOptions = siteFetching
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
    : getsitesByKebele?.data?.data?.map((site) => ({
        value: site.id,
        label: site.site_name,
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
            name="site_id"
            options={siteOptions}
            value={
              formData && formData.selectedSite
                ? {
                    value: selectedSite,
                    label: formData.selectedSite,
                  }
                : null
            }
            onChange={(option) => {
              setSelectedSite(option.value);
              handleChange({
                target: {
                  name: "site_id",
                  value: option.value,
                },
              });
              setFormData({
                ...formData,
                selectedSite: option.label,
              });
            }}
          />
        </div>
      </div>
 
  );
};

export default SiteSelect;
