import React, { useState } from "react";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";

export const AddForm2 = ({ handleChange, formData, setFormData }) => {
  const {
    livelihood,
    landuse,
    forage,
    isLoadingForage,
    isLoadingLanduse,
    isLoadingLivelihood,
  } = useSelector((state) => state.resource);
  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, type: "", area: "" },
  ]);
  const [additionalFields2, setAdditionalFields2] = useState([
    { id: 0, currentlanduse: "" },
  ]);
  const [additionalFields3, setAdditionalFields3] = useState([
    { id: 0, livelihood: "" },
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
      { id: highestId + 1, currentlanduse: "" },
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
      { id: highestId + 1, livelihood: "" },
    ]);
  };
  const removeField3 = (id) => {
    setAdditionalFields3(additionalFields3.filter((field) => field.id !== id));
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
        Current LandUse
      </h6>
      <div className="flex flex-wrap lg:w-2/3">
        {additionalFields2.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`currentlanduse${index + 1}`}
              type="dropdown"
              placeholder="Current LandUse"
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
                  : landuse.map((currentlanduse, index) => ({
                      label: currentlanduse.name,
                      value: currentlanduse.id,
                    }))
              }
              handleChange={handleChanges}
              value={
                landuse.find(
                  (currentlanduse) =>
                    currentlanduse.id === formData[`currentlanduse${index + 1}`]
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `currentlanduse${index + 1}`,
                    value: option.target.value.value,
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

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Forage
      </h6>
      <div className="flex flex-wrap lg:w-2/3">
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`forage${index + 1}`}
              type="dropdown"
              placeholder="Name of Forage"
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
                  : forage.map((exotic, index) => ({
                      label: exotic.name,
                      value: exotic.id,
                    }))
              }
              handleChange={handleChanges}
              value={
                forage.find(
                  (forage) => forage.id === formData[`forage${index + 1}`]
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `forage${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Livelihood site can support
      </h6>
      <div className="flex flex-wrap lg:w-2/3">
        {additionalFields3.map((field, index) => (
          <React.Fragment key={field.id}>
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
            <Delete
              onClick={() => removeField3(field.id)}
              className="lg:mt-8"
            />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField3} className="lg:mt-8" />
      </div>
    </div>
  );
};
