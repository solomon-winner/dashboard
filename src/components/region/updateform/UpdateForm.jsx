import React, { useState } from "react";

import {
  AddCircleOutline,
  Apartment,
  Delete,
  FamilyRestroom,
  Landscape,
  Public,
} from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";

export const UpdateForm = () => {
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
      <div class="flex flex-wrap">
        <FormField
          label="Region"
          name="region"
          type="text"
          placeholder="Enter Region"
          icon={Public}
          value={"Region 1"}
        />
        <FormField
        label="Region GeoJSON"
          type="file"
          name="file"
        />
      </div>
      <hr class="mt-3 border-b-1 border-blueGray-300"></hr>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Population
      </h6>
      <div class="flex flex-wrap">
        <FormField
          label="Male"
          name="male"
          type="text"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
        />
        <FormField
          label="Female"
          name="female"
          type="text"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
        />
      </div>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Zone
      </h6>
      <div class="flex flex-wrap">
        <FormField
          label="Name of Zone"
          name="Zone"
          type="text"
          placeholder="Name of Zone"
          icon={Public}
        />
      </div>
      <div class="flex flex-wrap">
        <FormField
          label="Male"
          name="male"
          type="text"
          placeholder="Total Number of Male in Zone"
          icon={Public}
        />
        <FormField
          label="Female"
          name="female"
          type="text"
          placeholder="Total Number of Female in Zone"
          icon={Public}
        />
      </div>
      {additionalFields.map((field, index) => (
        <React.Fragment key={index}>
          <div class="flex flex-wrap">
            <FormField
              label="Name of Zone"
              name="Zone"
              type="text"
              placeholder="Name of Zone"
              icon={Public}
            />
          </div>
          <div class="flex flex-wrap">
            <FormField
              label="Male"
              name={`fale${index + 2}`}
              type="text"
              placeholder="Total Number of Male in Zone"
              icon={Public}
            />
            <FormField
              label="Female"
              name={`female${index + 2}`}
              type="text"
              placeholder="Total Number of Female in Zone"
            />
          </div>
          <Delete onClick={() => removeField(index)} className="lg:mt-8" />
        </React.Fragment>
      ))}
      <AddCircleOutline onClick={addField} className="lg:mt-8" />
    </div>
  );
};
