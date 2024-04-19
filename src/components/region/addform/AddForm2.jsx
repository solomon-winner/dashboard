import React, { useState } from "react";

import { AddCircleOutline, AspectRatio, Delete, Landscape } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Select from "react-select";
import { LandUse } from "../../wereda/addform/AddForm2";


export const AddForm2 = () => {
  const [additionalFields, setAdditionalFields] = useState([{ id:  0, type: "", area: "" }]);

  const addField = () => {
    const highestId = additionalFields.reduce((highest, field) => Math.max(highest, field.id),  0);
    setAdditionalFields([...additionalFields, { id: highestId +  1, type: "", area: "" }]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
  };
  return (
          <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
              LandUse
            </h6>
            <div class="flex flex-wrap">
            <div className="w-full lg:w-2/5 px-4">
          <label
            className="block uppercase text-gray-500 text-xs font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <Select
            name="type"
            options={LandUse.map((landuse, index) => ({
              label: landuse,
              value: landuse,
            }))}
            placeholder="Select Land Type"
            isClearable
          />
        </div>
        <FormField label="Area" name="area" type="text" placeholder="Area" />
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <div className="w-full lg:w-2/5 px-4">
              <label
                className="block uppercase text-gray-500 text-xs font-bold mb-2"
                htmlFor={`type${index + 2}`}
              >
                Type
              </label>
              <Select
                name={`type${index + 2}`}
                options={
                  LandUse.map((landuse, index) => ({
                    label: landuse,
                    value: landuse,
                  }))}
                placeholder="Select Land Type"
                isClearable
              />
            </div>

            <FormField
              label="Area"
              name={`area${index + 2}`}
              type="text"
              placeholder="Area"
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
              Road
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Asphalt"
                name="asphalt"
                type="text"
                placeholder="Distance in Km"
                icon={AspectRatio}
              />
              <FormField
                label="All Season Gravel"
                name="allseasongravel"
                type="text"
                placeholder="Distance in Km"
                icon={AspectRatio}
              />
              <FormField
                label="Seasonal Gravel"
                name="seasonalgravel"
                type="text"
                placeholder="Distance in Km"
                icon={AspectRatio}
              />
            </div>
            
            
    </div>
  );
};
