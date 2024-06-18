import React, { useState } from "react";
import { AddCircleOutline, Delete, Medication } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const AddForm6 = ({ handleChange, formData, setFormData }) => {
  const { nursery, causeofdeforestation, isLoadingNursery } = useSelector(
    (state) => state.resource
  );
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Nursery
      </h6>

      <FieldComponent
        initialValues={formData}
        placeholder={["Type of Nursery", "Number of Nursery", "Capacity"]}
        type={["dropdown", "number", "number"]}
        label={["nurserytype", "amount", "capacity"]}
        options={
          isLoadingNursery
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
            : nursery.map((nurserytype, index) => ({
                label: nurserytype.name,
                value: nurserytype.id,
              }))
        }
        onValueChange={(id, name, value) => {
          const values = name === "nurserytype" && typeof value === "object" ? value.value : value;
          const keyToUpdate =
            name === "nurserytype" ? `nurserytype${id}` : `${name}${id}`;
          setFormData((prevState) => ({
            ...prevState,
            [keyToUpdate]: values,
          }));
        }}
        onremove={(id) => {
          setFormData((prevState) => ({
            ...prevState,
            [`nurserytype${id}`]: "",
            [`amount${id}`]: "",
            [`capacity${id}`]: "",
          }));
        }}
        icon={Medication}
      />
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Cause of deforestation
      </h6>

      <FieldComponent
        initialValues={formData}
        placeholder={["Cause of deforestation"]}
        type={["dropdown"]}
        label={["causeofdeforestation"]}
        options={
          isLoadingNursery
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
            : causeofdeforestation.map((causeofdeforestation, index) => ({
                label: causeofdeforestation.name,
                value: causeofdeforestation.id,
              }))
        }
        onValueChange={(id, name, value) => {
          const values = name === "causeofdeforestation" && typeof value === "object" ? value.value : value;
          const keyToUpdate = name === "causeofdeforestation" ? `causeofdeforestation${id}` : `${name}${id}`;
          setFormData((prevState) => ({
            ...prevState,
            [keyToUpdate]: values,
          }));
        }}
        onremove={(id) => {
          setFormData((prevState) => ({
            ...prevState,
            [`causeofdeforestation${id}`]: "",
          }));
        }}
      />
    </div>
  );
};
