import React, { useState } from "react";
import { AddCircleOutline, Delete, Grass } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";
export const AddForm5 = ({ handleChange, formData, setFormData }) => {
  const { crop, fruit, tree, isLoadingCrop, isLoadingFruit, isLoadingTree } =
    useSelector((state) => state.resource);
  return (
    <div>
      <div>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
          Crops
        </h6>
        <FieldComponent
          initialValues={formData}
          placeholder={["Type of Crop", "Area"]}
          type={["dropdown", "number"]}
          label={["croptype", "croparea"]}
          options={
            isLoadingCrop
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
              : crop.map((croptype, index) => ({
                  label: croptype.name,
                  value: croptype.id,
                }))
          }
          onValueChange={(id, name, value) => {
            const values = name === "croptype" && typeof value === "object" ? value.value : value;
            const keyToUpdate =
              name === "croptype" ? `croptype${id}` : `${name}${id}`;
            setFormData((prevState) => ({
              ...prevState,
              [keyToUpdate]: values,
            }));
          }}
          onremove={(id) => {
            const updatedFormData = { ...formData };
            delete updatedFormData[`croptype${id}`];
            delete updatedFormData[`croparea${id}`];
            let newFormData = {};
            let croptypeIndex = 1;
            let cropareaIndex = 1;
  
            for (let key in updatedFormData) {
              if (key.startsWith("croptype")) {
                newFormData[`croptype${croptypeIndex}`] = updatedFormData[key];
                croptypeIndex++;
              } else if (key.startsWith("croparea")) {
                newFormData[`croparea${cropareaIndex}`] = updatedFormData[key];
                cropareaIndex++;
              } else {
                newFormData[key] = updatedFormData[key];
              }
            }
  
            setFormData(newFormData);
          }}
          icon={Grass}
        />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
          Fruit
        </h6>

        <FieldComponent
          initialValues={formData}
          placeholder={["Type of Fruit", "Area"]}
          type={["dropdown", "number"]}
          label={["fruittype", "fruitarea"]}
          options={
            isLoadingFruit
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
              : fruit.map((fruittype, index) => ({
                  label: fruittype.name,
                  value: fruittype.id,
                }))
          }
          onValueChange={(id, name, value) => {
            const values = name === "fruittype" && typeof value === "object" ? value.value : value;
            const keyToUpdate =
              name === "fruittype" ? `fruittype${id}` : `${name}${id}`;
            setFormData((prevState) => ({
              ...prevState,
              [keyToUpdate]: values,
            }));
          }}
          onremove={(id) => {
            const updatedFormData = { ...formData };
            delete updatedFormData[`fruittype${id}`];
            delete updatedFormData[`fruitarea${id}`];
            let newFormData = {};
            let fruittypeIndex = 1;
            let fruitareaIndex = 1;
  
            for (let key in updatedFormData) {
              if (key.startsWith("fruittype")) {
                newFormData[`fruittype${fruittypeIndex}`] = updatedFormData[key];
                fruittypeIndex++;
              } else if (key.startsWith("fruitarea")) {
                newFormData[`fruitarea${fruitareaIndex}`] = updatedFormData[key];
                fruitareaIndex++;
              } else {
                newFormData[key] = updatedFormData[key];
              }
            }
  
            setFormData(newFormData);
          }}
        />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
          Tree
        </h6>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
          Indegeneous
        </h6>

        <FieldComponent
          initialValues={formData}
          placeholder={["Type of Indegeneous"]}
          type={["dropdown"]}
          label={["indegeneoustype"]}
          options={
            isLoadingTree
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
              : tree.map((indegeneous, index) => ({
                  label: indegeneous.name,
                  value: indegeneous.id,
                }))
          }
          onValueChange={(id, name, value) => {
            const values = name === "indegeneoustype" && typeof value === "object" ? value.value : value;
            const keyToUpdate = name === "indegeneoustype" ? `indegeneoustype${id}` : `${name}${id}`;
            setFormData((prevState) => ({
              ...prevState,
              [keyToUpdate]: values,
            }));
          }}
          onremove={(id) => {
            const updatedFormData = { ...formData };
            delete updatedFormData[`indegeneoustype${id}`];
            let newFormData = {};
            let indegeneoustypeIndex = 1;
  
            for (let key in updatedFormData) {
              if (key.startsWith("indegeneoustype")) {
                newFormData[`indegeneoustype${indegeneoustypeIndex}`] = updatedFormData[key];
                indegeneoustypeIndex++;
              } else {
                newFormData[key] = updatedFormData[key];
              }
            }
  
            setFormData(newFormData);
          }}
        />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
          Exotic
        </h6>

        <FieldComponent
          initialValues={formData}
          placeholder={["Type of Exotic"]}
          type={["dropdown"]}
          label={["exotictype"]}
          options={
            isLoadingTree
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
              : tree.map((exotic, index) => ({
                  label: exotic.name,
                  value: exotic.id,
                }))
          }
          onValueChange={(id, name, value) => {
            const values = name === "exotictype" && typeof value === "object" ? value.value : value;
            const keyToUpdate = name === "exotictype" ? `exotictype${id}` : `${name}${id}`;
            setFormData((prevState) => ({
              ...prevState,
              [keyToUpdate]: values,
            }));
          }}
          onremove={(id) => {
            const updatedFormData = { ...formData };
            delete updatedFormData[`exotictype${id}`];
            let newFormData = {};
            let exotictypeIndex = 1;
            for (let key in updatedFormData) {
              if (key.startsWith("exotictype")) {
                newFormData[`exotictype${exotictypeIndex}`] = updatedFormData[key];
                exotictypeIndex++;
              } else {
                newFormData[key] = updatedFormData[key];
              }
            }
  
            setFormData(newFormData);
          }}
        />
      </div>
    </div>
  );
};
