import React, { useState } from "react";
import { Apartment, FamilyRestroom, Landscape } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";

import { useGetWeredaByRegionQuery } from "../../../redux/region/RegionApiSlice";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import RegionSelect from "../../Resource/Utility/SelecteDropDown/RegionSelect";
import WeredaSelect from "../../Resource/Utility/SelecteDropDown/WeredaSelect";

export const AddForm = ({ handleChange, formData, setFormData }) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [weredaId, setWeredaID] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);

  const { data: getweredaByRegion, isFetching } = useGetWeredaByRegionQuery(
    { id: selectedRegion, with_sites: true },
    { skip: !selectedRegion }
  );
  const weredaOptions = isFetching
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
    : getweredaByRegion?.data?.data?.map((wereda) => ({
        value: wereda.id,
        label: wereda.woreda_name,
      }));
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
          selectedWereda={weredaId}
          setSelectedWereda={setWeredaID}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <hr className="mt-3 border-b-1 border-blueGray-300"></hr>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Kebele
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Urban"
          name="urban_kebeles"
          type="number"
          placeholder="Urban"
          icon={Apartment}
          value={formData.urban_kebeles}
          handleChange={handleChanges}
        />
        <FormField
          label="Rural"
          name="rural_kebeles"
          type="number"
          placeholder="Rural"
          icon={Landscape}
          value={formData.rural_kebeles}
          handleChange={handleChanges}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Population
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="male_hh"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.male_hh}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female_hh"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.female_hh}
          handleChange={handleChanges}
        />
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Household
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="male_population"
          type="number"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.male_population}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="female_population"
          type="number"
          placeholder="Total Number of Female"
          icon={FamilyRestroom}
          value={formData.female_population}
          handleChange={handleChanges}
        />
      </div>
    </div>
  );
};
