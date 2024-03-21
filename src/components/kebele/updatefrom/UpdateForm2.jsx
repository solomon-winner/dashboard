import React, { useState } from "react";

import { FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { kebeledata } from "../UpdateKebele";

export const UpdateForm2 = ({handleChange}) => {
  const [updateData, setUpdateData] = useState(kebeledata[0]);
  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUpdateData({...updateData, [name]: value});
    handleChange(event);
  }
    return (
          <div>
          <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
              Owns Land
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male headed"
                name="maleownland"
                type="text"
                placeholder="Total Number of Male"
                icon={FamilyRestroom}
                value={updateData.maleownland}
                handleChange={handleChanges}
              />
              <FormField
                label="Female headed"
                name="femaleownland"
                type="text"
                placeholder="Total Number of Female"
                icon={FamilyRestroom}
                value={updateData.femaleownland}
                handleChange={handleChanges}
              />
            </div>

            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
              Doesnot Own Land
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male headed"
                name="maledontownland"
                type="text"
                placeholder="Total Number of Male"
                icon={FamilyRestroom}
                value={updateData.maledontownland}
                handleChange={handleChanges}
              />
              <FormField
                label="Female headed"
                name="femaledontownland"
                type="text"
                placeholder="Total Number of Female"
                icon={FamilyRestroom}
                value={updateData.femaledontownland}
                handleChange={handleChanges}
              />
            </div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Unemployed
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="unemployedmale"
                type="text"
                placeholder="Total Number of Male"
                icon={FamilyRestroom}
                value={updateData.unemployedmale}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="unemployedfemale"
                type="text"
                placeholder="Total Number of Female"
                icon={FamilyRestroom}
                value={updateData.unemployedfemale}
                handleChange={handleChanges}
              />
            </div>
    </div>
    )
}