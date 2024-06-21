import React, { useState } from "react";
import { AddCircleOutline, AspectRatio, Delete } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const LandUse = ["Residential", "Commercial", "Industrial"];
export const AddForm2 = ({ handleChange, formData, setFormData }) => {
  const { road, landuse, isLoadingLanduse, isLoadingRoad } = useSelector(
    (state) => state.resource
  );
  console.log(formData);
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <FieldComponent
        initialValues={formData}
        placeholder={["Select Land Type", "Area"]}
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
          const updatedFormData = {...formData };
          delete updatedFormData[`type${id}`];
          delete updatedFormData[`area${id}`];
          let newFormData = {};
          let typeIndex = 1;
          let areaIndex = 1;
        
          for (let key in updatedFormData) {
            if (key.startsWith("type")) {
              newFormData[`type${typeIndex}`] = updatedFormData[key];
              typeIndex++;
            } else if (key.startsWith("area")) {
              newFormData[`area${areaIndex}`] = updatedFormData[key];
              areaIndex++;
            } else {
              newFormData[key] = updatedFormData[key];
            }
          }
        
          setFormData(newFormData);
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
          const updatedFormData = {...formData };
          delete updatedFormData[`roadtype${id}`];
          delete updatedFormData[`distance${id}`];
          let newFormData = {};
          let roadtypeIndex = 1;
          let distanceIndex = 1;
        
          for (let key in updatedFormData) {
            if (key.startsWith("roadtype")) {
              newFormData[`roadtype${roadtypeIndex}`] = updatedFormData[key];
              roadtypeIndex++;
            } else if (key.startsWith("distance")) {
              newFormData[`distance${distanceIndex}`] = updatedFormData[key];
              distanceIndex++;
            } else {
              newFormData[key] = updatedFormData[key];
            }
          }
        
          setFormData(newFormData);
        }}
          
      />
    </div>
  );
};
