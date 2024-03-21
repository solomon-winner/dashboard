import React, { useState } from "react";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { RadioButtonGroup } from '../AddSite'
import { FormField } from "../../wereda/AddWereda";
import { sitedata } from "../UpdateSite";


export const UpdateForm2 = ({handleChange}) => {
  const [updateData, setUpdateData] = useState(sitedata[0])
  const [additionalFields, setAdditionalFields] = useState(
    updateData.forage.map((type, index) => ({ id: index, forage: type.forage}))
);
const addField = () => {
    const highestId = additionalFields.reduce((highest, field) => Math.max(highest, field.id),   0);
    setAdditionalFields([...additionalFields, { id: highestId +   1, forage: ""}]);
};
const removeField = (id) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
};
const handleChanges = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("forage")) {
        const [, index] = name.split("-");
        setAdditionalFields(additionalFields.map(field =>
            field.id === parseInt(index) ? { ...field, [name.split("-")[0]]: value } : field
        ));
    } else {
        setUpdateData({ ...updateData, [name]: value });
    }
    handleChange(event);
};
const handleRadioChange = (name, selectedValue) => {
  setUpdateData(prevData => ({
    ...prevData,
    [name]: selectedValue
  }));
  handleChange(selectedValue);
};
  return (
          <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
              LandUse
            </h6>
            <div class="flex flex-wrap lg:w-2/3">
              <RadioButtonGroup
                name="settlement"
                label="Settlement"
                value={updateData.settlement}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("settlement", value)}
              />
              <RadioButtonGroup
                name="communalgrazing"
                label="Communal Grazing"
                value={updateData.communalgrazing}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("communalgrazing", value)}
              />
              <RadioButtonGroup
                name="forest"
                label="Forest"
                value={updateData.forest}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("forest", value)}
              />
              <RadioButtonGroup
                name="agriculturalfarmland"
                label="Agricultural/farm land"
                value={updateData.agriculturalfarmland}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("agriculturalfarmland", value)}
              />
              <RadioButtonGroup
                name="shrubland"
                label="Shrub land"
                value={updateData.shrubland}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("shrubland", value)}
              />
              <RadioButtonGroup
                name="bushland"
                label="Bush land"
                value={updateData.bushland}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("bushland", value)}
              />
              <RadioButtonGroup
                name="pastorlandgrazing"
                label="Pastor land/Grazing"
                value={updateData.pastorlandgrazing}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("pastorlandgrazing", value)}
              />
              <RadioButtonGroup
                name="wetland"
                label="Wetland"
                value={updateData.wetland}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("wetland", value)}
              />
              <RadioButtonGroup
                name="degradedlandbadland"
                label="Degraded land/bad land"
                value={updateData.degradedlandbadland}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("degradedlandbadland", value)}
              />
              <RadioButtonGroup
                name="irrigationland"
                label="Irrigation land"
                value={updateData.irrigationland}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("irrigationland", value)}
              />
              <RadioButtonGroup
                name="bareland"
                label="Bare land"
                value={updateData.bareland}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("bareland", value)}
              />
              <RadioButtonGroup
                name="other"
                label="Other"
                value={updateData.other}
                options={["Yes", "No"]}
                handleChange={(value) => handleRadioChange("other", value)}
              />
            </div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Forage
            </h6>
            <div class="flex flex-wrap lg:w-2/3">
              {additionalFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <FormField
                    label="Forage"
                    name={`forage-${field.id}`}
                    type="dropdown"
                    placeholder="Name of Forage"
                    value={field.forage}
                    list="forage"
                    options={["Settlement", "Communal Grazing"]}
                    handleChange={handleChange}
                    onChange={handleChanges}
                  />
                  <Delete onClick={() => removeField(index)} className="lg:mt-8"/>
                </React.Fragment>
              ))}
              <AddCircleOutline onClick={addField} className="lg:mt-8" />
            </div>
            
          </div>
  );
};