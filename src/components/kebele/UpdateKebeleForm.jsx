import React, { useEffect, useState } from "react";
import {
  useAddKebeleMutation,
  useGetKebeleByIdQuery,
  useUpdateKebeleByIdMutation,
} from "../../redux/kebele/KebeleApiSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useGetRegionQuery,
  useGetWeredaByRegionQuery,
} from "../../redux/region/RegionApiSlice";
import { FormField } from "../wereda/AddWereda";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from "../Resource/Loading/Loadings";
import { useParams } from "react-router-dom";
import { useGetWeredaByIdQuery } from "../../redux/wereda/WeredaApiSlice";
import { MainLoading } from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
const validationSchema = Yup.object().shape({
  kebele_name: Yup.string().required("Kebele name is required"),
  woreda_id: Yup.number().required("Wereda ID is required"),
  region_id: Yup.number().required("Region ID is required"),
  // //   geojson: Yup.mixed().required("GeoJSON file is required"),
  status: Yup.string().required("Status is required"),
});
const UpdateKebeleForm = () => {
  const { id } = useParams();
  const { data: kebeles, isSuccess } = useGetKebeleByIdQuery(id);
  const [UpdateKebele] = useUpdateKebeleByIdMutation();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const [weredaId, setWeredaId] = useState(null);
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const {
    data: weredas,
    isSuccess: weredaDataSuccess,
    isFetching: weredaDataFetching,
  } = useGetWeredaByIdQuery(weredaId);
  const {
    data: getweredaByRegion,
    isSuccess: weredaSuccess,
    isFetching,
  } = useGetWeredaByRegionQuery(
    { id: selectedRegion, with_sites: true },
    { skip: !selectedRegion }
  );
  const [addKebele] = useAddKebeleMutation();
  const [formData, setFormData] = useState({
    kebele_name: "",
    kebele_code: 0,
    woreda_id: "",
    region_id: "",
    geojson: null,
    status: "active",
  });
  const [initialGeojson, setInitialGeojson] = useState(null);

  useEffect(() => {
    if (isSuccess && kebeles) {
      const Kebele = kebeles.data;
      const {
        kebele_name,
        region_id,
        woreda_id,
        kebele_code,
        geojson,
        status,
      } = Kebele;
      console.log(Kebele);
      const region = regions.find((region) => region.id === region_id);
      const selectedRegionName = region ? region.region_name : "";
      setFormData({
        kebele_name,
        region_id,
        woreda_id,
        kebele_code,
        geojson,
        selectedRegionName,
        status,
      });
      console.log({
        kebele_name,
        region_id,
        woreda_id,
        kebele_code,
        geojson,
        selectedRegionName,
        status,
      });
      setSelectedRegion(region_id);
      setSelectedWereda(woreda_id);
      setWeredaId(woreda_id);
    }
  }, [isSuccess, kebeles, regions]);
  useEffect(() => {
    if (weredaDataSuccess && weredas) {
      const selectedWeredaName = weredas.data ? weredas.data.woreda_name : "";
      setFormData({
        ...formData,
        selectedWeredaName,
      });
      console.log({
        ...formData,
        selectedWeredaName,
      });
    }
  }, [weredaDataSuccess, weredas]);

  const handleSubmit = async (values) => {
    // Parse the values to integers
    const updatedValues = {
      ...values,
      woreda_id: parseInt(values.woreda_id, 10),
      region_id: parseInt(values.region_id, 10),
    };
    const formData = new FormData();
    for (const key in updatedValues) {
      if (key !== "geojson") {
        formData.append(key, updatedValues[key]);
      }
    }
    if (initialGeojson && initialGeojson !== updatedValues.geojson) {
      formData.append("geojson", updatedValues.geojson);
    }
    console.log({ id: id, updatedValues });

    const kebele = await UpdateKebele({ id: id, data: formData });
    console.log(kebele);
    if (kebele.data) {
      toast.success("Kebele Updated successfully!");
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
    <div className="h-screen bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Add Kebele</h1>
          {weredaDataFetching ? (
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
                    <FormField
                      label="Kebele"
                      name="kebele_name"
                      type="text"
                      placeholder="Name of Kebele"
                      value={formData.kebele_name}
                      handleChange={handleChanges}
                    />
                    <FormField
                      label="Kebele Code"
                      name="kebele_code"
                      type="text"
                      placeholder="Name of Kebele Code"
                      value={formData.kebele_code}
                      handleChange={handleChanges}
                    />
                  </div>
                  <div className="flex justify-between flex-grow">
                    <div className="mb-4 w-full lg:w-2/5 px-4">
                      <a
                        href={`https://tbrr.echnoserve.com/storage/app/public/${formData.geojson}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        View Current GeoJSON
                      </a>
                      <p className="mt-2 text-sm text-gray-600">
                        Selected file: {formData.geojson}
                      </p>
                    </div>
                    <div className="w-full lg:w-2/5 mt-5">
                      <input
                        id="geojsonFile"
                        type="file"
                        name="geojson"
                        accept=".geojson"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("geojson", file);
                          setFormData({
                            ...formData,
                            geojson: file.name,
                          });
                        }}
                      />
                      <label
                        htmlFor="geojsonFile"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded shadow-md cursor-pointer"
                      >
                        Upload GeoJSON
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
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

export default UpdateKebeleForm;
