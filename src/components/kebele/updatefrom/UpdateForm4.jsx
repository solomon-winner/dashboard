
import { AddCircleOutline, Delete, FamilyRestroom, Grass, Pets } from "@mui/icons-material";
import React ,{ useState } from "react";
import { FormField } from "../../wereda/AddWereda";
import { kebeledata } from "../UpdateKebele";


export const UpdateForm4 = ({handleChange}) => {
    const [updateData, setUpdateData] = useState(kebeledata[0]);
    const [additionalFields, setAdditionalFields] = useState(
      updateData.Forage.map((type, index) => ({ id: index, type: type.type, area: type.area }))
  );
  const addField = () => {
      const highestId = additionalFields.reduce((highest, field) => Math.max(highest, field.id),   0);
      setAdditionalFields([...additionalFields, { id: highestId +   1, type: "", area: "" }]);
  };
  const removeField = (id) => {
      setAdditionalFields(additionalFields.filter(field => field.id !== id));
  };
  const handleChanges = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("type") || name.startsWith("area")) {
        const [, index] = name.split("-");
        setAdditionalFields(additionalFields.map(field =>
            field.id === parseInt(index) ? { ...field, [name.split("-")[0]]: value } : field
        ));
    } else {

        setUpdateData({ ...updateData, [name]: value });
    }
    handleChange(event);
};
  return (
          <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
              Livestock
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="Oxen"
                name="oxen"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.oxen}
                handleChange={handleChanges}
              />
              <FormField
                label="Cows / Heifer"
                name="cows"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.cows}
                handleChange={handleChanges}
              />
              <FormField
                label="Goat"
                name="goat"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.goat}
                handleChange={handleChanges}
              />
              <FormField
                label="Sheep"
                name="sheep"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.sheep}
                handleChange={handleChanges}
              />
              <FormField
                label="Camel"
                name="camel"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.camel}
                handleChange={handleChanges}
              />
              <FormField
                label="Donkey"
                name="donkey"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.donkey}
                handleChange={handleChanges}
              />
              <FormField
                label="Horse"
                name="horse"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.horse}
                handleChange={handleChanges}
              />
              <FormField
                label="Poultry"
                name="poultry"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.poultry}
                handleChange={handleChanges}
              />
              <FormField
                label="Other"
                name="other"
                type="text"
                placeholder="Total Number of Livestock"
                icon={Pets}
                value={updateData.other}
                handleChange={handleChanges}
              />
            </div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Forage
            </h6>
            <div class="flex flex-wrap">
                {additionalFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <FormField
                    label="Type"
                    name={`type-${field.id}`}
                    type="dropdown"
                    placeholder="Type of Forage"
                    icon={Grass}
                    value={field.type}
                    list="foragetype"
                    options={["Grass, Elephant Grass", "Suspania suspan", "Truelucern", "Sespanya", "Yekintebameno", "Cow Pea"]}
                    handleChange={handleChange}
                    onChange={handleChanges}
                  />
                  <FormField
                    label="Area"
                    name={`area-${field.id}`}
                    type="text"
                    placeholder="Area"
                    value={field.area}
                    handleChange={handleChanges}
                  />
                  <Delete onClick={() => removeField(field.id)} className="lg:mt-8"/>
                </React.Fragment>
              ))}
              <AddCircleOutline onClick={addField} className="lg:mt-8" />
            </div>
          
    </div>
  );
};
