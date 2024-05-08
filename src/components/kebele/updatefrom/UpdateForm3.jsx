import { AddCircleOutline, Delete, FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import React, { useEffect, useState } from "react";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import { log } from "../../Resource/Utility/Logger";

export const extractAdditionalFieldsData = (
  prefix,
  formData,
  prefix2,
  prefix3
) => {
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
export const UpdateForm3 = ({ handleChange, formData, setFormData }) => {
  const { livelihood, isLoadingLivelihood } = useSelector(
    (state) => state.resource
  );
  const [additionalFields1, setAdditionalFields1] = useState([]);
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const initialAdditionalFields = extractAdditionalFieldsData(
        "livelihoodtype",
        formData,
        "livelihoodmale",
        "livelihoodfemale"
      );
      setAdditionalFields1(initialAdditionalFields);
      const updatedFormData = { ...formData };
      const type = initialAdditionalFields.map((item) => item.livelihoodtype);
      type.forEach((item, index) => {
        const name =
          livelihood.find((livelihood) => livelihood.id === item)?.name || "";
        updatedFormData[`livelihoodname${index + 1}`] = name;
      });
      setFormData(updatedFormData);
    }
  }, [livelihood]);

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
    const updatedFormData = { ...formData };
    delete updatedFormData[`livelihoodtype${id + 1}`];
    delete updatedFormData[`livelihoodmale${id + 1}`];
    delete updatedFormData[`livelihoodfemale${id + 1}`];
    delete updatedFormData[`livelihoodname${id + 1}`];
    let newFormData = {};
    let livelihoodtypeIndex = 1;
    let livelihoodmaleIndex = 1;
    let livelihoodfemaleIndex = 1;
    let livelihoodnameIndex = 1;
    for (let key in updatedFormData) {
      if (
        key.startsWith("livelihoodtype") &&
        key !== `livelihoodtype${id + 1}`
      ) {
        newFormData[`livelihoodtype${livelihoodtypeIndex}`] =
          updatedFormData[key];
        livelihoodtypeIndex++;
      } else if (
        key.startsWith("livelihoodmale") &&
        key !== `livelihoodmale${id + 1}`
      ) {
        newFormData[`livelihoodmale${livelihoodmaleIndex}`] =
          updatedFormData[key];
        livelihoodmaleIndex++;
      } else if (
        key.startsWith("livelihoodfemale") &&
        key !== `livelihoodfemale${id + 1}`
      ) {
        newFormData[`livelihoodfemale${livelihoodfemaleIndex}`] =
          updatedFormData[key];
        livelihoodfemaleIndex++;
      } else if (
        key.startsWith("livelihoodname") &&
        key !== `livelihoodname${id + 1}`
      ) {
        newFormData[`livelihoodname${livelihoodnameIndex}`] =
          updatedFormData[key];
        livelihoodnameIndex++;
      } else {
        newFormData[key] = updatedFormData[key];
      }
    }
    setFormData(newFormData);
  };
  useEffect(() => {
    log(formData);
  }, [formData]);
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
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Livelihood
      </h6>
      <div>
        {additionalFields1.map((field, index) => (
          <React.Fragment key={field.id}>
            <div className="flex flex-wrap lg:w-full">
              <FormField
                label="Type"
                name={`livelihoodtype${index + 1}`}
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
                  formData[`livelihoodname${index + 1}`] ||
                  formData[`livelihoodtype${index + 1}`]
                }
                onChange={(option) => {
                  handleChanges({
                    target: {
                      name: `livelihoodtype${index + 1}`,
                      value: option.target.value.value,
                      label: `livelihoodname${index + 1}`,
                      labelName: option.target.value.label,
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
