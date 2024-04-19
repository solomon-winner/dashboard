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
  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, indegeneoustype: "" },
  ]);
  const [additionalFields2, setAdditionalFields2] = useState([
    { id: 0, exotictype: "" },
  ]);
  const addField = () => {
    const highestId = additionalFields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    setAdditionalFields([
      ...additionalFields,
      { id: highestId + 1, indegeneoustype: "" },
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
    setAdditionalFields2([
      ...additionalFields2,
      { id: highestId + 1, exotictype: "" },
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
        <div className="flex flex-wrap">
          {additionalFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <FormField
                label="Type"
                name={`indegeneoustype${index + 1}`}
                type="dropdown"
                placeholder="Type of Indegeneous"
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
                value={
                  tree.find(
                    (tree) =>
                      tree.id === formData[`indegeneoustype${index + 1}`]
                  )?.name || ""
                }
                handleChange={handleChanges}
                onChange={(option) => {
                  handleChanges({
                    target: {
                      name: `indegeneoustype${index + 1}`,
                      value: option.target.value.value,
                    },
                  });
                }}
              />
              <Delete
                onClick={() => removeField(field.id)}
                className="lg:mt-8"
              />
            </React.Fragment>
          ))}
          <AddCircleOutline onClick={addField} className="lg:mt-8" />
        </div>

        <h6 className="text-blueGray-400 text-sm mt-3 mb-4 uppercase">
          Exotic
        </h6>
        <div className="flex flex-wrap">
          {additionalFields2.map((field, index) => (
            <React.Fragment key={field.id}>
              <FormField
                label="Type"
                name={`exotictype${index + 1}`}
                type="dropdown"
                placeholder="Type of Exotic"
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
                handleChange={handleChanges}
                value={
                  tree.find(
                    (tree) => tree.id === formData[`exotictype${index + 1}`]
                  )?.name || ""
                }
                onChange={(option) => {
                  handleChanges({
                    target: {
                      name: `exotictype${index + 1}`,
                      value: option.target.value.value,
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
    </div>
  );
};
