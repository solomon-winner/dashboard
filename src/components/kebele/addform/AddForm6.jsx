import React, { useState } from "react";
import { AddCircleOutline, Delete, Grass, Landslide, Medication } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";

const option = [
  "Fuel wood", "Farm land expansion", "Free grazing"
]
export const AddForm6 = ({handleChange,formData,setFormData}) => {
  const {nursery,causeofdeforestation,isLoadingCauseofdeforestation,isLoadingNursery}= useSelector((state)=>state.resource)
  const [additionalFields, setAdditionalFields] = useState([{ id:  0, nurserytype: "",numberofnursery:"" }]);
  const [additionalFields2, setAdditionalFields2] = useState([
    { id: 0, causeofdeforestation: "" },
  ]);
  const addField = () => {
    const highestId = additionalFields.reduce((highest, field) => Math.max(highest, field.id),  0);
    setAdditionalFields([...additionalFields, { id: highestId +  1, nurserytype: "",numberofnursery:"" }]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
  };
  const addField2 = () => {
    const highestId = additionalFields2.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, causeofdeforestation: "" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
  };
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
            Nursery
            </h6>
            <div>
            {additionalFields.map((field, index) => (
              <React.Fragment key={field.id}>
                <div className="flex flex-wrap">
                <FormField
                  label="Type"
                  name={`nurserytype${index +  1}`}
                  type="dropdown"
                  placeholder={`Type of Nursery`}
                  icon={Medication}
                  options={
                    isLoadingNursery
                      ? [
                          {
                            value: "loading",
                            label: (
                              <div className="flex justify-center">
                                <Loadings />
                              </div>
                            ),
                          },
                        ]
                      : nursery.map((nurserytype, index) => ({
                          label: nurserytype.name,
                          value: nurserytype.id,
                        }))
                  }
                  handleChange={handleChanges}
                  value={
                    nursery.find(
                      (nurserytype) => nurserytype.id === formData[`nurserytype${index + 1}`]
                    )?.name || ""
                  }
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `nurserytype${index + 1}`,
                        value: option.target.value.value,
                      },
                    });
                  }}
                /> 
                </div>
                <div className="flex flex-wrap">
                <FormField
                    label="Amount"
                    name={`amount${index +  1}`}
                    type="number"
                    placeholder="Number of Nursery"
                    value={formData[`amount${index + 1}`] || ""}
                    handleChange={handleChanges}
                  />
                  <FormField
                    label="Capacity"
                    name={`capacity${index +  1}`}
                    type="number"
                    placeholder="Number of Nursery"
                    value={formData[`capacity${index + 1}`] || ""}
                    handleChange={handleChanges}
                  />
                  </div>
               <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
              </React.Fragment>
            ))}
             <AddCircleOutline onClick={addField} className="lg:mt-8" />
            </div>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
            Cause of deforestation
            </h6>
            <div className="flex flex-wrap lg:w-full">
            {additionalFields2.map((field, index) => (
              <React.Fragment key={field.id}>
                <FormField
                  label="Type"
                  name={`causeofdeforestation${index +  1}`}
                  type="dropdown"
                  placeholder="Cause of deforestation"
                  icon={Medication}
                  options={
                    isLoadingNursery
                      ? [
                          {
                            value: "loading",
                            label: (
                              <div className="flex justify-center">
                                <Loadings />
                              </div>
                            ),
                          },
                        ]
                      : causeofdeforestation.map((causeofdeforestation, index) => ({
                          label: causeofdeforestation.name,
                          value: causeofdeforestation.id,
                        }))
                  }
                  handleChange={handleChanges}
                  value={
                    causeofdeforestation.find(
                      (causeofdeforestation) => causeofdeforestation.id === formData[`causeofdeforestation${index + 1}`]
                    )?.name || ""
                  }
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `causeofdeforestation${index + 1}`,
                        value: option.target.value.value,
                      },
                    });
                  }}
                /> 
               <Delete onClick={() => removeField2(field.id)} className="lg:mt-8" />
              </React.Fragment>
            ))}
             <AddCircleOutline onClick={addField2} className="lg:mt-8" />
            </div>

    </div>
  );
};
