import React, { useEffect, useState } from "react";
import {
  AddCircleOutline,
  AspectRatio,
  Delete,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../AddWereda";
import { weredadata } from "../UpdateWereda";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";

export const UpdateForm2 = ({ handleChange, formData, setFormData }) => {
  const { road, landuse, isLoadingLanduse, isLoadingRoad } = useSelector(
    (state) => state.resource
  );
    const [additionalFields, setAdditionalFields] = useState([]);
    const [additionalFields2, setAdditionalFields2] = useState([]);
useEffect(() => {
  const initialLandUseFields = Array.isArray(formData.resource)
  ? formData.resource
      .filter((land) => land.type === "LAND")
      .map((land, index) => ({
        id: land.id,
        resourceid: land.uniqeId,
        type: land.name,
        value: land.value,
      }))
  : [];

const initialRoadFields = Array.isArray(formData.resource)
  ? formData.resource
      .filter((road) => road.type === "ROAD")
      .map((road, index) => ({
        id: road.id,
        resourceid: road.uniqeId,
        type: road.name,
        value: road.value,
      }))
  : [];

  setAdditionalFields(initialLandUseFields);
  setAdditionalFields2(initialRoadFields);
},[formData])
  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    const highestResourceId = formData.resource.reduce(
      (highest, item) => Math.max(highest, item.uniqeId),
      0
   );
  
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, resourceid: highestResourceId + 1,type: "", value: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
  };
  const addField2 = () => {
    const highestId = additionalFields2.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    const highestResourceId = formData.resource.reduce(
      (highest, item) => Math.max(highest, item.uniqeId),
      0
   );
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, resourceid: highestResourceId + 1,type: "", value: "" },
    ]);
  };
  const removeField2 = (id) => {
    setAdditionalFields2(additionalFields2.filter((field) => field.id !== id));
  };
  const handleChanges = (e) => {
    const { name, value, uniqeid } = e.target;
    console.log(name, value, uniqeid);
    const updatedFormData = { ...formData };
    let itemIndex = updatedFormData.resource.findIndex(item => item.uniqeId === uniqeid);
    if (itemIndex === -1) {
      if (name.includes("type") || name.includes("area")) {
      updatedFormData.resource.push({
        uniqeId: uniqeid,
        id: name.includes("type") ? value : "",
        value: name.includes("area") ? value : "",
        name:name.includes("type") ? landuse.find((landuse) => landuse.id === value)?.name || "":"",
        type: name.includes("type") ? "LAND" : "",
      })
    } else if (name.includes("roadtyp") || name.includes("distance")) {
      updatedFormData.resource.push({
        uniqeId: uniqeid,
        id: name.includes("roadtyp") ? value : "",
        value: name.includes("distance") ? value : "",
        name:name.includes("roadtyp") ? road.find((road) => road.id === value)?.name || "":"",
        type: name.includes("roadtyp") ? "ROAD" : "",
      })
    }}
    else {
       if (name.includes("type")) {
         updatedFormData.resource[itemIndex].id = value;
         updatedFormData.resource[itemIndex].type = "LAND";
       } else if (name.includes("area")) {
         updatedFormData.resource[itemIndex].value = value;
       }
       if(name.includes("roadtyp")) {
         updatedFormData.resource[itemIndex].id = value;
         updatedFormData.resource[itemIndex].type = "ROAD";
       }
       else if (name.includes("distance")) {
         updatedFormData.resource[itemIndex].value = value;
       }
    }
    setFormData(updatedFormData);
    console.log(updatedFormData);
   
    handleChange(e);
   };
  return (
    <div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <div className="flex flex-wrap">
        {additionalFields.map(
          (field, index) => (
            (
              <React.Fragment key={field.id}>
                <FormField
                  label="Type"
                  name={`type${index + 1}`}
                  type="dropdown"
                  placeholder="Select Land Type"
                  options={
                    isLoadingLanduse
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
                      : landuse.map((landuse, index) => ({
                          label: landuse.name,
                          value: landuse.id,
                        }))
                  }
                  value={
                    landuse.find((landuse) => landuse.id === field.id)?.name ||
                    ""
                  }
                  handleChange={(e) => handleChanges(e, { uniqeid: field.resourceid })}
                  onChange={(option) => {
                    handleChanges({
                      target: {
                        name: `type${index + 1}`,
                        value: option.target.value.value,
                        uniqeid: field.resourceid,
                      },
                    });
                  }}
                />
                <FormField
                  label="Area"
                  name={`area${index + 1}`}
                  type="number"
                  placeholder="Area"
                  value={field.value || ""}
                  handleChange={(option) => {
                    const numericValue = Number(option.target.value);
                    handleChanges({
                      target: {
                        name: `area${index + 1}`,
                        value: numericValue,
                        uniqeid: field.resourceid,
                      },
                    });
                  }}
                />
                <Delete
                  onClick={() => removeField(field.id)}
                  className="lg:mt-8"
                />
              </React.Fragment>
            )
          )
        )}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Road
      </h6>
      <div className="flex flex-wrap">
        {additionalFields2.map((field, index) => (
          <React.Fragment key={field.id}>
            <FormField
              label="Type"
              name={`roadtyp${index + 1}`}
              type="dropdown"
              placeholder="Select Road Type"
              options={
                isLoadingRoad
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
                  : road.map((landuse, index) => ({
                      label: landuse.name,
                      value: landuse.id,
                    }))
              }
              handleChange={handleChanges}
              value={
                road.find(
                  (road) => road.id === field.id
                )?.name || ""
              }
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `roadtyp${index + 1}`,
                    value: option.target.value.value,
                    uniqeid: field.resourceid,
                  },
                });
              }}
            />
            <FormField
              label="Distance"
              name={`distance${index + 1}`}
              type="number"
              placeholder="Distance in Km"
              icon={AspectRatio}
              value={field.value || ""}
              handleChange={(option) => {
                const numericValue = Number(option.target.value);
                handleChanges({
                  target: {
                    name: `area${index + 1}`,
                    value: numericValue,
                    uniqeid: field.resourceid,
                  },
                });
              }}
            />
            <Delete
              onClick={() => removeField2(field.id)}
              className="lg:mt-8"
            />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField2} className="lg:mt-8" />
      </div>
    </div>
  );
};
