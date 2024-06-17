import React, { useState } from "react";
import { AddCircleOutline, AspectRatio, Delete } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

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
  const { road, landuse, isLoadingLanduse, isLoadingRoad } = useSelector(
    (state) => state.resource
  );
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <FieldComponent
      initialValues={formData}
      placeholder={["Select Land Use", "Area"]}
      type={["dropdown", "number"]}
      label={["type", "area"]}
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
      onValueChange={(id, name, value) => {
        const values = name === "type" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "type" ? `type${id}` : `area${id}`;
        setFormData((prevState) => ({
          ...prevState,
          [keyToUpdate]: values,
        }));
      }}
      onremove={(id) => {
        setFormData((prevState) => ({
          ...prevState,
          [`type${id}`]: "",
          [`area${id}`]: "",
        }));
      }}
      />

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Roads
      </h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["Select Road Type", "Distance"]}
      type={["dropdown", "number"]}
      label={["roadtype", "distance"]}
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
      onValueChange={(id, name, value) => {
        const values = name === "roadtype" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "roadtype" ? `roadtype${id}` : `distance${id}`;
        setFormData((prevState) => ({
          ...prevState,
          [keyToUpdate]: values,
        }));
      }}
      onremove={(id) => {
        setFormData((prevState) => ({
          ...prevState,
          [`roadtype${id}`]: "",
          [`distance${id}`]: "",
        }));
      }}
      />
     </div>
  );
};
