import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";

import {
  AddCircleOutline,
  Delete,
  FamilyRestroom,
  Landscape,
} from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { regions } from "../../region/addform/AddForm";
import { weredas } from "../../wereda/addform/AddForm";
import Select from "react-select";
import { LandUse } from "../../wereda/addform/AddForm2";
import { useSelector } from "react-redux";

import { useGetWeredaByRegionQuery } from "../../../redux/region/RegionApiSlice";
import { useGetKebeleByWeredaQuery } from "../../../redux/kebele/KebeleApiSlice";
import Loadings from "../../Resource/Loading/Loadings";

export const AddForm = ({handleChange, formData, setFormData}) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const [selectedKebele, setSelectedKebele] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const { landuse, isLoadingLanduse} = useSelector( (state) => state.resource );
  const {
    data: getweredaByRegion,
    isSuccess: weredaSuccess,
    isFetching,
  } = useGetWeredaByRegionQuery(selectedRegion, { skip: !selectedRegion });
  const {
    data: getkebeleByWereda,
    isSuccess: kebeleSuccess,
    isFetching: kebeleFetching,
  } = useGetKebeleByWeredaQuery(selectedWereda, { skip: !selectedWereda });
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
                            <Loadings />
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
                handleChange({
                  target: {
                    name: "region_id",
                    value: option.value,
                  },
                });
                setFormData({
                  ...formData,
                  selectedRegionName: option.label,
                  selectedWeredaName: "",
                  selectedKebele: "",
                  selectedSite: "",
                });
              }}
            />
            <ErrorMessage
              name="region_id"
              component="div"
              className="text-red-500 flex items-start"
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
                      value: selectedWereda,
                      label: formData.selectedWeredaName,
                    }
                  : null
              }
              onChange={(option) => {
                setSelectedWereda(option.value);
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
            <ErrorMessage
              name="woreda_id"
              component="div"
              className="text-red-500 flex items-start"
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-500 text-xs font-bold mb-2"
              htmlFor="region"
            >
              Kebele
            </label>
            <Select
              name="kebele_id"
              options={
                kebeleFetching
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
                  : getkebeleByWereda?.data?.data?.map((kebele) => ({
                      value: kebele.id,
                      label: kebele.kebele_name,
                    }))
              }
              value={
                formData && formData.selectedKebele
                  ? {
                      value: selectedKebele,
                      label: formData.selectedKebele,
                    }
                  : null
              }
              onChange={(option) => {
                setSelectedKebele(option.value);
                handleChange({
                  target: {
                    name: "kebele_id",
                    value: option.value,
                  },
                });
                setFormData({
                  ...formData,
                  selectedKebele: option.label, // Use option.label directly here
                });
              }}
            />
            <ErrorMessage
              name="kebele_id"
              component="div"
              className="text-red-500 flex items-start"
            />
          </div>
        </div>
      </div>

      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Population
      </h6>
      <div className="flex flex-wrap">
        <FormField
          label="Male"
          name="populationmale"
          type="text"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.populationmale}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="populationfemale"
          type="text"
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
          type="text"
          placeholder="Total Number of Male"
          icon={FamilyRestroom}
          value={formData.householdmale2}
          handleChange={handleChanges}
        />
        <FormField
          label="Female"
          name="householdfemale2"
          type="text"
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
            />
            <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
          </React.Fragment>
        ))}
        <AddCircleOutline onClick={addField} className="lg:mt-8" />
      </div>

    </div>
  );
};
