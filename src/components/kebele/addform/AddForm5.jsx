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
            setFormData((prevState) => ({
              ...prevState,
              [`croptype${id}`]: "",
              [`croparea${id}`]: "",
            }));
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
            setFormData((prevState) => ({
              ...prevState,
              [`fruittype${id}`]: "",
              [`fruitarea${id}`]: "",
            }));
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
            setFormData((prevState) => ({
              ...prevState,
              [`indegeneoustype${id}`]: "",
            }));
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
            setFormData((prevState) => ({
              ...prevState,
              [`exotictype${id}`]: "",
            }));
          }}
        />
      </div>
    </div>
  );
};
