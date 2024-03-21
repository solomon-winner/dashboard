import React, { useState } from "react";
import { AddCircleOutline, Delete, Forest, Grass } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";

export const AddForm5 = ({handleChange,formData,setFormData}) => {
  const {crop,fruit,tree,isLoadingCrop,isLoadingFruit,isLoadingTree}=useSelector((state)=>state.resource)
  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, croptype: "", croparea: "" },
  ]);
  const [additionalFields2, setAdditionalFields2] = useState([
    { id: 0, fruittype: "", fruitarea: "" },
  ]);
  const [additionalFields3, setAdditionalFields3] = useState([
    { id: 0, indegeneoustype: "" },
  ]);
  const [additionalFields4, setAdditionalFields4] = useState([
    { id: 0, exotictype: "" },
  ]);
  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, croptype: "", croparea: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
  };
  const addField2 = () => {
    const highestId = additionalFields2.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, fruit: "", fruitarea: "" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
  };
  const addField3 = () => {
    const highestId = additionalFields3.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields3([
      ...additionalFields3,
      { id: highestId + 1, indegeneoustype: "" },
    ]);
  };
  const removeField3 = (id) => {
    setAdditionalFields3(additionalFields3.filter((field) => field.id !== id));
  };
  const addField4 = () => {
    const highestId = additionalFields4.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields4([
      ...additionalFields4,
      { id: highestId + 1, exotictype: "" },
    ]);
  };
  const removeField4 = (id) => {
    setAdditionalFields4(additionalFields4.filter((field) => field.id !== id));
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
        <div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">Crops</h6>
          <div className="flex flex-wrap">
            {additionalFields.map((field, index) => (
              <React.Fragment key={field.id}>
                <FormField
                  label="Type"
                  name={`croptype${index +  1}`}
                  type="dropdown"
                  placeholder={`Type of Crop`}
                  icon={Grass}
                  options={
                    isLoadingCrop
                      ? [
                          {
                            value: "loading",
                            label: (
                              <div className="flex justify-center">
                                <Loading />
                              </div>
                            ),
                          },
                        ]
                      : crop.map((croptype, index) => ({
                          label: croptype.name,
                          value: croptype.id,
                        }))
                  }
                  handleChange={handleChanges}
                  value={
                    crop.find(
                      (croptype) => croptype.id === formData[`croptype${index + 1}`]
                    )?.name || ""
                  }
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `croptype${index + 1}`,
                        value: option.target.value.value,
                      },
                    });
                  }}
                /> 
                  <FormField
                    label="Area"
                    name={`croparea${index +  1}`}
                    type="number"
                    placeholder="Area"
                    value={formData[`croparea${index + 1}`] || ""}
                    handleChange={handleChanges}
                  />
               <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
              </React.Fragment>
            ))}
             <AddCircleOutline onClick={addField} className="lg:mt-8" />
          </div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">Fruit</h6>
          <div className="flex flex-wrap">
            {additionalFields2.map((field, index) => (
              <React.Fragment key={field.id}>
                <FormField
                  label="Type"
                  name={`fruittype${index +  1}`}
                  type="dropdown"
                  placeholder={`Type of Fruit`}
                  icon={Grass}
                  options={
                    isLoadingFruit
                      ? [
                          {
                            value: "loading",
                            label: (
                              <div className="flex justify-center">
                                <Loading />
                              </div>
                            ),
                          },
                        ]
                      : fruit.map((fruittype, index) => ({
                          label: fruittype.name,
                          value: fruittype.id,
                        }))
                  }
                  handleChange={handleChanges}
                  value={
                    fruit.find(
                      (fruittype) => fruittype.id === formData[`fruittype${index + 1}`]
                    )?.name || ""
                  }
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `fruittype${index + 1}`,
                        value: option.target.value.value,
                      },
                    });
                  }}
                /> 
                  <FormField
                    label="Area"
                    name={`fruitarea${index +  1}`}
                    type="number"
                    placeholder="Area"
                    value={formData[`fruitarea${index + 1}`] || ""}
                    handleChange={handleChanges}
                  />
               <Delete onClick={() => removeField2(field.id)} className="lg:mt-8" />
              </React.Fragment>
            ))}
             <AddCircleOutline onClick={addField2} className="lg:mt-8" />
          </div>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
          Indegeneous
        </h6>
        <div className="flex flex-wrap">
          {additionalFields3.map((field, index) => (
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
                              <Loading />
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
                    },
                  });
                }}
              />
              <Delete
                onClick={() => removeField3(field.id)}
                className="lg:mt-8"
              />
            </React.Fragment>
          ))}
          <AddCircleOutline onClick={addField3} className="lg:mt-8" />
        </div>

        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
          Exotic
        </h6>
        <div className="flex flex-wrap">
          {additionalFields4.map((field, index) => (
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
                              <Loading />
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
                    },
                  });
                }}
              />
              <Delete
                onClick={() => removeField4(field.id)}
                className="lg:mt-8"
              />
            </React.Fragment>
          ))}
          <AddCircleOutline onClick={addField4} className="lg:mt-8" />
        </div>
        </div>
        
    </div>
  );
};