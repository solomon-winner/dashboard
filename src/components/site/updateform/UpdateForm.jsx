import React, { useEffect, useState } from "react";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import { MainLoading } from "../../Resource/Loading/Loadings";
import { log } from "../../Resource/Utility/Logger";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

export const UpdateForm = ({ handleChange, formData, setFormData }) => {
  const { tree, isLoadingTree } = useSelector((state) => state.resource);
  return (
    <div>
      {isLoadingTree ? (
        <MainLoading />
      ) : (
        <div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Trees Species found In The Site
          </h6>
          <div>
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
              const keyToUpdate = name === "indegeneoustype" ? `indegeneoustype${id}` : "";
              setFormData({
                ...formData,
                [keyToUpdate]: values,
              });
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
              const keyToUpdate = name === "exotictype" ? `exotictype${id}` : "";
              setFormData({
                ...formData,
                [keyToUpdate]: values,
              });
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
      )}
    </div>
  );
};
