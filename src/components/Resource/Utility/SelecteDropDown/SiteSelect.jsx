import React from "react";
import Select from "react-select";
import Loadings from "../../Loading/Loadings";
import { ErrorMessage } from "formik";

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
          htmlFor="site"
        >
          Site
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
              site_id: option.value,
              selectedSite: option.label,
            });
          }}
        />
        <ErrorMessage
          name="site_id"
          component="div"
          className="text-red-500 flex items-start"
        />
      </div>
    </div>
  );
};

export default SiteSelect;
