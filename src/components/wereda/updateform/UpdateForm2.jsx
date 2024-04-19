import React, { useEffect, useState } from "react";
import {
  AddCircleOutline,
  AspectRatio,
  Delete,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { weredadata } from "../UpdateWereda";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";

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
export const UpdateForm2 = ({ handleChange, formData, setFormData }) => {
  const { road, landuse, isLoadingLanduse,isLoadingRoad } = useSelector(
    (state) => state.resource
  );
// Extracting additionalFields and additionalFields2 from formData
const initialAdditionalFields = extractAdditionalFieldsData('type', formData, 'area');
const initialAdditionalFields2 = extractAdditionalFieldsData('roadtype', formData, 'distance');

const [additionalFields, setAdditionalFields] = useState(initialAdditionalFields);
const [additionalFields2, setAdditionalFields2] = useState(initialAdditionalFields2);
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
    const updatedFormData = { ...formData };
    delete updatedFormData[`type${id + 1}`];
    delete updatedFormData[`area${id + 1}`];
    let newFormData = {};
    let typeIndex = 1;
    let areaIndex = 1;
    for (let key in updatedFormData) {
       if (key.startsWith('type') && key !== `type${id + 1}`) {
         newFormData[`type${typeIndex}`] = updatedFormData[key];
         typeIndex++;
       } else if (key.startsWith('area') && key !== `area${id + 1}`) {
         newFormData[`area${areaIndex}`] = updatedFormData[key];
         areaIndex++;
       } else {
         newFormData[key] = updatedFormData[key];
       }
    }
    setFormData(newFormData);
   };
  const addField2 = () => {
    const highestId = additionalFields2.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, roadtype: "", distance: "" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
    const updatedFormData = { ...formData };
    delete updatedFormData[`roadtype${id + 1}`];
    delete updatedFormData[`distance${id + 1}`];
    let newFormData = {};
    let roadtypeIndex = 1;
    let distanceIndex = 1;
    for (let key in updatedFormData) {
       if (key.startsWith('roadtype') && key !== `roadtype${id + 1}`) {
         newFormData[`roadtype${roadtypeIndex}`] = updatedFormData[key];
         roadtypeIndex++;
       } else if (key.startsWith('distance') && key !== `distance${id + 1}`) {
         newFormData[`distance${distanceIndex}`] = updatedFormData[key];
         distanceIndex++;
       } else {
         newFormData[key] = updatedFormData[key];
       }
    }
    setFormData(newFormData);
   };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    // Check if the name is 'area' or 'distance' and parse the value as a number
    const parsedValue = (name.includes('area') || name.includes('distance')) ? parseFloat(value) : value;
    setFormData({
       ...formData,
       [name]: parsedValue,
    });
    handleChange(e);
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
              name={`type${index + 1}`}
              type="dropdown"
              placeholder="Select Land Type"
              options={
                isLoadingLanduse
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
                  : landuse.map((landuse, index) => ({
                      label: landuse.name,
                      value: landuse.id,
                    }))
              }
              value={
                landuse.find(
                  (landuse) => landuse.id === formData[`type${index + 1}`]
                )?.name || ""
              }
              handleChange={handleChanges}
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `type${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <FormField
              label="Area"
              name={`area${index + 1}`}
              type="number"
              placeholder="Area"
              value={formData[`area${index + 1}`] || ""}
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
        {additionalFields2.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`roadtype${index + 1}`}
              type="dropdown"
              placeholder="Select Road Type"
              options={
                isLoadingRoad
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
                  : road.map((landuse, index) => ({
                      label: landuse.name,
                      value: landuse.id,
                    }))
              }
              handleChange={handleChanges}
              value={
                road.find(
                  (road) => road.id === formData[`roadtype${index + 1}`]
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `roadtype${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <FormField
              label="Distance"
              name={`distance${index + 1}`}
              type="number"
              placeholder="Distance in Km"
              icon={AspectRatio}
              value={formData[`distance${index + 1}`] || ""}
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
