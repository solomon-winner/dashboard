import React, { useState } from "react";

import { AddCircleOutline, Delete, Forest } from "@mui/icons-material";
import { FormField } from "../../Resource/Utility/FormField";
import { useSelector } from "react-redux";
import Loadings from "../../Resource/Loading/Loadings";
import { useGetWeredaByRegionQuery } from "../../../redux/region/RegionApiSlice";
import { useGetKebeleByWeredaQuery } from "../../../redux/kebele/KebeleApiSlice";
import { useGetSiteByKebeleQuery } from "../../../redux/site/SiteApiSlice";
import SiteSelect from "../../Resource/Utility/SelecteDropDown/SiteSelect";
import KebeleSelect from "../../Resource/Utility/SelecteDropDown/KebeleSelect";
import WeredaSelect from "../../Resource/Utility/SelecteDropDown/WeredaSelect";
import RegionSelect from "../../Resource/Utility/SelecteDropDown/RegionSelect";
import FieldComponent from "../../Resource/Utility/AddRemoveForm/FieldComponent";
export const AddForm = ({ handleChange, formData, setFormData }) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const [selectedKebele, setSelectedKebele] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const { data: getweredaByRegion, isFetching } = useGetWeredaByRegionQuery(
    { id: selectedRegion, with_sites: true },
    { skip: !selectedRegion }
  );
  const { data: getkebeleByWereda, isFetching: kebeleFetching } =
    useGetKebeleByWeredaQuery(
      { id: selectedWereda, with_sites: true },
      { skip: !selectedWereda }
    );
  const { data: getsitesByKebele, isFetching: siteFetching } =
    useGetSiteByKebeleQuery(selectedKebele, { skip: !selectedKebele });
  const { tree, isLoadingTree } = useSelector((state) => state.resource);

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
      </div>
      <div className="flex flex-wrap">
        <KebeleSelect
          getkebeleByWereda={getkebeleByWereda}
          kebeleFetching={kebeleFetching}
          selectedKebele={selectedKebele}
          setSelectedKebele={setSelectedKebele}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
        <SiteSelect
          getsitesByKebele={getsitesByKebele}
          siteFetching={siteFetching}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <h6 className="text-blueGray-400 text-sm mt-3 mb-4 font-bold uppercase">
        Trees Species found In The Site
      </h6>
      <div>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
          Indegeneous
        </h6>

        <FieldComponent
        initialValues={formData}
        placeholder={["Type of Indegeneous"]}
        type={["dropdown"]}
        label={["indegeneoustype"]}
        options={
          isLoadingTree
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
            : tree.map((indegeneous, index) => ({
                label: indegeneous.name,
                value: indegeneous.id,
              }))
        }
        onValueChange={(id, name, value) => {
          const values = name === "indegeneoustype" && typeof value === "object" ? value.value : value;
          const keyToUpdate = name === "indegeneoustype" ? `indegeneoustype${id}` : "";
          setFormData({
            ...formData,
            [keyToUpdate]: values,
          });
        }}
        onremove={(id) => {
          const updatedFormData = { ...formData };
          delete updatedFormData[`indegeneoustype${id}`];
          let newFormData = {};
          let indegeneoustypeIndex = 1;

          for (let key in updatedFormData) {
            if (key.startsWith("indegeneoustype")) {
              newFormData[`indegeneoustype${indegeneoustypeIndex}`] = updatedFormData[key];
              indegeneoustypeIndex++;
            } else {
              newFormData[key] = updatedFormData[key];
            }
          }

          setFormData(newFormData);
        }}
        />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
          Exotic
        </h6>

        <FieldComponent
        initialValues={formData}
        placeholder={["Type of Exotic"]}
        type={["dropdown"]}
        label={["exotictype"]}
        options={
          isLoadingTree
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
            : tree.map((exotic, index) => ({
                label: exotic.name,
                value: exotic.id,
              }))
        }
        onValueChange={(id, name, value) => {
          const values = name === "exotictype" && typeof value === "object" ? value.value : value;
          const keyToUpdate = name === "exotictype" ? `exotictype${id}` : "";
          setFormData({
            ...formData,
            [keyToUpdate]: values,
          });
        }}
        onremove={(id) => {
          const updatedFormData = { ...formData };
          delete updatedFormData[`exotictype${id}`];
          let newFormData = {};
          let exotictypeIndex = 1;

          for (let key in updatedFormData) {
            if (key.startsWith("exotictype")) {
              newFormData[`exotictype${exotictypeIndex}`] = updatedFormData[key];
              exotictypeIndex++;
            } else {
              newFormData[key] = updatedFormData[key];
            }
          }

          setFormData(newFormData);
        }}
        />
      </div>
    </div>
  );
};
