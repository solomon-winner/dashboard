import React, { useState } from "react";
import { RadioButtonGroup } from "../../site/AddSite";
import { kebeledata } from "../UpdateKebele";


export const UpdateForm7 = ({ handleChange }) => {
  const [updateData, setUpdateData] = useState(kebeledata[0]);
  const handleRadioChange = (name, value) => {
    const indexMap = {
      electricity: 0,
      firewood: 1,
      animaldung: 2,
      cropresidue: 3,
      charcoal: 4,
      biogas: 5,
      solar: 6
    };
  
    setUpdateData(prevState => ({
      ...prevState,
      sourceofenergy: prevState.sourceofenergy.map((item, index) =>
        index === indexMap[name] ? { ...item, [name]: value } : item
      )
    }));
    handleChange(value)
  };
  
  return (
          <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Sources of Energy
            </h6>
            <div class="flex flex-wrap lg:w-2/3">
              <RadioButtonGroup
                name="type"
                label="Electricity"
                value={updateData.sourceofenergy[0].electricity}
                options={["high", "medium", "low"]}
                handleChange={(value) => handleRadioChange("electricity", value)}
              />
              <RadioButtonGroup
                name="type2"
                label="Firewood"
                value={updateData.sourceofenergy[1].firewood}
                options={["high", "medium", "low"]}
                handleChange={(value) => handleRadioChange("firewood", value)}
              />
              <RadioButtonGroup
                name="type3"
                label="Animal dung"
                value={updateData.sourceofenergy[2].animaldung}
                options={["high", "medium", "low"]}
                handleChange={(value) => handleRadioChange("animaldung", value)}
              />
              <RadioButtonGroup
                name="type4"
                label="Crop residue"
                value={updateData.sourceofenergy[3].cropresidue}
                options={["high", "medium", "low"]}
                handleChange={(value) => handleRadioChange("cropresidue", value)}
              />
              <RadioButtonGroup
                name="type5"
                label="Charcoal"
                value={updateData.sourceofenergy[4].charcoal}
                options={["high", "medium", "low"]}
                handleChange={(value) => handleRadioChange("charcoal", value)}
              />
              <RadioButtonGroup
                name="type6"
                label="Biogas/Crosin"
                value={updateData.sourceofenergy[5].biogas}
                options={["high", "medium", "low"]}
                handleChange={(value) => handleRadioChange("biogas", value)}
              />
              <RadioButtonGroup
                name="type7"
                label="Solar"
                value={updateData.sourceofenergy[6].solar}
                options={["high", "medium", "low"]}
                handleChange={(value) => handleRadioChange("solar", value)}
              />
            </div>

    </div>
  );
};