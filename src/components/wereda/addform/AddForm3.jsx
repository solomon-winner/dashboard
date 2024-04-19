import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import {
  AddCircleOutline,
  Delete,
  LocalHospital,
  School,
} from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";

export const AddForm3 = ({ handleChange, formData, setFormData }) => {
  const { school, healthFacility, isLoadingInstitutions } = useSelector(
    (state) => state.institution
  );
  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, schooltype: "", schoolnumber: "" },
  ]);
  const [additionalFields2, setAdditionalFields2] = useState([
    { id: 0, healthFacilitytype: "", healthFacilitynumber: "" },
  ]);
  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, schooltype: "", schoolnumber: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
  };
  const addField2 = () => {
    const highestId = additionalFields2.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, healthFacilitytype: "", healthFacilitynumber: "" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
  };
  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    handleChange(e);
  };
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        School
      </h6>
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
              value={
                school.find(
                  (school) => school.id === formData[`schooltype${index + 1}`]
                )?.name || ""
              }
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
              label="Public University/College"
              name={`schoolnumber${index + 1}`}
              type="number"
              placeholder="Number of School"
              icon={School}
              value={formData[`schoolnumber${index + 1}`] || ""}
              handleChange={handleChanges}
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Health Facilities
      </h6>
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
              value={
                healthFacility.find(
                  (healthFacility) =>
                    healthFacility.id ===
                    formData[`healthFacilitytype${index + 1}`]
                )?.name || ""
              }
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
              label="Public University/College"
              name={`healthFacilitynumber${index + 1}`}
              type="number"
              placeholder="Number of healthFacility"
              icon={School}
              value={formData[`healthFacilitynumber${index + 1}`] || ""}
              handleChange={handleChanges}
            />
            <Delete
              onClick={() => removeField2(field.id)}
              className="lg:mt-8"
            />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField2} className="lg:mt-8" />
      </div>
    </div>
  );
};
