import React, { useState } from "react";
import { AddCircleOutline, Delete, School } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import { extractAdditionalFieldsData } from "./UpdateForm2";

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
      <div className="flex flex-wrap">
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`schooltype${index + 1}`}
              type="dropdown"
              placeholder="Select School Type"
              options={
                isLoadingInstitutions
                  ? [{ value: "loading", label: <div className="flex justify-center"><Loadings /></div> }]
                  : school.map((schools) => ({ label: schools.name, value: schools.id }))
              }
              value={school.find((school) => school.id === formData[`schooltype${index + 1}`])?.name || ""}
              handleChange={handleChanges}
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `schooltype${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <FormField
              label="Number of School"
              name={`schoolnumber${index + 1}`}
              type="number"
              placeholder="Number of School"
              icon={School}
              value={formData[`schoolnumber${index + 1}`] || ""}
              handleChange={handleChanges}
            />
            <Delete onClick={() => removeField(field.id, additionalFields, setAdditionalFields, 'school')} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={() => addField(additionalFields, setAdditionalFields, 'school')} className="lg:mt-8" />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">Health Facilities</h6>
      <div className="flex flex-wrap">
        {additionalFields2.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`healthFacilitytype${index + 1}`}
              type="dropdown"
              placeholder="Select Hospital Type"
              options={
                isLoadingInstitutions
                  ? [{ value: "loading", label: <div className="flex justify-center"><Loadings /></div> }]
                  : healthFacility.map((healthFacilitys) => ({ label: healthFacilitys.name, value: healthFacilitys.id }))
              }
              value={healthFacility.find((healthFacility) => healthFacility.id === formData[`healthFacilitytype${index + 1}`])?.name || ""}
              handleChange={handleChanges}
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `healthFacilitytype${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <FormField
              label="Number of healthFacility"
              name={`healthFacilitynumber${index + 1}`}
              type="number"
              placeholder="Number of healthFacility"
              icon={School}
              value={formData[`healthFacilitynumber${index + 1}`] || ""}
              handleChange={handleChanges}
            />
            <Delete onClick={() => removeField(field.id, additionalFields2, setAdditionalFields2, 'healthFacility')} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={() => addField(additionalFields2, setAdditionalFields2, 'healthFacility')} className="lg:mt-8" />
      </div>
    </div>
  );
};
