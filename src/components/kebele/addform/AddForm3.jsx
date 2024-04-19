import React, { useState } from "react";
import { AddCircleOutline, Delete, FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";

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
      <div>
        {additionalFields1.map((field, index) => (        
          <React.Fragment key={field.id} >
            <div className="flex flex-wrap lg:w-full">
            <FormField
              label="Type"
              name={`livelihood${index + 1}`}
              type="dropdown"
              placeholder="LiveHood site can support"
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
              handleChange={handleChanges}
              value={
                livelihood.find(
                  (livelihood) =>
                    livelihood.id === formData[`livelihood${index + 1}`]
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `livelihood${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            </div>
            <div className="flex flex-wrap">
              <FormField
                label="Male"
                name={`livelihoodmale${index + 1}`}
                type="number"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={formData[`livelihoodmale${index + 1}`] || ""}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name={`livelihoodfemale${index + 1}`}
                type="number"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={formData[`livelihoodfemale${index + 1}`] || ""}
                handleChange={handleChanges}
              />
            </div>
            <Delete
              onClick={() => removeField1(field.id)}
              className="lg:mt-8"
            />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField1} className="lg:mt-8" />
      </div>
    </div>
  );
};
