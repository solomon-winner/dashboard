import React, { useEffect, useState } from "react";
import { AddCircleOutline, Delete, Landslide, Medication } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { kebeledata } from "../UpdateKebele";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";

export const extractAdditionalFieldsData = (prefix, formData, prefix2,prefix3) => {
  const fields = [];
  let index = 1;
  while (formData[`${prefix}${index}`]) {
    fields.push({
      id: index - 1, // Adjusting index to start from 0
      [prefix]: formData[`${prefix}${index}`],
      [prefix2]: formData[`${prefix2}${index}`],
      [prefix3]: formData[`${prefix3}${index}`],
    });
    index++;
  }
  return fields;
};
export const UpdateForm6 = ({handleChange,formData,setFormData}) => {
  const {nursery,causeofdeforestation,isLoadingCauseofdeforestation,isLoadingNursery}= useSelector((state)=>state.resource)
  const [additionalFields, setAdditionalFields] = useState([]);
  const [additionalFields2, setAdditionalFields2] = useState([]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const initialAdditionalFields = extractAdditionalFieldsData('nurserytype', formData, 'amount','capacity');
      const initialAdditionalFields2 = extractAdditionalFieldsData('causeofdeforestiontype', formData);
      setAdditionalFields(initialAdditionalFields);
      setAdditionalFields2(initialAdditionalFields2);
      const updatedFormData = { ...formData };
      const type = initialAdditionalFields.map((item) => item.livestock) 
      type.forEach((item,index)=>{
         const name = nursery.find(
          (nursery) => nursery.id === item
        )?.name || ""
        updatedFormData[`nurseryname${index + 1}`] = name;
      })

      const type2 = initialAdditionalFields2.map((item) => item.causeofdeforestiontype)
      type2.forEach((item,index)=>{
         const name = causeofdeforestation.find(
          (causeofdeforestation) => causeofdeforestation.id === item
        )?.name || ""
        updatedFormData[`causeofdeforestionname${index + 1}`] = name;
      })
      setFormData(updatedFormData);
      
    }
 }, [nursery,causeofdeforestation]); 
  const addField = () => {
    const highestId = additionalFields.reduce((highest, field) => Math.max(highest, field.id),  0);
    setAdditionalFields([...additionalFields, { id: highestId +  1, nurserytype: "",numberofnursery:"" }]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
    const updatedFormData = { ...formData };
    delete updatedFormData[`nurserytype${id + 1}`];
    delete updatedFormData[`amount${id + 1}`];
    delete updatedFormData[`capacity${id + 1}`];
    delete updatedFormData[`nurseryname${id + 1}`];
    let newFormData = {};
    let nurserytypeIndex = 1;
    let amountIndex = 1;
    let capacityIndex = 1;
    let nurserynameIndex = 1
    for (let key in updatedFormData) {
       if (key.startsWith('nurserytype') && key !== `nurserytype${id + 1}`) {
         newFormData[`nurserytype${nurserytypeIndex}`] = updatedFormData[key];
         nurserytypeIndex++;
       } else if (key.startsWith('amount') && key !== `amount${id + 1}`) {
         newFormData[`amount${amountIndex}`] = updatedFormData[key];
         amountIndex++;
       } else if (key.startsWith('capacity') && key !== `capacity${id + 1}`) {
        newFormData[`capacity${capacityIndex}`] = updatedFormData[key];
        capacityIndex++;
       }else if (key.startsWith('nurseryname') && key !== `nurseryname${id + 1}`) {
        newFormData[`nurseryname${nurserynameIndex}`] = updatedFormData[key];
        nurserynameIndex++;
       }
        else {
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
      { id: highestId + 1, causeofdeforestation: "" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
    const updatedFormData = { ...formData };
    delete updatedFormData[`causeofdeforestiontype${id + 1}`];
    delete updatedFormData[`causeofdeforestionname${id + 1}`];
    let newFormData = {};
    let causeofdeforestiontypeIndex = 1;
    let causeofdeforestionnameIndex = 1
    for (let key in updatedFormData) {
      if (key.startsWith('causeofdeforestiontype') && key !== `causeofdeforestiontype${id + 1}`) {
        newFormData[`causeofdeforestiontype${causeofdeforestiontypeIndex}`] = updatedFormData[key];
        causeofdeforestiontypeIndex++;
      } else if (key.startsWith('causeofdeforestionname') && key !== `causeofdeforestionname${id + 1}`) {
        newFormData[`causeofdeforestionname${causeofdeforestionnameIndex}`] = updatedFormData[key];
        causeofdeforestionnameIndex++;
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
      [e.target.label]: e.target.labelName
    });
    handleChange(e);
  };
  return (
            <div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Nursery
            </h6>
            <div>
            {additionalFields.map((field, index) => (
              <React.Fragment key={field.id}>
                <div className="flex flex-wrap">
                <FormField
                  label="Type"
                  name={`nurserytype${index +  1}`}
                  type="dropdown"
                  placeholder={`Type of Nursery`}
                  icon={Medication}
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
                  handleChange={handleChanges}
                  value={formData[`nurseryname${index + 1}`]  || formData[`nurserytype${index + 1}`]}
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `nurserytype${index + 1}`,
                        value: option.target.value.value,
                        label: `nurseryname${index + 1}`,
                        labelName: option.target.value.label
                      },
                    });
                  }}
                /> 
                </div>
                <div className="flex flex-wrap">
                <FormField
                    label="Amount"
                    name={`amount${index +  1}`}
                    type="number"
                    placeholder="Number of Nursery"
                    value={formData[`amount${index + 1}`] || ""}
                    handleChange={handleChanges}
                  />
                  <FormField
                    label="Capacity"
                    name={`capacity${index +  1}`}
                    type="number"
                    placeholder="Number of Nursery"
                    value={formData[`capacity${index + 1}`] || ""}
                    handleChange={handleChanges}
                  />
                  </div>
               <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
              </React.Fragment>
            ))}
             <AddCircleOutline onClick={addField} className="lg:mt-8" />
            </div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Cause of deforestation
            </h6>
            <div className="flex flex-wrap lg:w-full">
            {additionalFields2.map((field, index) => (
              <React.Fragment key={field.id}>
                <FormField
                  label="Type"
                  name={`causeofdeforestationtype${index +  1}`}
                  type="dropdown"
                  placeholder="Cause of deforestation"
                  icon={Medication}
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
                  handleChange={handleChanges}
                  value={formData[`causeofdeforestionname${index + 1}`]  || formData[`causeofdeforestiontype${index + 1}`]}
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `causeofdeforestationtype${index + 1}`,
                        value: option.target.value.value,
                        label: `causeofdeforestionname${index + 1}`,
                        labelName: option.target.value.label
                      },
                    });
                  }}
                /> 
               <Delete onClick={() => removeField2(field.id)} className="lg:mt-8" />
              </React.Fragment>
            ))}
             <AddCircleOutline onClick={addField2} className="lg:mt-8" />
            </div>

    </div>
  );
};
