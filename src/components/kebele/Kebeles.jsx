import React, { useState } from "react";
import { useAddKebeleMutation } from "../../redux/kebele/KebeleApiSlice";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useGetWeredaByRegionQuery } from "../../redux/region/RegionApiSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
import { FormField } from "../Resource/Utility/FormField";
import GeoJsonConverter from "../Resource/Convertion/GeoJsonConverter";
const validationSchema = Yup.object().shape({
  kebele_name: Yup.string().required("Kebele name is required"),
  woreda_id: Yup.number().required("Wereda ID is required"),
  region_id: Yup.number().required("Region ID is required"),
});
const Kebeles = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const { data: getweredaByRegion, isFetching } = useGetWeredaByRegionQuery(
    { id: selectedRegion, with_sites: true },
    { skip: !selectedRegion }
  );
  const [addKebele] = useAddKebeleMutation();
  const [formData, setFormData] = useState({
    kebele_name: "",
    woreda_id: "",
    region_id: "",
    geojson: null,
    status: "active",
  });
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
    if (updatedValues.geojson instanceof File) {
      // Use the GeoJsonConverter component to convert the GeoJSON file
      const geoJsonConverter = await GeoJsonConverter.convert(
        updatedValues.geojson,
        updatedValues.kebele_name
      );
      console.log(updatedValues.geojson);
      console.log(geoJsonConverter);
      formData.append("geojson", geoJsonConverter);
    }

    console.log(formData);

    const kebele = await addKebele(formData);
    console.log(kebele);
    if (kebele.data) {
      toast.success("Kebele added successfully!");
      window.location.href = `/admin/kebele`;
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
    : getweredaByRegion?.data?.map((wereda) => ({
        value: wereda.id,
        label: wereda.woreda_name,
      }));

  return (
    <div className="h-screen bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Add Kebele</h1>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                    handleChange={handleChange}
                  />
                  <FormField
                    label="Kebele Code"
                    name="kebele_code"
                    type="text"
                    placeholder="Name of Kebele Code"
                    handleChange={handleChange}
                  />
                  <FormField
                    label="Kebele GeoJSON"
                    type="file"
                    name="geojson"
                    accept=".geojson"
                    handleChange={(event) => {
                      const file = event.target.files[0];
                      setFieldValue("geojson", file);
                    }}
                  />
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
        </div>
      </div>
    </div>
  );
};

export default Kebeles;
