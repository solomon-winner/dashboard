import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";

import { AddCircleOutline, Delete, Forest } from "@mui/icons-material";
import { FormField } from "../../wereda/AddWereda";
import { weredas } from "../../wereda/addform/AddForm";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from '../../Resource/Loading/Loadings';
import { useGetWeredaByRegionQuery } from "../../../redux/region/RegionApiSlice";
import { useGetKebeleByWeredaQuery } from "../../../redux/kebele/KebeleApiSlice";
import { useGetSiteByKebeleQuery } from "../../../redux/site/SiteApiSlice";
export const AddForm = ({ handleChange, formData, setFormData }) => {

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const [selectedKebele, setSelectedKebele] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
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
  const {
    data: getsitesByKebele,
    isSuccess: siteSuccess,
    isFetching: siteFetching,
  } = useGetSiteByKebeleQuery(selectedKebele, { skip: !selectedKebele });
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
                            <Loadings/>
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
        <div className="w-full lg:w-2/5 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-500 text-xs font-bold mb-2"
              htmlFor="region"
            >
              Site
            </label>
            <Select
              name="site_id"
              options={
                siteFetching
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
                  : getsitesByKebele?.data?.data?.map((site) => ({
                      value: site.id,
                      label: site.site_name,
                    }))
              }
              value={
                formData && formData.selectedSite
                  ? {
                      value: selectedSite,
                      label: formData.selectedSite,
                    }
                  : null
              }
              onChange={(option) => {
                setSelectedSite(option.value);
                handleChange({
                  target: {
                    name: "site_id",
                    value: option.value,
                  },
                });
                setFormData({
                  ...formData,
                  selectedSite: option.label, // Use option.label directly here
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
