import React from "react";
import Select from "react-select";
import Loadings from "../../Loading/Loadings";
import { ErrorMessage } from "formik";

const KebeleSelect = ({
  getkebeleByWereda,
  kebeleFetching,
  selectedKebele,
  setSelectedKebele,
  handleChange,
  formData,
  setFormData,
}) => {
  const kebeleOptions = kebeleFetching
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
    : getkebeleByWereda?.data?.map((kebele) => ({
        value: kebele.id,
        label: kebele.kebele_name,
      }));

  return (
    <div className="w-full lg:w-2/5 px-4">
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-gray-500 text-xs font-bold mb-2"
          htmlFor="kebele"
        >
          Kebele
        </label>
        <Select
          name="kebele_id"
          options={kebeleOptions}
          value={
            formData && formData.selectedKebele
              ? {
                  value: selectedKebele,
                  label: formData.selectedKebele,
                }
              : null
          }
          onChange={(option) => {
            setSelectedKebele(option.value);
            handleChange({
              target: {
                name: "kebele_id",
                value: option.value,
              },
            });
            setFormData({
              ...formData,
              kebele_id: option.value,
              selectedKebele: option.label,
            });
          }}
        />
        <ErrorMessage
          name="kebele_id"
          component="div"
          className="text-red-500 flex items-start"
        />
      </div>
    </div>
  );
};

export default KebeleSelect;
