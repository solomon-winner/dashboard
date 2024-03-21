import React from "react";

import { RadioButtonGroup } from "../AddSite";

export const AddForm3 = ({handleChange}) => {
  return (
          <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Livelihood site can support
            </h6>
           
            <div class="flex flex-wrap lg:w-2/3">
              <RadioButtonGroup
                name="croptype"
                label="Crop production"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="livestocktype"
                label="Livestock production"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="dalytype"
                label="Dairy + poultry +shoats"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="beekeepingtype"
                label="Beekeeping"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="livecroptype"
                label="Livestock and Crop production"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="nonfarmtype"
                label="Non-farm activites"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="foresttype2"
                label="Forest seeding"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="pettytype"
                label="petty trade"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="smalltype"
                label="Small ruminant"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="poultrytype"
                label="Poultry"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="foragetype"
                label="Forage/fodder growing"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
              <RadioButtonGroup
                name="othertype2"
                label="Other"
                options={["Yes", "No"]}
                handleChange={handleChange}
              />
            </div>
    </div>
  );
};
