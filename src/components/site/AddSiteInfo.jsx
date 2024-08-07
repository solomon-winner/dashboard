import { Formik, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useGetWeredaByRegionQuery } from "../../redux/region/RegionApiSlice";
import { useGetKebeleByWeredaQuery } from "../../redux/kebele/KebeleApiSlice";
import { FormField } from "../Resource/Utility/FormField";
import { useAddSiteMutation } from "../../redux/site/SiteApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
import GeoJsonConverter from "../Resource/Convertion/GeoJsonConverter";
import { log } from "../Resource/Utility/Logger";
const validationSchema = Yup.object().shape({
  region_id: Yup.string().required("Region is required"),
  woreda_id: Yup.string().required("Wereda is required"),
  kebele_id: Yup.string().required("Kebele is required"),
  // watershed_name: Yup.string().required("MicroWaterShed name is required"),
  // site_name: Yup.string().required("Site name is required"),
  // size_ha: Yup.number()
  //   .required("Size of Site is required")
  //   .positive("Size must be a positive number"),
  // geojson: Yup.mixed().test(
  //   "fileSize",
  //   "File size is too large",
  //   (value) => value && value.size <= 1048576
  // ), // Assuming a max file size of 1MB
});
export const AddSiteInfo = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedWereda, setSelectedWereda] = useState("");
  const [selectedKebele, setSelectedKebele] = useState("");
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
  const [addSite] = useAddSiteMutation();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    // Parse the values to integers
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
      log(updatedValues.geojson);
      log(geoJsonConverter);
      formData.append("geojson", geoJsonConverter);
    }
    try {
    // Assuming addSite now accepts FormData instead of a plain object
    const site = await addSite(formData);
    log(site);
    if (site.data) {
      toast.success("Site added successfully!");
      window.location.href = "/admin/site";
    }
  } catch (error) {
    log.error(error);
    // Handle error (e.g., show a notification)
  } finally {
    setIsSubmitting(false); // End submission
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
    <div className="bg-dashbordColor min-h-screen">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-lg font-bold mb-5">Add Site</h1>
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
                            : getkebeleByWereda?.data?.map((kebele) => ({
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
                  <FormField
                    label="MicroWaterShed"
                    name="watershed_name"
                    type="text"
                    placeholder="Name of WaterShed"
                    handleChange={handleChange}
                  />
                  <FormField
                    label="Site"
                    name="site_name"
                    type="text"
                    placeholder="Name of Site"
                    handleChange={handleChange}
                  />
                  <FormField
                    label="Size of Site"
                    name="size_ha"
                    type="number"
                    placeholder="Size of Site in ha"
                    handleChange={handleChange}
                    step={0.01}
                    min="0"
                  />
                  <FormField
                    label="Site GeoJSON"
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
                  // disabled={isSubmitting} // Use the isSubmitting state to disable the button
                  // onClick={() => {
                  //   setisSubmitting(true); // Set isSubmitting to true when the button is clicked
                  // }}
                >
                  {/* {isSubmitting ? "Submitting..." : "Submit"} */}
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
