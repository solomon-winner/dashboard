import React, { useState } from "react";
import { Apartment, FamilyRestroom, Landscape } from "@mui/icons-material";
import { FormField } from "../AddWereda";
import { weredadata } from "../UpdateWereda";
import { regions } from "../../region/addform/AddForm";
import { Field } from "formik";
import Select from "react-select";
import Loadings from "../../Resource/Loading/Loadings";
import { useSelector } from "react-redux";
import { useGetWeredaByRegionQuery } from "../../../redux/region/RegionApiSlice";

export const UpdateForm = ({ handleChange, formData, setFormData }) => {
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));

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
          value={formData.data?.urban_kebeles || ""}
          handleChange={handleChanges}
        />
        <FormField
          label="Rural"
          name="rural_kebeles"
          type="number"
          placeholder="Rural"
          icon={Landscape}
          value={formData.data?.rural_kebeles || ""}
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
          value={formData.data?.male_hh || ""}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female_hh"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.data?.female_hh || ""}
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
          value={formData.data?.male_population || ""}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female_population"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.data?.female_population || ""}
          handleChange={handleChanges}
        />
      </div>
    </div>
  );
};
