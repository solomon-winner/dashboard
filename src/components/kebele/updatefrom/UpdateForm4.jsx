import { AddCircleOutline, Delete, Grass } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const UpdateForm4 = ({ handleChange, formData, setFormData }) => {
  const { livestock, forage, isLoadingLiveStock, isLoadingForage } =
    useSelector((state) => state.resource);
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Livestock
      </h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["Select Livestock Type", "Total Number of Livestock"]}
      type={["dropdown", "number"]}
      label={["livestock", "numberlivestock"]}
      options={
        isLoadingLiveStock
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
          : livestock.map((livestock, index) => ({
              label: livestock.name,
              value: livestock.id,
            }))
      }
      onValueChange={(id, name, value) => {
        const values = name === "livestock" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "livestock" ? `livestock${id}` : `numberlivestock${id}`;
        setFormData((prevState) => ({
          ...prevState,
          [keyToUpdate]: values,
        }));
      }}
      onremove={(id) => {
        const updatedFormData = { ...formData };
        delete updatedFormData[`livestock${id}`];
        delete updatedFormData[`numberlivestock${id}`];
        let newFormData = {};
        let livestockIndex = 1;
        let numberlivestockIndex = 1;

        for (let key in updatedFormData) {
          if (key.startsWith("livestock")) {
            newFormData[`livestock${livestockIndex}`] = updatedFormData[key];
            livestockIndex++;
          } else if (key.startsWith("numberlivestock")) {
            newFormData[`numberlivestock${numberlivestockIndex}`] = updatedFormData[key];
            numberlivestockIndex++;
          } else {
            newFormData[key] = updatedFormData[key];
          }
        }

        setFormData(newFormData);
      }}
      />
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Forage
      </h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["Select Forage Type", "Area"]}
      type={["dropdown", "number"]}
      label={["foragetype", "foragearea"]}
      options={
        isLoadingForage
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
          : forage.map((forgetype, index) => ({
              label: forgetype.name,
              value: forgetype.id,
            }))
      }
      onValueChange={(id, name, value) => {
        const values = name === "foragetype" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "foragetype" ? `foragetype${id}` : `foragearea${id}`;
        setFormData((prevState) => ({
          ...prevState,
          [keyToUpdate]: values,
        }));
      }}
      onremove={(id) => {
        const updatedFormData = { ...formData };
        delete updatedFormData[`foragetype${id}`];
        delete updatedFormData[`foragearea${id}`];
        let newFormData = {};
        let foragetypeIndex = 1;
        let forageareaIndex = 1;

        for (let key in updatedFormData) {
          if (key.startsWith("foragetype")) {
            newFormData[`foragetype${foragetypeIndex}`] = updatedFormData[key];
            foragetypeIndex++;
          } else if (key.startsWith("foragearea")) {
            newFormData[`foragearea${forageareaIndex}`] = updatedFormData[key];
            forageareaIndex++;
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
