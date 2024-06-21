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
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";

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
          min="0"
        />
        <FormField
          label="Female"
          name="populationfemale"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.populationfemale}
          handleChange={handleChanges}
          min="0"
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
          min="0"
        />
        <FormField
          label="Female"
          name="householdfemale2"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.householdfemale2}
          handleChange={handleChanges}
          min="0"
        />
      </div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        LandUse
      </h6>
      <FieldComponent
        initialValues={formData}
        placeholder={["Select Land Type", "Enter Area"]}
        type={["dropdown", "number"]}
        label={["type", "area"]}
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
        onValueChange={(id, name, value) => {
          const values =
            name === "type" && typeof value === "object" ? value.value : value;
          const keyToUpdate = name === "type" ? `type${id}` : `area${id}`;
          setFormData((prevState) => ({
            ...prevState,
            [keyToUpdate]: values,
          }));
        }}
        onremove={(id) => {
          const updatedFormData = { ...formData };
          delete updatedFormData[`type${id}`];
          delete updatedFormData[`area${id}`];
          let newFormData = {};
          let typeIndex = 1;
          let areaIndex = 1;

          for (let key in updatedFormData) {
            if (key.startsWith("type")) {
              newFormData[`type${typeIndex}`] = updatedFormData[key];
              typeIndex++;
            } else if (key.startsWith("area")) {
              newFormData[`area${areaIndex}`] = updatedFormData[key];
              areaIndex++;
            } else {
              newFormData[key] = updatedFormData[key];
            }
          }

          setFormData(newFormData);
        }}
      />
    </div>
  );
};
