import { Formik, Form, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useGetWeredaByRegionQuery } from "../../redux/region/RegionApiSlice";
import {
  useGetKebeleByIdQuery,
  useGetKebeleByWeredaQuery,
} from "../../redux/kebele/KebeleApiSlice";
import { FormField } from "../Resource/Utility/FormField";
import {
  useGetSiteByIdQuery,
  useUpdateSiteByIdMutation,
} from "../../redux/site/SiteApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from "../Resource/Loading/Loadings";
import { useParams } from "react-router-dom";
import { useGetWeredaByIdQuery } from "../../redux/wereda/WeredaApiSlice";
import { MainLoading } from "../Resource/Loading/Loadings";
import GeoJsonConverter from "../Resource/Convertion/GeoJsonConverter";
import BackButton from "../Resource/Utility/BackButton";

const validationSchema = Yup.object().shape({
  region_id: Yup.string().required("Region is required"),
  woreda_id: Yup.string().required("Wereda is required"),
  kebele_id: Yup.string().required("Kebele is required"),
  watershed_name: Yup.string().required("MicroWaterShed name is required"),
  site_name: Yup.string().required("Site name is required"),
  size_ha: Yup.number()
    .required("Size of Site is required")
    .positive("Size must be a positive number"),
  // geojson: Yup.mixed().test(
  //   "fileSize",
  //   "File size is too large",
  //   (value) => value && value.size <= 1048576
  // ), // Assuming a max file size of 1MB
});
export const UpdateSiteForm = () => {
  const { id } = useParams();
  const {
    data: sites,
    isSuccess,
    isFetching: sitefetching,
  } = useGetSiteByIdQuery(id);
  const [UpdateSite] = useUpdateSiteByIdMutation();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const [selectedKebele, setSelectedKebele] = useState("");
  const [weredaId, setWeredaId] = useState(null);
  const [kebeleId, setKebeleId] = useState(null);
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const {
    data: weredas,
    isSuccess: weredaDataSuccess,
    isFetching: weredaDataFetching,
  } = useGetWeredaByIdQuery(weredaId);
  const {
    data: kebeles,
    isSuccess: kebeleDataSuccess,
    isFetching: KebeleDataFetching,
  } = useGetKebeleByIdQuery(kebeleId);
  const {
    data: getweredaByRegion,
    isSuccess: weredaSuccess,
    isFetching,
  } = useGetWeredaByRegionQuery(
    { id: selectedRegion, with_sites: true },
    { skip: !selectedRegion }
  );
  const {
    data: getkebeleByWereda,
    isSuccess: kebeleSuccess,
    isFetching: kebeleFetching,
  } = useGetKebeleByWeredaQuery(
    { id: selectedWereda, with_sites: true },
    { skip: !selectedWereda }
  );
  const [formData, setFormData] = useState({
    watershed_name: "",
    site_name: "",
    kebele_id: "",
    geojson: null,
    size_ha: 0,
    status: "active",
    woreda_id: "",
    region_id: "",
  });

  useEffect(() => {
    if (isSuccess && sites) {
      console.log(sites.data);
      const Sites = sites.data;
      const {
        watershed_name,
        status,
        size_ha,
        site_name,
        kebele_id,
        woreda_id,
        region_id,
        geojson,
      } = Sites;
      const region = regions.find((region) => region.id === region_id);
      const selectedRegionName = region ? region.region_name : "";
      setFormData({
        watershed_name,
        status,
        size_ha,
        site_name,
        region_id,
        kebele_id,
        woreda_id,
        geojson,
        selectedRegionName,
      });
      console.log({
        watershed_name,
        status,
        size_ha,
        site_name,
        kebele_id,
        woreda_id,
        geojson,
        selectedRegionName,
      });
      setSelectedRegion(region_id);
      setSelectedWereda(woreda_id);
      setSelectedKebele(kebele_id);
      setWeredaId(woreda_id);
      setKebeleId(kebele_id);
    }
  }, [isSuccess, sites, regions]);

  useEffect(() => {
    if (weredaDataSuccess && weredas && kebeleDataSuccess && kebeles) {
      const selectedWeredaName = weredas.data ? weredas.data.woreda_name : "";
      const selectedKebele = kebeles.data ? kebeles.data.kebele_name : "";
      setFormData({
        ...formData,
        selectedWeredaName,
        selectedKebele,
      });
      console.log({
        ...formData,
        selectedWeredaName,
        selectedKebele,
      });
    }
  }, [weredaDataSuccess, weredas, kebeleDataSuccess, kebeles]);

  const handleSubmit = async (values) => {
    console.log(values);
    const updatedValues = {
      ...values,
      kebele_id: parseInt(values.kebele_id, 10),
      woreda_id: parseInt(values.woreda_id, 10),
      region_id: parseInt(values.region_id, 10),
    };
    const formData = new FormData();
    for (const key in updatedValues) {
      if (key !== "geojson") {
        formData.append(key, updatedValues[key]);
      }
    }
    if (updatedValues.geojson instanceof File) {
      // Use the GeoJsonConverter component to convert the GeoJSON file
      const geoJsonConverter = await GeoJsonConverter.convert(
        updatedValues.geojson,
        updatedValues.site_name,
        updatedValues.watershed_name
      );
      console.log(updatedValues.geojson);
      console.log(geoJsonConverter);
      formData.append("geojson", geoJsonConverter);
    }
    console.log({ id: id, updatedValues });

    const site = await UpdateSite({ id: id, data: formData });
    console.log(site);
    if (site.data) {
      toast.success("Site added successfully!");
      window.location.href = `/admin/site`;
    }
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
  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Update Site</h1>
          {weredaDataFetching && KebeleDataFetching ? (
            <MainLoading />
          ) : (
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ handleChange, setFieldValue }) => (
                <Form>
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
                              selectedWeredaName: option.label,
                              selectedKebele: "",
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
                              : getkebeleByWereda?.data?.data?.map(
                                  (kebele) => ({
                                    value: kebele.id,
                                    label: kebele.kebele_name,
                                  })
                                )
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
                    <FormField
                      label="MicroWaterShed"
                      name="watershed_name"
                      type="text"
                      placeholder="Name of WaterShed"
                      value={formData.watershed_name}
                      handleChange={handleChanges}
                    />
                    <FormField
                      label="Site"
                      name="site_name"
                      type="text"
                      placeholder="Name of Site"
                      value={formData.site_name}
                      handleChange={handleChanges}
                    />
                    <FormField
                      label="Size of Site"
                      name="size_ha"
                      type="number"
                      placeholder="Size of Site in ha"
                      value={formData.size_ha}
                      handleChange={handleChanges}
                    />
                  </div>
                  <div className="flex justify-between flex-grow">
                    {formData.geojson && (
                      <div className="mb-4 w-full lg:w-2/5 px-4">
                        <a
                          href={`https://tbrr.echnoserve.com/storage/app/public/${formData.geojson}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View Current GeoJSON
                        </a>
                        {/* <p className="mt-2 text-sm text-gray-600">
                          Selected file: {formData.geojsonName}
                        </p> */}
                      </div>
                    )}
                    <div className="w-full lg:w-2/5 mt-5">
                      <label
                        htmlFor="geojsonFile"
                        className="block uppercase text-gray-500 text-xs font-bold mb-2"
                      >
                        Upload GeoJSON
                      </label>
                      <div className="flex items-center">
                        <label
                          htmlFor="geojsonFile"
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded shadow-md cursor-pointer mr-2"
                        >
                          Browse
                        </label>
                        <input
                          id="geojsonFile"
                          type="file"
                          name="geojson"
                          accept=".geojson"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("geojson", file);
                            setFieldValue("geojsonName", file.name);
                            document.getElementById(
                              "geojsonFileName"
                            ).textContent = file.name; // Show the file name
                          }}
                        />
                        <span
                          className="text-gray-600"
                          id="geojsonFileName"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};
