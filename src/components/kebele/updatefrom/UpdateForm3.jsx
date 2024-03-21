
import { FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { kebeledata } from "../UpdateKebele";
import { useState } from "react";


export const UpdateForm3 = ({handleChange}) => {
  const [updateData, setUpdateData] = useState(kebeledata[0]);
  
  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUpdateData({...updateData, [name]: value});
    handleChange(event);
  }
  
  return (
            <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Livelihood
            </h6>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            Crop production
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="malecropproduction"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.malecropproduction}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femalecropproduction"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femalecropproduction}    
                handleChange={handleChanges}      
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            Livestock production
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="malelivestockproduction"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
               value={updateData.malelivestockproduction}
               handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femalelivestockproduction"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
               value={updateData.femalelivestockproduction}
               handleChange={handleChanges}
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            Dairy + poultry +shoats
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="maledairyproduction"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.maledairyproduction}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femaledairyproduction"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femaledairyproduction}
                handleChange={handleChanges}
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            Beekeeping
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="malebeekeeping"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.malebeekeeping}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femalebeekeeping"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femalebeekeeping}
                handleChange={handleChanges}
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            Livestock and Crop production
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="malelivestockandcropproduction"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.malelivestockandcropproduction}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femalelivestockandcropproduction"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femalelivestockandcropproduction}
                handleChange={handleChanges}
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            Non-farm activites
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="malenonfarmactivites"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.malenonfarmactivites}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femalenonfarmactivites"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femalenonfarmactivites}
                handleChange={handleChanges}
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            Forest seeding
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="maleforestseeding"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.maleforestseeding}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femaleforestseeding"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femaleforestseeding}
                handleChange={handleChanges}
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            petty trade
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="malepettytrade"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.malepettytrade}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femalepettytrade"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femalepettytrade}
                handleChange={handleChanges}
              />
            </div>
            <h6 className="text-blueGray-400 text-xs mt-3 mb-4 font-semibold uppercase">
            other
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Male"
                name="maleothers"
                type="text"
                placeholder="Total Number of Male headed house holds"
                icon={FamilyRestroom}
                value={updateData.maleothers}
                handleChange={handleChanges}
              />
              <FormField
                label="Female"
                name="femaleothers"
                type="text"
                placeholder="Total Number of Female headed house holds"
                icon={FamilyRestroom}
                value={updateData.femaleothers}
                handleChange={handleChanges}
              />
            </div>
    </div>
  );
};
