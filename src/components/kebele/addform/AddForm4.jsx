import {
  AddCircleOutline,
  Delete,
  FamilyRestroom,
  Grass,
  Pets,
} from "@mui/icons-material";
import React, { useState } from "react";
import { FormField } from "../../wereda/AddWereda";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";

const option = [
  "Grass",
  "Elephant Grass",
  "Suspania suspan",
  "Truelucern",
  "Sespanya",
  "Yekintebameno",
  "Cow Pea",
];
export const AddForm4 = ({handleChange,formData,setFormData}) => {
  const { livestock,forage, isLoadingLiveStock,isLoadingForage } = useSelector(
    (state) => state.resource
  );
  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, type: "", area: "" },
  ]);
  const [additionalFields2, setAdditionalFields2] = useState([
    { id: 0, livestock: "",numberlivestock:"" },
  ]);
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
  };
  const addField2 = () => {
    const highestId = additionalFields2.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, livestock: "",numberlivestock:"" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
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
        Livestock
      </h6>
      <div className="flex flex-wrap">
      {additionalFields2.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`livestock${index + 1}`}
              type="dropdown"
              placeholder="Type of Livestock"
              options={
                isLoadingLiveStock
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
                  : livestock.map((livestock, index) => ({
                      label: livestock.name,
                      value: livestock.id,
                    }))
              }
              handleChange={handleChanges}
              value={
                livestock.find(
                  (livestock) => livestock.id === formData[`livestock${index + 1}`]
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `livestock${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <FormField
                    label="Number of Livestock"
                    name={`numberlivestock${index +  1}`}
                    type="number"
                    placeholder="Total Number of Livestock"
                    value={formData[`numberlivestock${index + 1}`] || ""}
                    handleChange={handleChanges}
                  />
            <Delete onClick={() => removeField2(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField2} className="lg:mt-8" />
        
      </div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Forage
      </h6>
      <div className="flex flex-wrap">
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`forgetype${index + 2}`}
              type="dropdown"
              placeholder="Type of Forage"
              icon={Grass}
              options={
                isLoadingForage
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
                  : forage.map((forgetype, index) => ({
                      label: forgetype.name,
                      value: forgetype.id,
                    }))
              }
              handleChange={handleChanges}
              value={
                forage.find(
                  (forgetype) => forgetype.id === formData[`forgetype${index + 1}`]
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `forgetype${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <FormField
              label="Area"
              name={`forgearea${index + 1}`}
              type="number"
              placeholder="Area"
              value={formData[`forgearea${index + 1}`] || ""}
              handleChange={handleChanges}
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>
    </div>
  );
};
