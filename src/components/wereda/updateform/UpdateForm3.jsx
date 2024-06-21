import React, { useState } from "react";
import { AddCircleOutline, Delete, School } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import { extractAdditionalFieldsData } from "./UpdateForm2";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const UpdateForm3 = ({ handleChange, formData, setFormData }) => {
  const { school, healthFacility, isLoadingInstitutions } = useSelector(
    (state) => state.institution
  );
  
  const initialAdditionalFields = extractAdditionalFieldsData("schooltype", formData, "schoolnumber");
  const initialAdditionalFields2 = extractAdditionalFieldsData("healthFacilitytype", formData, "healthFacilitynumber");
  
  const [additionalFields, setAdditionalFields] = useState(initialAdditionalFields);
  const [additionalFields2, setAdditionalFields2] = useState(initialAdditionalFields2);

  const addField = (fields, setFields, type) => {
    const highestId = fields.reduce((highest, field) => Math.max(highest, field.id), 0);
    setFields([...fields, { id: highestId + 1, [`${type}type`]: "", [`${type}number`]: "" }]);
  };

  const removeField = (id, fields, setFields, type) => {
    setFields(fields.filter((field) => field.id !== id));
    const updatedFormData = { ...formData };
    delete updatedFormData[`${type}type${id + 1}`];
    delete updatedFormData[`${type}number${id + 1}`];
    let newFormData = {};
    let typeIndex = 1;
    let numberIndex = 1;
    for (let key in updatedFormData) {
      if (key.startsWith(`${type}type`) && key !== `${type}type${id + 1}`) {
        newFormData[`${type}type${typeIndex}`] = updatedFormData[key];
        typeIndex++;
      } else if (key.startsWith(`${type}number`) && key !== `${type}number${id + 1}`) {
        newFormData[`${type}number${numberIndex}`] = updatedFormData[key];
        numberIndex++;
      }
    }
    setFormData(newFormData);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    const parsedValue = name.includes("number") ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
    handleChange(e);
  };

  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">School</h6>
      <FieldComponent
       initialValues={formData}
       placeholder={["Select School Type", "Number of School"]}
       type={["dropdown", "number"]}
       label={["schooltype", "schoolnumber"]}
       options={
         isLoadingInstitutions
           ? [{ value: "loading", label: <div className="flex justify-center"><Loadings /></div> }]
           : school.map((schools) => ({ label: schools.name, value: schools.id }))
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

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">Health Facilities</h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["Select Hospital Type", "Number of Hospital"]}
      type={["dropdown", "number"]}
      label={["healthFacilitytype", "healthFacilitynumber"]}
      options={
        isLoadingInstitutions
          ? [{ value: "loading", label: <div className="flex justify-center"><Loadings /></div> }]
          : healthFacility.map((healthFacilitys) => ({ label: healthFacilitys.name, value: healthFacilitys.id }))
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
