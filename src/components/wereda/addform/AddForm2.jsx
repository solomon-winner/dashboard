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
        label={["type", "distance"]}
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
          const values = name === "type" && typeof value === "object" ? value.value : value;
          const keyToUpdate = name === "type" ? `roadtype${id}` : `distance${id}`;
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
