import React, { useState } from "react";
import { AddCircleOutline, Delete, Forest } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { Field } from "formik";
import { kebeles } from "../addform/AddForm";
import { weredas } from "../../wereda/addform/AddForm";
import { regions } from "../../region/addform/AddForm";
import { sitedata } from "../UpdateSite";

export const UpdateForm = ({handleChange}) => {
  const [updateData, setUpdateData] = useState(sitedata[0]);
  const [additionalFieldsIndegeneous, setAdditionalFieldsIndegeneous] =
    useState(
      updateData.typeindegeneous.map((type, index) => ({
        id: index,
        type: type.type,
      }))
    );
  const [additionalFieldsExotic, setAdditionalFieldsExotic] = useState(
    updateData.typeexotic.map((type, index) => ({ id: index, type: type.type }))
  );

  const handleChanges = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("typeindegeneous") || name.startsWith("typeexotic")) {
      const [, index] = name.split("-");
      const fieldId = parseInt(index);
      if (name.startsWith("typeindegeneous")) {
        setAdditionalFieldsIndegeneous(
          additionalFieldsIndegeneous.map((field) =>
            field.id === fieldId ? { ...field, type: value } : field
          )
        );
      } else if (name.startsWith("typeexotic")) {
        setAdditionalFieldsExotic(
          additionalFieldsExotic.map((field) =>
            field.id === fieldId ? { ...field, type: value } : field
          )
        );
      }
    } else {
      setUpdateData({ ...updateData, [name]: value });
    }
    handleChange(event);
  };
  const addFieldIndegeneous = () => {
    const highestId = additionalFieldsIndegeneous.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFieldsIndegeneous([
      ...additionalFieldsIndegeneous,
      { id: highestId + 1, type: "" },
    ]);
  };
  const removeFieldIndegeneous = (id) => {
    setAdditionalFieldsIndegeneous(
      additionalFieldsIndegeneous.filter((field) => field.id !== id)
    );
  };
  const addFieldExotic = () => {
    const highestId = additionalFieldsExotic.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFieldsExotic([
      ...additionalFieldsExotic,
      { id: highestId + 1, type: "" },
    ]);
  };
  const removeFieldExotic = (id) => {
    setAdditionalFieldsExotic(
      additionalFieldsExotic.filter((field) => field.id !== id)
    );
  };
  return (
    <div>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-2/5 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-500 text-xs font-bold mb-2"
              htmlFor="region"
            >
              Region
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <Field
                as="select"
                name="region"
                className="border-0 px-3 py-1 text-sm focus:outline-none w-full bg-transparent"
                value={updateData.region}
                handleChange={handleChange}
                onChange={handleChanges}
              >
                <option value="">Select a Region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </div>

        <FormField
          label="Wereda"
          name="wereda"
          type="text"
          placeholder="Name of Wereda"
          value={updateData.wereda}
          handleChange={handleChanges}
        />
        <FormField
          label="Kebele"
          name="kebele"
          type="text"
          placeholder="Name of Kebele"
          value={updateData.kebele}
          handleChange={handleChanges}
        />
        <FormField
          label="MicroWaterShed"
          name="microwatershed"
          type="text"
          placeholder="Name of MicroWaterShed"
          value={updateData.microwatershed}
          handleChange={handleChanges}
        />
        <FormField
          label="Site"
          name="site"
          type="text"
          placeholder="Name of Site"
          value={updateData.site}
          handleChange={handleChanges}
        />
        <FormField
          label="Size of Site"
          name="sizeofsite"
          type="text"
          placeholder="Size of Site in ha"
          value={updateData.sizeofsite}
          handleChange={handleChanges}
        />
        <FormField
          label="Site GeoJSON"
          type="file"
          name="file"
          handleChange={handleChanges}
        />
      </div>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Trees
      </h6>
      <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
        Indegeneous
      </h6>
      <div class="flex flex-wrap">
        {additionalFieldsIndegeneous.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`typeindegeneous-${field.id}`}
              type="dropdown"
              placeholder="Type of Tree"
              icon={Forest}
              value={field.type}
              list="indegeneousList"
              options={["C. africana"," O. africana","R. prinoides","C. macrstachyus","C. tomentosa","M. ferruginea (Birbira)","J. procera",]}
              handleChange={handleChange}
              onChange={handleChanges}
            />
            <Delete
              onClick={() => removeFieldIndegeneous(field.id)}
              className="lg:mt-8"
            />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addFieldIndegeneous} className="lg:mt-8" />
      </div>
      <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
        Exotic
      </h6>
      <div class="flex flex-wrap">
        {additionalFieldsExotic.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`typeexotic-${field.id}`}
              type="dropdown"
              placeholder="Type of Tree"
              icon={Forest}
              value={field.type}
              list="exoticList"
              options={["A. decurrens","G. robusta","C. lustanica","C. equisetifolia","S. sesban",]}
              handleChange={handleChange}
              onChange={handleChanges}
            />
            <Delete
              onClick={() => removeFieldExotic(field.id)}
              className="lg:mt-8"
            />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addFieldExotic} className="lg:mt-8" />
      </div>
    </div>
  );
};
