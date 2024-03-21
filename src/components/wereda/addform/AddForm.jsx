import React, { useEffect, useState } from "react";
import { Apartment, FamilyRestroom, Landscape } from "@mui/icons-material";
import { FormField } from "../AddWereda";

import {
  useGetRegionQuery,
  useGetWeredaByRegionQuery,
} from "../../../redux/region/RegionApiSlice";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
export const weredas = {
  "Addis Ababa": [""],
  Afar: [""],
  Amhara: [
    "Dera",
    "Habru",
    "Kalu",
    "Kewot",
    "Libo Kemkem",
    "Tarmaber",
    "Worebabo",
    "Gubalafto",
  ],
  "Benishangul-Gumuz": [""],
  "Dire Dawa": [""],
  Gambela: [""],
  Harari: [""],
  Oromia: ["Arsi Robe"],
  Sidama: [""],
  Somali: [""],
  "Southern Nations, Nationalities, and Peoples' Region (SNNPR)": [
    "Semen Bench",
    "Zaba Gazo",
  ],
  Tigray: [
    "Deguatembien",
    "Adwa",
    "Enderta",
    "Ganta Afshum",
    "Ahferom",
    "Alaje",
  ],
};
export const AddForm = ({ handleChange, formData, setFormData }) => {

  const [selectedRegion, setSelectedRegion] = useState("");
  const [weredaId, setWeredaID] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);

  const {
    data: getweredaByRegion,
    isSuccess: weredaSuccess,
    isFetching,
  } = useGetWeredaByRegionQuery(selectedRegion, { skip: !selectedRegion });
  const weredaOptions = isFetching
    ? [
        {
          value: "loading",
          label: (
            <div className="flex justify-center">
              <Loading />
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
        <div className="w-full lg:w-2/5 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-500 text-xs font-bold mb-2"
              htmlFor="region"
            >
              Region
            </label>
            <Select
              name="region_id"
              options={
                isLoadingRegions
                  ? [
                      {
                        value: "loading",
                        label: (
                          <div className="flex justify-center">
                            <Loading />
                          </div>
                        ),
                      },
                    ]
                  : regions.map((region) => ({
                      value: region.id,
                      label: region.region_name,
                    }))
              }
              value={
                formData && formData.selectedRegionName
                  ? {
                      value: selectedRegion,
                      label: formData.selectedRegionName,
                    }
                  : null
              }
              onChange={(option) => {
                setSelectedRegion(option.value);
                handleChanges({
                  target: {
                    name: "region_id",
                    value: option.value,
                  },
                });
                setFormData({
                  ...formData,
                  selectedRegionName: option.label, 
                  selectedWeredaName: "",
                });
              }}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-500 text-xs font-bold mb-2"
              htmlFor="region"
            >
              Wereda
            </label>
            <Select
              name="woreda_id"
              options={weredaOptions}
              value={
                formData && formData.selectedWeredaName
                  ? {
                      label: formData.selectedWeredaName,
                    }
                  : null
              }
              onChange={(option) => {
                setWeredaID(option.label);
                handleChange({
                  target: {
                    name: "woreda_id",
                    value: option.value,
                  },
                });
                setFormData({
                  ...formData,
                  selectedWeredaName: option.label, // Use option.label directly here
                });
              }}
            />
          </div>
        </div>
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
