import React, { useState } from "react";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const AddForm2 = ({ handleChange, formData, setFormData }) => {
  const {
    livelihood,
    landuse,
    forage,
    isLoadingForage,
    isLoadingLanduse,
    isLoadingLivelihood,
  } = useSelector((state) => state.resource);

  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Current LandUse
      </h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["Current LandUse"]}
      type={["dropdown"]}
      label={["currentlanduse"]}
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
          : landuse.map((currentlanduse, index) => ({
              label: currentlanduse.name,
              value: currentlanduse.id,
            }))
      }
      onValueChange={(id, name, value) => {
        const values = name === "currentlanduse" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "currentlanduse" ? `currentlanduse${id}` : "";
        setFormData({
          ...formData,
          [keyToUpdate]: values,
        });
      }}
      onremove={(id) => {
        const updatedFormData = { ...formData };
        delete updatedFormData[`currentlanduse${id}`];
        let newFormData = {};
        let currentlanduseIndex = 1;

        for (let key in updatedFormData) {
          if (key.startsWith("currentlanduse")) {
            newFormData[`currentlanduse${currentlanduseIndex}`] = updatedFormData[key];
            currentlanduseIndex++;
          }  else {
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
      placeholder={["Type of Forage"]}
      type={["dropdown"]}
      label={["forage"]}
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
          : forage.map((exotic, index) => ({
              label: exotic.name,
              value: exotic.id,
            }))
      }
      onValueChange={(id, name, value) => {
        const values = name === "forage" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "forage" ?  `forage${id}` : "";
        setFormData({
          ...formData,
          [keyToUpdate]: values,
        });
      }}
      onremove={(id) => {
        const updatedFormData = { ...formData };
        delete updatedFormData[`forage${id}`];
        let newFormData = {};
        let forageIndex = 1;

        for (let key in updatedFormData) {
          if (key.startsWith("forage")) {
            newFormData[`forage${forageIndex}`] = updatedFormData[key];
            forageIndex++;
          }  else {
            newFormData[key] = updatedFormData[key];
          }
        }

        setFormData(newFormData);
      }}
      />

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Livelihood site can support
      </h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["LiveHood site can support"]}
      type={["dropdown"]}
      label={["livelihood"]}
      options={
        isLoadingLivelihood
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
          : livelihood.map((livelihood, index) => ({
              label: livelihood.name,
              value: livelihood.id,
            }))
      }
      onValueChange={(id, name, value) => {
        const values = name === "livelihood" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "livelihood" ? `livelihood${id}` : "";
        setFormData({
          ...formData,
          [keyToUpdate]: values,
        });
      }}
      onremove={(id) => {
        const updatedFormData = { ...formData };
        delete updatedFormData[`livelihood${id}`];
        let newFormData = {};
        let livelihoodIndex = 1;

        for (let key in updatedFormData) {
          if (key.startsWith("livelihood")) {
            newFormData[`livelihood${livelihoodIndex}`] = updatedFormData[key];
            livelihoodIndex++;
          }  else {
            newFormData[key] = updatedFormData[key];
          }
        }

        setFormData(newFormData);

      }}
      />
    </div>
  );
};
