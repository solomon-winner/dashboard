import React, { useEffect, useState } from "react";
import { AddCircleOutline, Delete, Forest } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { ErrorMessage, Field } from "formik";
import { kebeles } from "../addform/AddForm";
import { weredas } from "../../wereda/addform/AddForm";
import { regions } from "../../region/addform/AddForm";
import { sitedata } from "../UpdateSite";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useGetKebeleByWeredaQuery } from "../../../redux/kebele/KebeleApiSlice";
import { useGetWeredaByRegionQuery } from "../../../redux/region/RegionApiSlice";
import { useGetSiteByKebeleQuery } from "../../../redux/site/SiteApiSlice";
import {MainLoading} from "../../Resource/Loading/Loadings";
export const extractAdditionalFieldsData = (prefix, formData, prefix2) => {
  const fields = [];
  let index = 1;
  while (formData[`${prefix}${index}`]) {
    fields.push({
      id: index - 1, // Adjusting index to start from 0
      [prefix]: formData[`${prefix}${index}`],
      [prefix2]: formData[`${prefix2}${index}`],
    });
    index++;
  }
  return fields;
};
export const UpdateForm = ({ handleChange, formData, setFormData }) => {
  const { tree, isLoadingTree } = useSelector((state) => state.resource);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [additionalFields2, setAdditionalFields2] = useState([]);
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const initialAdditionalFields = extractAdditionalFieldsData(
        "indegeneoustype",
        formData
      );
      const initialAdditionalFields2 = extractAdditionalFieldsData(
        "exotictype",
        formData
      );
      setAdditionalFields(initialAdditionalFields);
      setAdditionalFields2(initialAdditionalFields2);
      const updatedFormData = { ...formData };
      const type = initialAdditionalFields.map((item) => item.indegeneoustype);
      type.forEach((item, index) => {
        const name = tree.find((tree) => tree.id === item)?.name || "";
        updatedFormData[`indegeneousname${index + 1}`] = name;
      });
      const type2 = initialAdditionalFields2.map((item) => item.exotictype);
      type2.forEach((item, index) => {
        const name = tree.find((tree) => tree.id === item)?.name || "";
        updatedFormData[`exoticname${index + 1}`] = name;
      });
      setFormData(updatedFormData);
      console.log(initialAdditionalFields);
    }
  }, [tree]);

  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, indegeneoustype: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
    const updatedFormData = { ...formData };
    delete updatedFormData[`indegeneoustype${id + 1}`];
    delete updatedFormData[`indegeneousname${id + 1}`];
    let newFormData = {};
    let indegeneoustypeIndex = 1;
    let indegeneousnameIndex = 1;
    for (let key in updatedFormData) {
      if (
        key.startsWith("indegeneoustype") &&
        key !== `indegeneoustype${id + 1}`
      ) {
        newFormData[`indegeneoustype${indegeneoustypeIndex}`] =
          updatedFormData[key];
        indegeneoustypeIndex++;
      } else if (
        key.startsWith("indegeneousname") &&
        key !== `indegeneousname${id + 1}`
      ) {
        newFormData[`indegeneousname${indegeneousnameIndex}`] =
          updatedFormData[key];
        indegeneousnameIndex++;
      } else {
        newFormData[key] = updatedFormData[key];
      }
    }
    setFormData(newFormData);
  };
  const addField2 = () => {
    const highestId = additionalFields2.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, exotictype: "" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
    const updatedFormData = { ...formData };
    delete updatedFormData[`exotictype${id + 1}`];
    delete updatedFormData[`exoticname${id + 1}`];
    let newFormData = {};
    let exotictypeIndex = 1;
    let exoticnameIndex = 1;
    for (let key in updatedFormData) {
      if (key.startsWith("exotictype") && key !== `exotictype${id + 1}`) {
        newFormData[`exotictype${exotictypeIndex}`] = updatedFormData[key];
        exotictypeIndex++;
      } else if (
        key.startsWith("exoticname") &&
        key !== `exoticname${id + 1}`
      ) {
        newFormData[`exoticname${exoticnameIndex}`] = updatedFormData[key];
        exoticnameIndex++;
      } else {
        newFormData[key] = updatedFormData[key];
      }
    }
    setFormData(newFormData);
  };

  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.label]: e.target.labelName,
    });
    handleChange(e);
  };
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
            <div className="flex flex-wrap">
              {additionalFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <FormField
                    label="Type"
                    name={`indegeneoustype${index + 1}`}
                    type="dropdown"
                    placeholder="Type of Indegeneous"
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
                    value={
                      tree.find(
                        (tree) =>
                          tree.id === formData[`indegeneoustype${index + 1}`]
                      )?.name || ""
                    }
                    handleChange={handleChanges}
                    onChange={(option) => {
                      handleChanges({
                        target: {
                          name: `indegeneoustype${index + 1}`,
                          value: option.target.value.value,
                          label: `indegeneousname${index + 1}`,
                          labelName: option.target.value.label,
                        },
                      });
                    }}
                  />
                  <Delete
                    onClick={() => removeField(field.id)}
                    className="lg:mt-8"
                  />
                </React.Fragment>
              ))}
              <AddCircleOutline onClick={addField} className="lg:mt-8" />
            </div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
              Exotic
            </h6>
            <div className="flex flex-wrap">
              {additionalFields2.map((field, index) => (
                <React.Fragment key={field.id}>
                  <FormField
                    label="Type"
                    name={`exotictype${index + 1}`}
                    type="dropdown"
                    placeholder="Type of Exotic"
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
                    handleChange={handleChanges}
                    value={
                      tree.find(
                        (tree) => tree.id === formData[`exotictype${index + 1}`]
                      )?.name || ""
                    }
                    onChange={(option) => {
                      handleChanges({
                        target: {
                          name: `exotictype${index + 1}`,
                          value: option.target.value.value,
                          label: `exoticname${index + 1}`,
                          labelName: option.target.value.label,
                        },
                      });
                    }}
                  />
                  <Delete
                    onClick={() => removeField2(field.id)}
                    className="lg:mt-8"
                  />
                </React.Fragment>
              ))}
              <AddCircleOutline onClick={addField2} className="lg:mt-8" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
