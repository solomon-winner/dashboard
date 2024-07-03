import React, { useState } from "react";
import { FormField } from "../Resource/Utility/FormField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAddWoredaMutation } from "../../redux/wereda/WeredaApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
import GeoJsonConverter from "../Resource/Convertion/GeoJsonConverter";
import { log } from "../Resource/Utility/Logger";
const validationSchema = Yup.object().shape({
  woreda_name: Yup.string().required("Wereda name is required"),
  // status: Yup.string().required("Status is required"),
  region_id: Yup.number().required("Region ID is required"),
  // geojson: Yup.mixed().test("fileSize", "File size is too large", (value) => value && value.size <= 1048576),
});

export const Weredas = () => {
  const [file, setFile] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const [AddWereda] = useAddWoredaMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    woreda_name: "",
    status: "active",
    region_id: "",
    geojson: null,
  });
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const updatedValues = {
      ...values,
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
        updatedValues.woreda_name
      );
      log(updatedValues.geojson);
      log(geoJsonConverter);
      formData.append("geojson", geoJsonConverter);
    }
    log(formData);
try{
    const wereda = await AddWereda(formData);
    log(wereda);
    if (wereda.data) {
      toast.success("Wereda added successfully!");
      window.location.href = `/admin/wereda`;
    }
  } catch (error) {
    log.error(error);
    // Handle error (e.g., show a notification)
  } finally {
    setIsSubmitting(false); // End submission
  }
  };
  const handleChanges = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  return (
    <div className="min-h-screen bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-lg font-bold mb-5">Add Wereda</h1>

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
                            selectedRegionName: option.label, // Use option.label directly here
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
                  <FormField
                    label="Wereda"
                    name="woreda_name"
                    type="text"
                    placeholder="Name of Wereda"
                    handleChange={handleChange}
                  />
                  <FormField
                    label="WeredaCode"
                    name="woreda_code"
                    type="text"
                    placeholder="Wereda Code"
                    handleChange={handleChange}
                  />
                  <FormField
                    label="Wereda GeoJSON"
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
                  disabled={isSubmitting}
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
