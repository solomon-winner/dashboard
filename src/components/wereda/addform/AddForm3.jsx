import React, { useState } from "react";
import { AddCircleOutline, Delete, School } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const AddForm3 = ({ handleChange, formData, setFormData }) => {
  const { school, healthFacility, isLoadingInstitutions } = useSelector(
    (state) => state.institution
  );
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        School
      </h6>
      <FieldComponent
       initialValues={formData}
       placeholder={["Select School Type", "Number of School"]}
       type={["dropdown", "number"]}
       label={["schooltype", "schoolnumber"]}
       options={
         isLoadingInstitutions
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
           : school.map((schools, index) => ({
               label: schools.name,
               value: schools.id,
             }))
       }
       onValueChange={(id, name, value) => {
         const values = name === "schooltype" && typeof value === "object" ? value.value : value;
         const keyToUpdate = name === "schooltype" ? `schooltype${id}` : `schoolnumber${id}`;
         setFormData((prevState) => ({
           ...prevState,
           [keyToUpdate]: values,
         }));
       }}
       onremove={(id) => {
        const updatedFormData = { ...formData };
        delete updatedFormData[`schooltype${id}`];
        delete updatedFormData[`schoolnumber${id}`];
        let newFormData = {};
        let schooltypeIndex = 1;
        let schoolnumberIndex = 1;

        for (let key in updatedFormData) {
          if (key.startsWith("schooltype")) {
            newFormData[`schooltype${schooltypeIndex}`] = updatedFormData[key];
            schooltypeIndex++;
          } else if (key.startsWith("schoolnumber")) {
            newFormData[`schoolnumber${schoolnumberIndex}`] = updatedFormData[key];
            schoolnumberIndex++;
          } else {
            newFormData[key] = updatedFormData[key];
          }
        }

        setFormData(newFormData);
       }}
      />
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Health Facilities
      </h6>
      <FieldComponent
      initialValues={formData}
      placeholder={["Select Hospital Type", "Number of Health Facilities"]}
      type={["dropdown", "number"]}
      label={["healthFacilitytype", "healthFacilitynumber"]}
      options={
        isLoadingInstitutions
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
          : healthFacility.map((healthFacilitys, index) => ({
              label: healthFacilitys.name,
              value: healthFacilitys.id,
            }))
      }
      onValueChange={(id, name, value) => {
        const values = name === "healthFacilitytype" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "healthFacilitytype" ? `healthFacilitytype${id}` : `healthFacilitynumber${id}`;
        setFormData((prevState) => ({
          ...prevState,
          [keyToUpdate]: values,
        }));
      }}
      onremove={(id) => {
        const updatedFormData = { ...formData };
        delete updatedFormData[`healthFacilitytype${id}`];
        delete updatedFormData[`healthFacilitynumber${id}`];
        let newFormData = {};
        let healthFacilitytypeIndex = 1;
        let healthFacilitynumberIndex = 1;

        for (let key in updatedFormData) {
          if (key.startsWith("healthFacilitytype")) {
            newFormData[`healthFacilitytype${healthFacilitytypeIndex}`] = updatedFormData[key];
            healthFacilitytypeIndex++;
          } else if (key.startsWith("healthFacilitynumber")) {
            newFormData[`healthFacilitynumber${healthFacilitynumberIndex}`] = updatedFormData[key];
            healthFacilitynumberIndex++;
          } else {
            newFormData[key] = updatedFormData[key];
          }
        }

        setFormData(newFormData);
      }}
      />
    </div>
  );
};
