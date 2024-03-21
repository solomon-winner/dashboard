import React, { useState } from "react";
import { LocalHospital, School } from "@mui/icons-material";
import { FormField } from "../AddWereda";
import { weredadata } from "../UpdateWereda";

export const UpdateForm3 = ({ handleChange }) => {
  const [updateData, setUpdateData] = useState(weredadata[0])
  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUpdateData({...updateData, [name]: value});
    handleChange(event);
  }
  return (
          <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
              School
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Public University/College"
                name="college"
                type="text"
                placeholder="Number of Public University/College"
                icon={School}
                value={updateData.college}
                handleChange={handleChanges}
              />
              <FormField
                label="TVET"
                name="tvet"
                type="text"
                placeholder="Number of TVET"
                icon={School}
                value={updateData.tvet}
                handleChange={handleChanges}
              />
              <FormField
                label="High School"
                name="highschool"
                type="text"
                placeholder="Number of High School"
                icon={School}
                value={updateData.highschool}
                handleChange={handleChanges}
              />
              <FormField
                label="Secondary School"
                name="secoundschool"
                type="text"
                placeholder="Number of Secondary School"
                icon={School}
                value={updateData.secoundschool}
                handleChange={handleChanges}

              />
              <FormField
                label="Primary School"
                name="primaryschool"
                type="text"
                placeholder="Number of Primary School"
                icon={School}
                value={updateData.primaryschool}
                handleChange={handleChanges}
              />
            </div>

            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Health Facilities
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Primary Hospital"
                name="primary"
                type="text"
                placeholder="Number of Primary Hospital"
                icon={LocalHospital}
                value={updateData.primary}
                handleChange={handleChanges}

              />
              <FormField
                label="General Hospital"
                name="general"
                type="text"
                placeholder="Number of General Hospital"
                icon={LocalHospital}
                value={updateData.general}
                handleChange={handleChanges}
              />
              <FormField
                label="Referral Hospital"
                name="referral"
                type="text"
                placeholder="Number of Referral Hospital"
                icon={LocalHospital}
                value={updateData.referral}
                handleChange={handleChanges}
              />
              <FormField
              label="Health Center"
              name="healthcenter"
              type="text"
              placeholder="Number of Health Center"
              icon={LocalHospital}
              value={updateData.healthcenter}
              handleChange={handleChanges}
            />
              <FormField
                label="Clinic/Health Post"
                name="clinic"
                type="text"
                placeholder="Number of Clinic/Health Post"
                icon={LocalHospital}
                value={updateData.clinic}
                handleChange={handleChanges}
              />
                <FormField
                label="Vet Clinic"
                name="vetclinic"
                type="text"
                placeholder="Number of Vet Clinic"
                icon={LocalHospital}
                value={updateData.vetclinic}
                handleChange={handleChanges}
              />
            </div>
            
          </div>

  );
};
