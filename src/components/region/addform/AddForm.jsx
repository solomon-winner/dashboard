import React, { useState } from "react";
import {Field } from "formik";
import {
  AddCircleOutline,
  Apartment,
  Delete,
  FamilyRestroom,
  Landscape,
  Public,
} from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";

export const regions = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "Southern Nations, Nationalities, and Peoples' Region (SNNPR)",
  "Tigray"
];

export const AddForm = () => {
  const [additionalFields, setAdditionalFields] = useState([]);

  const addField = () => {
    setAdditionalFields([...additionalFields, { type: "", area: "" }]);
  };
  const removeField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
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
        label="Region GeoJSON"
          type="file"
          name="file"
        />
      </div>
      <hr class="mt-3 border-b-1 border-blueGray-300"></hr>
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
        />
        <FormField
          label="Female"
          name="female"
          type="text"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
        />
      </div>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Zone
      </h6>
      <div class="flex flex-wrap">
        <FormField
          label="Name of Zone"
          name="Zone"
          type="text"
          placeholder="Name of Zone"
          icon={Public}
        />
      </div>
      <div class="flex flex-wrap">
        <FormField
          label="Male"
          name="malezone"
          type="text"
          placeholder="Total Number of Male in Zone"
          icon={Public}
        />
        <FormField
          label="Female"
          name="femalezone"
          type="text"
          placeholder="Total Number of Female in Zone"
          icon={Public}
        />
      </div>
      {additionalFields.map((field, index) => (
        <React.Fragment key={index}>
          <div class="flex flex-wrap">
            <FormField
              label="Name of Zone"
              name={`Zone${index + 2}`}
              type="text"
              placeholder="Name of Zone"
              icon={Public}
            />
          </div>
          <div class="flex flex-wrap">
            <FormField
              label="Male"
              name={`malezone${index + 2}`}
              type="text"
              placeholder="Total Number of Male in Zone"
              icon={Public}
            />
            <FormField
              label="Female"
              name={`femalezone${index + 2}`}
              type="text"
              placeholder="Total Number of Female in Zone"
            />
          </div>
          <Delete onClick={() => removeField(index)} className="lg:mt-8" />
        </React.Fragment>
      ))}
      <AddCircleOutline onClick={addField} className="lg:mt-8" />
    </div>
  );
};
