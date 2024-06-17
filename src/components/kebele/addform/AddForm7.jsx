import React, { useState } from "react";
import { RadioButtonGroup } from "../../site/AddSite";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const AddForm7 = ({ handleChange, formData, setFormData }) => {
  const { energy_source, isLoadingEnergy_source } = useSelector(
    (state) => state.resource
  );
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Sources of Energy
      </h6>

      <FieldComponent
        initialValues={formData}
        placeholder={["Type of Energy Source", "Area"]}
        type={["dropdown", "radio"]}
        label={["energy_sourcetype", "energy_source"]}
        options={
          isLoadingEnergy_source
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
            : energy_source.map((energy_sourcetype, index) => ({
                label: energy_sourcetype.name,
                value: energy_sourcetype.id,
              }))
        }
        onValueChange={(id, name, value) => {
          const values = name === "energy_sourcetype" && typeof value === "object" ? value.value : value;
          const keyToUpdate =
            name === "energy_sourcetype"
              ? `energy_sourcetype${id}`
              : `${name}${id}`;
          setFormData((prevState) => ({
            ...prevState,
            [keyToUpdate]: values,
          }));
        }}
        onremove={(id) => {
          setFormData((prevState) => ({
            ...prevState,
            [`energy_sourcetype${id}`]: "",
            [`energy_source${id}`]: "",
          }));
        }}
      />
    </div>
  );
};
