import React, { useEffect, useState } from "react";
import { AddCircleOutline, Delete, Medication } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const UpdateForm6 = ({ handleChange, formData, setFormData }) => {
  const {
    nursery,
    causeofdeforestation,
    isLoadingCauseofdeforestation,
    isLoadingNursery,
  } = useSelector((state) => state.resource);
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Nursery
      </h6>

      <FieldComponent
      initialValues={formData}
      placeholder={["Select Nursery Type","Number of Nursery","Capacity"]}
      type={["dropdown","number","number"]}
      label={["nurserytype","amount","capacity"]}
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
        const keyToUpdate = name === "nurserytype" ? `nurserytype${id}` : `${name}${id}`;
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
          [`capacity${id}`]: ""
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
      label={["causeofdeforestationtype"]}
      options={
        isLoadingCauseofdeforestation
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
        const values = name === "causeofdeforestationtype" && typeof value === "object" ? value.value : value;
        const keyToUpdate = name === "causeofdeforestationtype" ? `causeofdeforestationtype${id}` : `${name}${id}`;
        setFormData((prevState) => ({
          ...prevState,
          [keyToUpdate]: values,
        }));
      }}
      onremove={(id) => {
        setFormData((prevState) => ({
          ...prevState,
          [`causeofdeforestationtype${id}`]: "",
        }));
      }}
      icon={Medication}
      />
    </div>
  );
};
