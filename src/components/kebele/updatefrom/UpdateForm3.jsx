import { AddCircleOutline, Delete, FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import React, { useEffect, useState } from "react";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import { log } from "../../Resource/Utility/Logger";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const UpdateForm3 = ({ handleChange, formData, setFormData }) => {
  const { livelihood, isLoadingLivelihood } = useSelector(
    (state) => state.resource
  );
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Livelihood
      </h6>

      <FieldComponent
        initialValues={formData}
        placeholder={[
          "LiveHood site can support",
          "Total Number of Male headed house holds",
          "Total Number of Female headed house holds",
        ]}
        type={["dropdown", "number", "number"]}
        label={["livelihoodtype","livelihoodmale","livelihoodfemale"]}
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
          const keyToUpdate =
            name === "livelihoodtype"
              ? `livelihoodtype${id}`
              : `${name}${id}`;
          setFormData((prevState) => ({
            ...prevState,
            [keyToUpdate]: values,
          }));
        }}
        onremove={(id) => {
          setFormData((prevState) => ({
            ...prevState,
            [`livelihoodtype${id}`]: "",
            [`livelihoodmale${id}`]: "",
            [`livelihoodfemale${id}`]: "",
          }));
        }}
        icon={FamilyRestroom}
      />
    </div>
  );
};
