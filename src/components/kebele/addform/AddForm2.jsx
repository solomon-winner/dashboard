import React from "react";

import { FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";

export const AddForm2 = ({ handleChange, formData, setFormData }) => {
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
        Owns Land
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male headed"
          name="ownsmale"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.ownsmale}
          handleChange={handleChanges}
        />
        <FormField
          label="Female headed"
          name="ownsfemale"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.ownsfemale}
          handleChange={handleChanges}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Doesnot Own Land
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male headed"
          name="doesnotownmale2"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.doesnotownmale2}
          handleChange={handleChanges}
        />
        <FormField
          label="Female headed"
          name="doesnotownfemale2"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.doesnotownfemale2}
          handleChange={handleChanges}
        />
      </div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Unemployed
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="unemployedmale3"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.unemployedmale3}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="unemployedfemale3"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.unemployedfemale3}
          handleChange={handleChanges}
        />
      </div>
    </div>
  );
};
