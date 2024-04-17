import React from "react";
import Select from "react-select";
import Loadings from "../../Loading/Loadings";

const WeredaSelect = ({
  getweredaByRegion,
  isFetching,
  selectedWereda,
  setSelectedWereda,
  handleChange,
  formData,
  setFormData,
}) => {
  const weredaOptions = isFetching
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
    : getweredaByRegion?.data?.data?.map((wereda) => ({
        value: wereda.id,
        label: wereda.woreda_name,
      }));

  return (

      <div className="w-full lg:w-2/5 px-4">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-500 text-xs font-bold mb-2"
            htmlFor="region"
          >
            Woreda
          </label>
          <Select
            name="woreda_id"
            options={weredaOptions}
            value={
              formData && formData.selectedWeredaName
                ? {
                    value: selectedWereda,
                    label: formData.selectedWeredaName,
                  }
                : null
            }
            onChange={(option) => {
              setSelectedWereda(option.value);
              handleChange({
                target: {
                  name: "woreda_id",
                  value: option.value,
                },
              });
              setFormData({
                ...formData,
                selectedWeredaName: option.label,
              });
            }}
          />
        </div>
      </div>

  );
};

export default WeredaSelect;