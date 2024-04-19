import React, { useState } from "react";

import {
  AddCircleOutline,
  AspectRatio,
  Delete,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";

export const UpdateForm2 = () => {
  const [additionalFields, setAdditionalFields] = useState([]);

  const addField = () => {
    setAdditionalFields([...additionalFields, { type: "", area: "" }]);
  };
  const removeField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };
  return (
    <div>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <div class="flex flex-wrap">
        <FormField
          label="Type"
          name="type"
          type="text"
          placeholder="Land use Type"
          icon={Landscape}
        />
        <FormField label="Area" name="area" type="text" placeholder="Area" />
        {additionalFields.map((field, index) => (
          <React.Fragment key={index}>
            <FormField
              label="Type"
              name={`type${index + 2}`}
              type="text"
              placeholder="Land use Type"
              icon={Landscape}
            />
            <FormField
              label="Area"
              name={`area${index + 2}`}
              type="text"
              placeholder="Area"
            />
            <Delete onClick={() => removeField(index)} className="lg:mt-8" />
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
