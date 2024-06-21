import React, { useEffect, useState } from "react";
import { AddCircleOutline, Delete, FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import { MainLoading } from "../../Resource/Loading/Loadings";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const extractAdditionalFieldsData = (prefix, formData, prefix2) => {
  const fields = [];
  let index = 1;
  while (formData[`${prefix}${index}`]) {
    fields.push({
      id: index - 1, // Adjusting index to start from 0
      [prefix]: formData[`${prefix}${index}`],
      [prefix2]: formData[`${prefix2}${index}`],
    });
    index++;
  }
  return fields;
};
export const UpdateForm = ({ handleChange, formData, setFormData }) => {
  const { landuse, isLoadingLanduse } = useSelector((state) => state.resource);
  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.label]: e.target.labelName,
    });
    handleChange(e);
  };
  return (
    <div>
      {isLoadingLanduse ? (
        <MainLoading />
      ) : (
        <div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Population
          </h6>
          <div className="flex flex-wrap">
            <FormField
              label="Male"
              name="populationmale"
              type="number"
              placeholder="Total Number of Male"
              icon={FamilyRestroom}
              value={formData.populationmale}
              handleChange={handleChanges}
              min="0"
            />
            <FormField
              label="Female"
              name="populationfemale"
              type="number"
              placeholder="Total Number of Female"
              icon={FamilyRestroom}
              value={formData.populationfemale}
              handleChange={handleChanges}
              min="0"
            />
          </div>

          <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Household
          </h6>
          <div className="flex flex-wrap">
            <FormField
              label="Male"
              name="householdmale2"
              type="number"
              placeholder="Total Number of Male"
              icon={FamilyRestroom}
              value={formData.householdmale2}
              handleChange={handleChanges}
              min="0"
            />
            <FormField
              label="Female"
              name="householdfemale2"
              type="number"
              placeholder="Total Number of Female"
              icon={FamilyRestroom}
              value={formData.householdfemale2}
              handleChange={handleChanges}
              min="0"
            />
          </div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            LandUse
          </h6>

          <FieldComponent
          initialValues={formData}
          placeholder={["Select Land Type", "Area"]}
          type={["dropdown", "number"]}
          label={["type", "area"]}
          options={
            isLoadingLanduse
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
              : landuse.map((landuse, index) => ({
                  label: landuse.name,
                  value: landuse.id,
                }))
          }
          onValueChange={(id, name, value) => {
            const values = name === "type" && typeof value === "object" ? value.value : value;
            const keyToUpdate = name === "type" ? `type${id}` : `${name}${id}`;
            setFormData((prevState) => ({
              ...prevState,
              [keyToUpdate]: values,
            }));
          }}
          onremove={(id) => {
            setFormData((prevState) => ({
              ...prevState,
              [`type${id}`]: "",
              [`area${id}`]: "",
            }));
          }}
          />
        </div>
      )}
    </div>
  );
};
