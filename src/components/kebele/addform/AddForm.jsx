import React, { useState } from "react";
import { AddCircleOutline, Delete, FamilyRestroom } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import { useGetWeredaByRegionQuery } from "../../../redux/region/RegionApiSlice";
import { useGetKebeleByWeredaQuery } from "../../../redux/kebele/KebeleApiSlice";
import Loadings from "../../Resource/Loading/Loadings";
import KebeleSelect from "../../Resource/Utility/SelecteDropDown/KebeleSelect";
import WeredaSelect from "../../Resource/Utility/SelecteDropDown/WeredaSelect";
import RegionSelect from "../../Resource/Utility/SelecteDropDown/RegionSelect";

export const AddForm = ({ handleChange, formData, setFormData }) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const [selectedKebele, setSelectedKebele] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const { landuse, isLoadingLanduse } = useSelector((state) => state.resource);
  const { data: getweredaByRegion, isFetching } = useGetWeredaByRegionQuery(
    { id: selectedRegion, with_sites: true },
    { skip: !selectedRegion }
  );
  const { data: getkebeleByWereda, isFetching: kebeleFetching } =
    useGetKebeleByWeredaQuery(
      { id: selectedWereda, with_sites: true },
      { skip: !selectedWereda }
    );
  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, type: "", area: "" },
  ]);

  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, type: "", area: "" },
    ]);
  };
  const removeField = (id) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
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
      <div className="flex flex-wrap">
        <RegionSelect
          regions={regions}
          isLoadingRegions={isLoadingRegions}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
        <WeredaSelect
          getweredaByRegion={getweredaByRegion}
          isFetching={isFetching}
          selectedWereda={selectedWereda}
          setSelectedWereda={setSelectedWereda}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
        <KebeleSelect
          getkebeleByWereda={getkebeleByWereda}
          kebeleFetching={kebeleFetching}
          selectedKebele={selectedKebele}
          setSelectedKebele={setSelectedKebele}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Population
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="populationmale"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.populationmale}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="populationfemale"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.populationfemale}
          handleChange={handleChanges}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Household
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="householdmale2"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.householdmale2}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="householdfemale2"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.householdfemale2}
          handleChange={handleChanges}
        />
      </div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <div className="flex flex-wrap">
        {additionalFields.map((field, index) => (
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
                landuse.find(
                  (landuse) => landuse.id === formData[`type${index + 1}`]
                )?.name || ""
              }
              handleChange={handleChanges}
              onChange={(option) => {
                handleChanges({
                  target: {
                    name: `type${index + 1}`,
                    value: option.target.value.value,
                  },
                });
              }}
            />
            <FormField
              label="Area"
              name={`area${index + 1}`}
              type="number"
              placeholder="Area"
              value={formData[`area${index + 1}`] || ""}
              handleChange={handleChanges}
              step={0.01}
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>
    </div>
  );
};
