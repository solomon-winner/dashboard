import React, { useState } from "react";
import {
  AddCircleOutline,
  Delete,
  FamilyRestroom,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { kebeledata } from "../UpdateKebele";
import { regions } from "../../region/addform/AddForm";
import { Field } from "formik";

export const UpdateForm = ({handleChange}) => {
  const [updateData, setUpdateData] = useState(kebeledata[0]);
  const [additionalFields, setAdditionalFields] = useState(
    updateData.types.map((type, index) => ({
      id: index,
      type: type.type,
      area: type.area,
    }))
  );
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

  const handleChanges = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("type") || name.startsWith("area")) {
      const [, index] = name.split("-");
      setAdditionalFields(
        additionalFields.map((field) =>
          field.id === parseInt(index)
            ? { ...field, [name.split("-")[0]]: value }
            : field
        )
      );
    } else {
      setUpdateData({ ...updateData, [name]: value });
    }
    handleChange(event)
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
                value={updateData.region} // Ensure selected value is set
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
          placeholder="Enter Wereda"
          value={updateData.wereda}
          handleChange={handleChanges}
        />
        <FormField
          label="Kebele"
          name="kebele"
          type="text"
          placeholder="Name of the Kebele"
          value={updateData.kebele}
          handleChange={handleChanges}
        />
        <FormField label="Kebele GeoJSON" type="file" name="file" />
      </div>

      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Population
      </h6>
      <div class="flex flex-wrap">
        <FormField
          label="Male"
          name="male"
          type="text"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={updateData.male}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female"
          type="text"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={updateData.female}
          handleChange={handleChanges}
        />
      </div>

      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Household
      </h6>
      <div class="flex flex-wrap">
        <FormField
          label="Male"
          name="male2"
          type="text"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={updateData.male2}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female2"
          type="text"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={updateData.female2}
          handleChange={handleChanges}
        />
      </div>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <div class="flex flex-wrap">
        {additionalFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`type-${field.id}`}
              type="dropdown"
              placeholder="Land use Type"
              icon={Landscape}
              value={field.type}
              onChange={handleChanges}
              list="landuse"
              options={["Settlement", "Communal Grazing"]}
            />
            <FormField
              label="Area"
              name={`area-${field.id}`}
              type="text"
              placeholder="Area"
              value={field.area}
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
