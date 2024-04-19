import React, { useState } from "react";
import { RadioButtonGroup } from "../AddSite";
import { sitedata } from "../UpdateSite";

export const UpdateForm3 = ({ handleChange }) => {
  const [updateData, setUpdateData] = useState(sitedata[0]);
  const handleRadioChange = (name, value) => {
    const indexMap = {
      cropproduction: 0,
      livestockproduction: 1,
      dairyproduction: 2,
      beekeeping: 3,
      livestockandcropproduction: 4,
      nonfarmactivities: 5,
      forestseeding: 6,
      pettytrade: 7,
      smallruminant: 8,
      poultry: 9,
      foragegrowing: 10,
      other: 11,
    };

    setUpdateData((prevState) => ({
      ...prevState,
      livestockSupport: prevState.livestockSupport.map((item, index) =>
        index === indexMap[name] ? { ...item, [name]: value } : item
      ),
    }));
    handleChange(value);
  };

  return (
    <div>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Livelihood site can support
      </h6>

      <div class="flex flex-wrap lg:w-2/3">
        <RadioButtonGroup
          name="cropproduction"
          label="Crop production"
          value={updateData.livestockSupport[0].cropproduction}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("cropproduction", value)}
        />
        <RadioButtonGroup
          name="livestockproduction"
          label="Livestock production"
          value={updateData.livestockSupport[1].livestockproduction}
          options={["Yes", "No"]}
          handleChange={(value) =>
            handleRadioChange("livestockproduction", value)
          }
        />
        <RadioButtonGroup
          name="dairyproduction"
          label="Dairy + poultry +shoats"
          value={updateData.livestockSupport[2].dairyproduction}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("dairyproduction", value)}
        />
        <RadioButtonGroup
          name="beekeeping"
          label="Beekeeping"
          value={updateData.livestockSupport[3].beekeeping}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("beekeeping", value)}
        />
        <RadioButtonGroup
          name="livestockandcropproduction"
          label="Livestock and Crop production"
          value={updateData.livestockSupport[4].livestockandcropproduction}
          options={["Yes", "No"]}
          handleChange={(value) =>
            handleRadioChange("livestockandcropproduction", value)
          }
        />
        <RadioButtonGroup
          name="nonfarmactivities"
          label="Non-farm activites"
          value={updateData.livestockSupport[5].nonfarmactivities}
          options={["Yes", "No"]}
          handleChange={(value) =>
            handleRadioChange("nonfarmactivities", value)
          }
        />
        <RadioButtonGroup
          name="forestseeding"
          label="Forest seeding"
          value={updateData.livestockSupport[6].forestseeding}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("forestseeding", value)}
        />
        <RadioButtonGroup
          name="pettytrade"
          label="petty trade"
          value={updateData.livestockSupport[7].pettytrade}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("pettytrade", value)}
        />
        <RadioButtonGroup
          name="smallruminant"
          label="Small ruminant"
          value={updateData.livestockSupport[8].smallruminant}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("smallruminant", value)}
        />
        <RadioButtonGroup
          name="poultry"
          label="Poultry"
          value={updateData.livestockSupport[9].poultry}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("poultry", value)}
        />
        <RadioButtonGroup
          name="foragegrowing"
          label="Forage/fodder growing"
          value={updateData.livestockSupport[10].foragegrowing}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("foragegrowing", value)}
        />
        <RadioButtonGroup
          name="other2"
          label="Other"
          value={updateData.livestockSupport[11].other}
          options={["Yes", "No"]}
          handleChange={(value) => handleRadioChange("other2", value)}
        />
      </div>
    </div>
  );
};
