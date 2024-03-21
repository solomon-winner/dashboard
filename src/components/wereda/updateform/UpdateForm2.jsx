import React, { useState } from "react";
import {
  AddCircleOutline,
  AspectRatio,
  Delete,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../AddWereda";
import { weredadata } from "../UpdateWereda";

export const UpdateForm2 = ({ handleChange }) => {
  const [updateData, setUpdateData] = useState(weredadata[0]);

  const [additionalFields, setAdditionalFields] = useState(
    updateData.types.map((type, index) => ({
      id: index,
      type: type.type,
      area: type.area,
    }))
  );
  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, type: "", area: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
  };

  const handleChanges = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("type") || name.startsWith("area")) {
      const [, index] = name.split("-");
      setAdditionalFields(
        additionalFields.map((field) =>
          field.id === parseInt(index)
            ? { ...field, [name.split("-")[0]]: value }
            : field
        )
      );
    } else {
      setUpdateData({ ...updateData, [name]: value });
    }
    handleChange(event);
  };

  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <div className="flex flex-wrap">
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`type-${field.id}`}
              type="dropdown"
              placeholder="Land use Type"
              icon={Landscape}
              value={field.type}
              list="landuse"
              options={["Residential", "Commercial", "Industrial"]}
              handleChange={handleChange}
              onChange={handleChanges}
            />
            <FormField
              label="Area"
              name={`area-${field.id}`}
              type="text"
              placeholder="Area"
              value={field.area}
              handleChange={handleChanges}
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Road
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Asphalt"
          name="asphalt"
          type="text"
          placeholder="Distance in Km"
          icon={AspectRatio}
          value={updateData.asphalt}
          handleChange={handleChanges}
        />
        <FormField
          label="All Season Gravel"
          name="allseasongravel"
          type="text"
          placeholder="Distance in Km"
          icon={AspectRatio}
          value={updateData.allseasongravel}
          handleChange={handleChanges}
        />
        <FormField
          label="Seasonal Gravel"
          name="seasonalgravel"
          type="text"
          placeholder="Distance in Km"
          icon={AspectRatio}
          value={updateData.seasonalgravel}
          handleChange={handleChanges}
        />
      </div>
    </div>
  );
};
