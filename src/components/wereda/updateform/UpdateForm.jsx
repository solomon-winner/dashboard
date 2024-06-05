import React from "react";
import { Apartment, FamilyRestroom, Landscape } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";

export const UpdateForm = ({ handleChange, formData, setFormData }) => {
  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    handleChange(e);
  };
  return (
    <div>
      <hr className="mt-3 border-b-1 border-blueGray-300"></hr>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Kebele
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Urban"
          name="urban_kebeles"
          type="number"
          placeholder="Urban"
          icon={Apartment}
          value={formData.urban_kebeles}
          handleChange={handleChanges}
        />
        <FormField
          label="Rural"
          name="rural_kebeles"
          type="number"
          placeholder="Rural"
          icon={Landscape}
          value={formData.rural_kebeles}
          handleChange={handleChanges}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
      Household 
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="male_hh"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.male_hh}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female_hh"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.female_hh}
          handleChange={handleChanges}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
      Population
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="male_population"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.male_population}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female_population"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.female_population}
          handleChange={handleChanges}
        />
      </div>
    </div>
  );
};
