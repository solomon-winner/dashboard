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
          const updatedFormData = { ...formData };
          delete updatedFormData[`nurserytype${id}`];
          delete updatedFormData[`amount${id}`];
          delete updatedFormData[`capacity${id}`];
          let newFormData = {};
          let nurserytypeIndex = 1;
          let amountIndex = 1;
          let capacityIndex = 1;

          for (let key in updatedFormData) {
            if (key.startsWith("nurserytype")) {
              newFormData[`nurserytype${nurserytypeIndex}`] = updatedFormData[key];
              nurserytypeIndex++;
            } else if (key.startsWith("amount")) {
              newFormData[`amount${amountIndex}`] = updatedFormData[key];
              amountIndex++;
            } else if (key.startsWith("capacity")) {
              newFormData[`capacity${capacityIndex}`] = updatedFormData[key];
              capacityIndex++;
            }
             else {
              newFormData[key] = updatedFormData[key];
            }
          }

          setFormData(newFormData);
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
          const updatedFormData = { ...formData };
          delete updatedFormData[`causeofdeforestation${id}`];
          let newFormData = {};
          let causeofdeforestationIndex = 1;

          for (let key in updatedFormData) {
            if (key.startsWith("causeofdeforestation")) {
              newFormData[`causeofdeforestation${causeofdeforestationIndex}`] = updatedFormData[key];
              causeofdeforestationIndex++;
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
