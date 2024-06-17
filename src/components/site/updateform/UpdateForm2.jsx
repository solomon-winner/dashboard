import React, { useEffect, useState } from "react";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const UpdateForm2 = ({ handleChange, formData, setFormData }) => {
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
        placeholder={["Type of LandUse"]}
        type={["dropdown"]}
        label={["currentlandusetype"]}
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
          const values = name === "currentlandusetype" && typeof value === "object" ? value.value : value;
          const keyToUpdate =
            name === "currentlandusetype" ? `currentlandusetype${id}` : "";
          setFormData({
            ...formData,
            [keyToUpdate]: values,
          });
        }}
        onremove={(id) => {
          setFormData((prevState) => ({
            ...prevState,
            [`currentlandusetype${id}`]: "",
          }));
        }}
      />

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Forage
      </h6>

      <FieldComponent
        initialValues={formData}
        placeholder={["Type of Forage"]}
        type={["dropdown"]}
        label={["foragetype"]}
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
            : forage.map((forage, index) => ({
                label: forage.name,
                value: forage.id,
              }))
        }
        onValueChange={(id, name, value) => {
          const values = name === "foragetype" && typeof value === "object" ? value.value : value;
          const keyToUpdate = name === "foragetype" ? `foragetype${id}` : "";
          setFormData({
            ...formData,
            [keyToUpdate]: values,
          });
        }}
        onremove={(id) => {
          setFormData((prevState) => ({
            ...prevState,
            [`foragetype${id}`]: "",
          }));
        }}
      />
     
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Livelihood site can support
      </h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["Type of Livelihood"]}
      type={["dropdown"]}
      label={["livelihoodtype"]}
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
        const values = name === "livelihoodtype" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "livelihoodtype" ? `livelihoodtype${id}` : "";
        setFormData({
          ...formData,
          [keyToUpdate]: values,
        });
      }}
      onremove={(id) => {
        setFormData((prevState) => ({
          ...prevState,
          [`livelihoodtype${id}`]: "",
        }));
      }}
      />
    </div>
  );
};
