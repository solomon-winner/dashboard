import React, { useState } from "react";
import { AddCircleOutline, Delete, FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const AddForm3 = ({ handleChange, formData, setFormData }) => {
  const { livelihood, isLoadingLivelihood } = useSelector(
    (state) => state.resource
  );
  const [additionalFields1, setAdditionalFields1] = useState([
    { id: 0, livelihood: "" },
  ]);
  const addField1 = () => {
    const highestId = additionalFields1.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields1([
      ...additionalFields1,
      { id: highestId + 1, livelihood: "" },
    ]);
  };
  const removeField1 = (id) => {
    setAdditionalFields1(additionalFields1.filter((field) => field.id !== id));
  };

  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    handleChange(e);
  };
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
        label={["livelihood", "livelihoodmale", "livelihoodfemale"]}
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
          const values =
            name === "livelihood" && typeof value === "object"
              ? value.value
              : value;
          const keyToUpdate =
            name === "livelihood" ? `livelihood${id}` : `${name}${id}`;
          setFormData((prevState) => ({
            ...prevState,
            [keyToUpdate]: values,
          }));
        }}
        onremove={(id) => {
          const updatedFormData = { ...formData };
          delete updatedFormData[`livelihood${id}`];
          delete updatedFormData[`livelihoodmale${id}`];
          delete updatedFormData[`livelihoodfemale${id}`];
          let newFormData = {};
          let livelihoodIndex = 1;
          let livelihoodmaleIndex = 1;
          let livelihoodfemaleIndex = 1;

          for (let key in updatedFormData) {
            if (key.startsWith("livelihood")) {
              newFormData[`livelihood${livelihoodIndex}`] =
                updatedFormData[key];
              livelihoodIndex++;
            } else if (key.startsWith("livelihoodmale")) {
              newFormData[`livelihoodmale${livelihoodmaleIndex}`] =
                updatedFormData[key];
              livelihoodmaleIndex++;
            } else if (key.startsWith("livelihoodfemale")) {
              newFormData[`livelihoodfemale${livelihoodfemaleIndex}`] =
                updatedFormData[key];
              livelihoodfemaleIndex++;
            } else {
              newFormData[key] = updatedFormData[key];
            }
          }

          setFormData(newFormData);
        }}
        icon={FamilyRestroom}
      />
    </div>
  );
};
