import React from "react";

import { LocalHospital, School } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";

export const AddForm3 = () => {
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
              />
              <FormField
                label="TVET"
                name="tvet"
                type="text"
                placeholder="Number of TVET"
                icon={School}
              />
              <FormField
                label="High School"
                name="highschool"
                type="text"
                placeholder="Number of High School"
                icon={School}
              />
              <FormField
                label="Secondary School"
                name="secoundschool"
                type="text"
                placeholder="Number of Secondary School"
                icon={School}
              />
              <FormField
                label="High School"
                name="highschool"
                type="text"
                placeholder="Number of High School"
                icon={School}
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
              />
              <FormField
                label="General Hospital"
                name="general"
                type="text"
                placeholder="Number of General Hospital"
                icon={LocalHospital}
              />
              <FormField
                label="Referral Hospital"
                name="referral"
                type="text"
                placeholder="Number of Referral Hospital"
                icon={LocalHospital}
              />
              <FormField
                label="Clinic/Health Post"
                name="clinic"
                type="text"
                placeholder="Number of Clinic/Health Post"
                icon={LocalHospital}
              />
                <FormField
                label="Vet Clinic"
                name="vetclinic"
                type="text"
                placeholder="Number of Vet Clinic"
                icon={LocalHospital}
              />
            </div>
    </div>
  );
};
