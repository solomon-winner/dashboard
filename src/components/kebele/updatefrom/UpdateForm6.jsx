import React, { useState } from "react";

import { AddCircleOutline, Delete, Landslide, Medication } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { kebeledata } from "../UpdateKebele";


export const UpdateForm6 = ({handleChange}) => {
  const [updateData, setUpdateData] = useState(kebeledata[0]);
  const [additionalFields, setAdditionalFields] = useState(
    updateData.Cause.map((type, index) => ({ id: index, type: type.deforestation }))
);
const addField = () => {
    const highestId = additionalFields.reduce((highest, field) => Math.max(highest, field.id),   0);
    setAdditionalFields([...additionalFields, { id: highestId +   1, type: "" }]);
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
  handleChange(event)
};
  return (
            <div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Nursery
            </h6>
            <div class="flex flex-wrap">
              <FormField
                label="local_gov_amount"
                name="localamount"
                type="text"
                placeholder="Number of Nursery"
                icon={Medication}
                value={updateData.localamount}
                handleChange={handleChanges}
              />
              <FormField
                label="local_gov_cap"
                name="localcap"
                type="text"
                placeholder="Production Capacity"
                icon={Medication}
                value={updateData.localcap}
                handleChange={handleChanges}
              />
              <FormField
                label="community_amount"
                name="communityamt"
                type="text"
                placeholder="Number of Nursery"
                icon={Medication}
                value={updateData.communityamt}
                handleChange={handleChanges}
              />
              <FormField
                label="community_cap"
                name="communitycap"
                type="text"
                placeholder="Production Capacity"
                icon={Medication}
                value={updateData.communitycap}
                handleChange={handleChanges}
              />
              <FormField
                label="individual_amt"
                name="individualamt"
                type="text"
                placeholder="Number of Nursery"
                icon={Medication}
                value={updateData.individualamt}
                handleChange={handleChanges}
              />
              <FormField
                label="individual_cap"
                name="individualcap"
                type="text"
                placeholder="Production Capacity"
                icon={Medication}
                value={updateData.individualcap}
                handleChange={handleChanges}
              />
            </div>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Cause of deforestation
            </h6>
            <div class="flex flex-wrap lg:w-2/3">
              {additionalFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <FormField
                    label="Cause of deforestation"
                    name={`deforestation-${field.id}`}
                    type="dropdown"
                    placeholder="Cause of deforestation"
                    icon={Landslide}
                    value={field.type}
                    list="deforestation"
                    options={["Deforestation", "Drought", "Flood", "Fire", "Other"]}
                    handleChange={handleChange}
                    onChange={handleChanges}
                  />
                  <Delete onClick={() => removeField(field.id)} className="lg:mt-8"/>
                </React.Fragment>
              ))}
              <AddCircleOutline onClick={addField} className="lg:mt-8" />
            </div>

    </div>
  );
};
