import React, { useEffect, useState } from "react";
import {
  AddCircleOutline,
  Delete,
  FamilyRestroom,
  Forest,
  Grass,
} from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { kebeledata } from "../UpdateKebele";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";

const extractAdditionalFieldsData = (prefix, formData, prefix2) => {
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
export const UpdateForm5 = ({handleChange,formData,setFormData}) => {
    const {crop,fruit,tree,isLoadingCrop,isLoadingFruit,isLoadingTree}=useSelector((state)=>state.resource)
    const [additionalFields, setAdditionalFields] = useState([]);
    const [additionalFields2, setAdditionalFields2] = useState([]);
    const [additionalFields3, setAdditionalFields3] = useState([]);
    const [additionalFields4, setAdditionalFields4] = useState([]);

    useEffect(() => {
        if (Object.keys(formData).length > 0) {
           const initialAdditionalFields = extractAdditionalFieldsData('croptype', formData, 'croparea');
           const initialAdditionalFields2 = extractAdditionalFieldsData('fruittype', formData, 'fruitarea');
           const initialAdditionalFields3 = extractAdditionalFieldsData('indegeneoustype', formData);
           const initialAdditionalFields4 = extractAdditionalFieldsData('exotictype', formData);
       
           setAdditionalFields(initialAdditionalFields);
           setAdditionalFields2(initialAdditionalFields2);
           setAdditionalFields3(initialAdditionalFields3);
           setAdditionalFields4(initialAdditionalFields4);
       
           const updatedFormData = { ...formData };
       
           // Handle croptype
           const type = initialAdditionalFields.map((item) => item.croptype);
           type.forEach((item, index) => {
             const name = crop.find((crop) => crop.id === item)?.name || "";
             updatedFormData[`cropname${index + 1}`] = name;
           });
       
           // Handle fruittype
           const fruitType = initialAdditionalFields2.map((item) => item.fruittype);
           fruitType.forEach((item, index) => {
             const name = fruit.find((fruit) => fruit.id === item)?.name || "";
             updatedFormData[`fruitname${index + 1}`] = name;
           });
       
           // Handle indegeneoustype
           const indegeneousType = initialAdditionalFields3.map((item) => item.indegeneoustype);
           indegeneousType.forEach((item, index) => {
             const name = tree.find((tree) => tree.id === item)?.name || "";
             updatedFormData[`indegeneousname${index + 1}`] = name;
           });
       
           // Handle exotictype
           const exoticType = initialAdditionalFields4.map((item) => item.exotictype);
           exoticType.forEach((item, index) => {
             const name = tree.find((tree) => tree.id === item)?.name || "";
             updatedFormData[`exoticname${index + 1}`] = name;
           });
       
           setFormData(updatedFormData);
        }
       }, [crop, fruit, tree]);
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
        const updatedFormData = { ...formData };
        delete updatedFormData[`croptype${id + 1}`];
        delete updatedFormData[`croparea${id + 1}`];
        delete updatedFormData[`cropname${id + 1}`];
        let newFormData = {};
        let croptypeIndex = 1;
        let cropareaIndex = 1;
        let cropnameIndex = 1;
        for (let key in updatedFormData) {
           if (key.startsWith('croptype') && key !== `croptype${id + 1}`) {
             newFormData[`croptype${croptypeIndex}`] = updatedFormData[key];
             croptypeIndex++;
           } else if (key.startsWith('croparea') && key !== `croparea${id + 1}`) {
             newFormData[`croparea${cropareaIndex}`] = updatedFormData[key];
             cropareaIndex++;
           } else if (key.startsWith('cropname') && key !== `cropname${id + 1}`) {
            newFormData[`cropname${cropnameIndex}`] = updatedFormData[key];
            cropnameIndex++;
           }
            else {
             newFormData[key] = updatedFormData[key];
           }
        }
        setFormData(newFormData);
       };
       useEffect(() => {
        console.log(formData);
       }, [formData]);
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
      const updatedFormData = { ...formData };
      delete updatedFormData[`fruittype${id + 1}`];
      delete updatedFormData[`fruitarea${id + 1}`];
      delete updatedFormData[`fruitname${id + 1}`];
      let newFormData = {};
      let fruittypeIndex = 1;
      let fruitareaIndex = 1;
      let fruitnameIndex = 1;
      for (let key in updatedFormData) {
         if (key.startsWith('fruittype') && key !== `fruittype${id + 1}`) {
           newFormData[`fruittype${fruittypeIndex}`] = updatedFormData[key];
           fruittypeIndex++;
         } else if (key.startsWith('fruitarea') && key !== `fruitarea${id + 1}`) {
           newFormData[`fruitarea${fruitareaIndex}`] = updatedFormData[key];
           fruitareaIndex++;
         } else if (key.startsWith('fruitname') && key !== `fruitname${id + 1}`) {
          newFormData[`fruitname${fruitnameIndex}`] = updatedFormData[key];
          fruitnameIndex++;
         }
          else {
           newFormData[key] = updatedFormData[key];
         }
      }
      setFormData(newFormData);
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
      const updatedFormData = { ...formData };
      delete updatedFormData[`indegeneoustype${id + 1}`];
      delete updatedFormData[`indegeneousname${id + 1}`];
      let newFormData = {};
      let indegeneoustypeIndex = 1;
      let indegeneousnameIndex = 1;
      for (let key in updatedFormData) {
         if (key.startsWith('indegeneoustype') && key !== `indegeneoustype${id + 1}`) {
           newFormData[`indegeneoustype${indegeneoustypeIndex}`] = updatedFormData[key];
           indegeneoustypeIndex++;
         } else if (key.startsWith('indegeneousname') && key !== `indegeneousname${id + 1}`) {
           newFormData[`indegeneousname${indegeneousnameIndex}`] = updatedFormData[key];
           indegeneousnameIndex++;
         }
          else {
           newFormData[key] = updatedFormData[key];
         }
      }
      setFormData(newFormData);
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
      const updatedFormData = { ...formData };
      delete updatedFormData[`exotictype${id + 1}`];
      delete updatedFormData[`exoticname${id + 1}`];
      let newFormData = {};
      let exotictypeIndex = 1;
      let exoticnameIndex = 1;
      for (let key in updatedFormData) {
         if (key.startsWith('exotictype') && key !== `exotictype${id + 1}`) {
           newFormData[`exotictype${exotictypeIndex}`] = updatedFormData[key];
           exotictypeIndex++;
         } else if (key.startsWith('exoticname') && key !== `exoticname${id + 1}`) {
           newFormData[`exoticname${exoticnameIndex}`] = updatedFormData[key];
           exoticnameIndex++;
         }
          else {
           newFormData[key] = updatedFormData[key];
         }
      }
      setFormData(newFormData);
    };
  
  
    const handleChanges = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          [e.target.label]: e.target.labelName
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
                    handleChange={handleChanges}
                    value={formData[`cropname${index + 1}`]  || formData[`croptype${index + 1}`]}
                    onChange={(option) => {
                      handleChanges({
                        target: {
                          name: `croptype${index + 1}`,
                          value: option.target.value.value,
                          label: `cropname${index + 1}`,
                          labelName: option.target.value.label
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
                    handleChange={handleChanges}
                    value={formData[`fruitname${index + 1}`]  || formData[`fruittype${index + 1}`]}
                    onChange={(option) => {
                      handleChanges({
                        target: {
                          name: `fruittype${index + 1}`,
                          value: option.target.value.value,
                          label: `fruitname${index + 1}`,
                          labelName: option.target.value.label
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
                  value={formData[`indegeneousname${index + 1}`]  || formData[`indegeneoustype${index + 1}`]}
                  handleChange={handleChanges}
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `indegeneoustype${index + 1}`,
                        value: option.target.value.value,
                        label: `indegeneousname${index + 1}`,
                        labelName: option.target.value.label
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
                  value={formData[`exoticname${index + 1}`]  || formData[`exotictype${index + 1}`]}
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `exotictype${index + 1}`,
                        value: option.target.value.value,
                        label: `exoticname${index + 1}`,
                        labelName: option.target.value.label
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

