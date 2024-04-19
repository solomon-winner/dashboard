import React, { useEffect, useState } from "react";
import { RadioButtonGroup } from "../../site/AddSite";
import { kebeledata } from "../UpdateKebele";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import Loadings from "../../Resource/Loading/Loadings";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";

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
export const UpdateForm7 = ({ handleChange, formData, setFormData }) => {
  const { energy_source, isLoadingEnergy_source } = useSelector(
    (state) => state.resource
  );
  const [additionalFields, setAdditionalFields] = useState([]);
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const initialAdditionalFields = extractAdditionalFieldsData("energy_sourcetype",formData,"energy_sourcelevel");
      setAdditionalFields(initialAdditionalFields);
      const updatedFormData = { ...formData };
      const type = initialAdditionalFields.map((item) => item.energy_source) 
      type.forEach((item,index)=>{
         const name = energy_source.find(
          (energy_source) => energy_source.id === item
        )?.name || ""
        updatedFormData[`energy_sourcename${index + 1}`] = name;
      })
      setFormData(updatedFormData);
    }
  }, [energy_source]);
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
    const updatedFormData = { ...formData };
    delete updatedFormData[`energy_sourcetype${id + 1}`];
    delete updatedFormData[`energy_sourcelevel${id + 1}`];
    delete updatedFormData[`energy_sourcename${id + 1}`];
    let newFormData = {};
    let energy_sourcetype = 1;
    let energy_sourcelevel = 1;
    let energy_sourcename = 1;
    for (let key in updatedFormData) {
      if (key.startsWith("energy_sourcetype")) {
        newFormData[`energy_sourcetype${energy_sourcetype}`] =
          updatedFormData[key];
        energy_sourcetype++;
      } else if (key.startsWith("energy_sourcelevel")) {
        newFormData[`energy_sourcelevel${energy_sourcelevel}`] =
          updatedFormData[key];
        energy_sourcelevel++;
      } else if (key.startsWith("energy_sourcename")) {
        newFormData[`energy_sourcename${energy_sourcename}`] =
          updatedFormData[key];
        energy_sourcename++;
      } else {
        newFormData[key] = updatedFormData[key];
      }
    };
    setFormData(newFormData);
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
              name={`energy_sourcelevel${index + 1}`}
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