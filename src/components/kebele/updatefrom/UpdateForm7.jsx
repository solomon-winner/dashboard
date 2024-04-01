import React, { useState } from "react";
import { RadioButtonGroup } from "../../site/AddSite";
import { kebeledata } from "../UpdateKebele";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import Loadings from "../../Resource/Loading/Loadings";
import { FormField } from "../../wereda/AddWereda";
import { useSelector } from "react-redux";


export const UpdateForm7 = ({ handleChange, formData, setFormData }) => {
  const { energy_source, isLoadingEnergy_source } = useSelector(
    (state) => state.resource
  );
  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, energy_sourcetype: "", energy_source: "" },
  ]);
  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, energy_sourcetype: "", energy_source: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
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
        Sources of Energy
      </h6>
      <div className="flex flex-wrap lg:w-2/3">
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`energy_sourcetype${index + 1}`}
              type="dropdown"
              placeholder={`Type of Energy Source`}
              options={
                isLoadingEnergy_source
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
                  : energy_source.map((energy_sourcetype, index) => ({
                      label: energy_sourcetype.name,
                      value: energy_sourcetype.id,
                    }))
              }
              handleChange={handleChanges}
              value={
                energy_source.find(
                  (energy_sourcetype) =>
                    energy_sourcetype.id ===
                    formData[`energy_sourcetype${index + 1}`]
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `energy_sourcetype${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <RadioButtonGroup
              name={`energy_source${index + 1}`}
              type="text"
              placeholder="Area"
              options={["HIGH", "MEDIUM", "LOW"]}
              handleChange={handleChanges}
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>
    </div>
  );
};