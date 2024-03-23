import React, { useState } from "react";
import {
  AddCircleOutline,
  AspectRatio,
  Delete,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../AddWereda";
import { weredadata } from "../UpdateWereda";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";

export const UpdateForm2 = ({ handleChange, formData, setFormData }) => {
  const { road, landuse, isLoadingLanduse,isLoadingRoad } = useSelector(
    (state) => state.resource
  );
  console.log(formData.woreda_resource?.LAND)
  const initialLandUseFields = formData.woreda_resource?.LAND.map((land, index) => ({
    id: land.id, // Use index as id for simplicity, ensure it's unique if necessary
    type: land.value,
    area: land.amount,
 }));
  const [additionalFields, setAdditionalFields] = useState(initialLandUseFields);
  const [additionalFields2, setAdditionalFields2] = useState([
    { id: 0, roadtype: "", distance: "" },
  ]);
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
                  (landuse) => landuse.id === field.id
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
              value={field.area || ""}
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
