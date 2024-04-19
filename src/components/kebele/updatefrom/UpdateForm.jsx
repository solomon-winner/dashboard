import React, { useEffect, useState } from "react";
import {
  AddCircleOutline,
  Delete,
  FamilyRestroom,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { kebeledata } from "../UpdateKebele";
import { regions } from "../../region/addform/AddForm";
import { Field } from "formik";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
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
export const UpdateForm = ({handleChange, formData,setFormData}) => {
  const { landuse, isLoadingLanduse} = useSelector( (state) => state.resource );
  const [additionalFields, setAdditionalFields] = useState([]);
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const initialAdditionalFields = extractAdditionalFieldsData('type', formData, 'area');
      setAdditionalFields(initialAdditionalFields);
      const updatedFormData = { ...formData };
      const type = initialAdditionalFields.map((item) => item.type) 
      type.forEach((item,index)=>{
         const name = landuse.find(
          (landuse) => landuse.id === item
        )?.name || ""
        updatedFormData[`name${index + 1}`] = name;
      })
      setFormData(updatedFormData);
    }
 }, [landuse]); 

  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, type: "", area: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
    const updatedFormData = { ...formData };
    delete updatedFormData[`type${id + 1}`];
    delete updatedFormData[`area${id + 1}`];
    delete updatedFormData[`name${id + 1}`];
    let newFormData = {};
    let typeIndex = 1;
    let areaIndex = 1;
    let nameIndex = 1;
    for (let key in updatedFormData) {
       if (key.startsWith('type') && key !== `type${id + 1}`) {
         newFormData[`type${typeIndex}`] = updatedFormData[key];
         typeIndex++;
       } else if (key.startsWith('area') && key !== `area${id + 1}`) {
         newFormData[`area${areaIndex}`] = updatedFormData[key];
         areaIndex++;
       } else if (key.startsWith('name') && key !== `name${id + 1}`) {
        newFormData[`name${nameIndex}`] = updatedFormData[key];
        nameIndex++;
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
      {isLoadingLanduse ? (<MainLoading/>):(
        <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Population
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="populationmale"
          type="text"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.populationmale}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="populationfemale"
          type="text"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.populationfemale}
          handleChange={handleChanges}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Household
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="householdmale2"
          type="text"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.householdmale2}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="householdfemale2"
          type="text"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.householdfemale2}
          handleChange={handleChanges}
        />
      </div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <div className="flex flex-wrap">
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`type${index + 1}`}
              type="dropdown"
              placeholder="Select Land Type"
              options={
                isLoadingLanduse
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
                  : landuse.map((landuse, index) => ({
                      label: landuse.name,
                      value: landuse.id,
                    }))
              }
              value={formData[`name${index + 1}`]  || formData[`type${index + 1}`]}
              handleChange={handleChanges}
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `type${index + 1}`,
                    value: option.target.value.value,
                    label: `name${index + 1}`,
                    labelName: option.target.value.label
                  },
                });
              }}
            />
            <FormField
              label="Area"
              name={`area${index + 1}`}
              type="number"
              placeholder="Area"
              value={formData[`area${index + 1}`] || ""}
              handleChange={handleChanges}
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>
      </div>
      )}
    </div>
  );
};
