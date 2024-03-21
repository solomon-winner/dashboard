import React, { useState } from "react";
import { Apartment, FamilyRestroom, Landscape } from "@mui/icons-material";
import { FormField } from "../AddWereda";
import { weredadata } from "../UpdateWereda";
import { regions } from "../../region/addform/AddForm";
import { Field } from "formik";


export const UpdateForm = ({handleChange}) => {
  const [updateData, setUpdateData] = useState(weredadata[0])
  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUpdateData({...updateData, [name]: value});
    handleChange(event);
  }
  
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
      </div>
      <hr class="mt-3 border-b-1 border-blueGray-300"></hr>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Kebele
      </h6>
      <div class="flex flex-wrap">
        <FormField
          label="Urban"
          name="urban"
          type="text"
          placeholder="Urban"
          icon={Apartment}
          value={updateData.urban}
          handleChange={handleChanges}
        />
        <FormField
          label="Rural"
          name="rural"
          type="text"
          placeholder="Rural"
          icon={Landscape}
          value={updateData.rural}
          handleChange={handleChanges}
        />
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
    </div>
  );
};
