import React, { useEffect, useState } from "react";
import { FormField } from "../Resource/Utility/FormField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useGetWeredaByIdQuery,
  useUpdateWeredaByIdMutation,
} from "../../redux/wereda/WeredaApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loadings from "../Resource/Loading/Loadings";
import { MainLoading } from "../Resource/Loading/Loadings";
import { useParams } from "react-router-dom";
import BackButton from "../Resource/Utility/BackButton";
import GeoJsonConverter from "../Resource/Convertion/GeoJsonConverter";
const validationSchema = Yup.object().shape({
  woreda_name: Yup.string().required("Wereda name is required"),
  region_id: Yup.number().required("Region ID is required"),
  // geojson: Yup.mixed().test("fileSize", "File size is too large", (value) => value && value.size <= 1048576),
});

export const UpdateWeredaForm = () => {
  const { id } = useParams();
  const {
    data: woredadata,
    isSuccess,
    isFetching,
    refetch,
  } = useGetWeredaByIdQuery(id);
  const { regions, isLoadingRegions } = useSelector((state) => state.region);
  const [UpdateWereda] = useUpdateWeredaByIdMutation();
  const [formData, setFormData] = useState({
    woreda_name: "",
    status: "",
    region_id: "",
    geojson: "",
    woreda_code: "",
    selectedRegionName: "",
  });


  useEffect(() => {
    if (isSuccess && woredadata) {
      const woredaData = woredadata.data;
      const { woreda_name, status, region_id, geojson, woreda_code } =
        woredaData;
      const region = regions.find((region) => region.id === region_id);
      const selectedRegionName = region ? region.region_name : "";
      setFormData({
        woreda_name,
        status,
        region_id,
        geojson,
        woreda_code,
        selectedRegionName,
      });
    }
  }, [isSuccess, woredadata, regions]);

  const handleSubmit = async (values) => {
    const updatedValues = {
      ...values,
      region_id: parseInt(values.region_id, 10),
    };
    const formData = new FormData();
    for (const key in updatedValues) {
      if (key !== "geojson") {
        // Exclude geojson from being appended
        formData.append(key, updatedValues[key]);
      }
    }
    if (updatedValues.geojson instanceof File) {
      // Use the GeoJsonConverter component to convert the GeoJSON file
      const geoJsonConverter = await GeoJsonConverter.convert(
        updatedValues.geojson
      );
      console.log(values.geojson);
      console.log(geoJsonConverter);
      formData.append("geojson", geoJsonConverter);
    }
    console.log({ id: id, data: formData });

    const wereda = await UpdateWereda({ id: id, data: formData });
    console.log(wereda);
    if (wereda.data) {
      toast.success("Wereda updated successfully!");
      // window.location.href = `/admin/wereda`;
    }
  };
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
          <h1 className="text-3xl font-bold mb-5">Update Wereda</h1>
          {isFetching ? (
            <MainLoading />
          ) : (
            <Formik
              initialValues={formData}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
              {({ setFieldValue }) => (
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
                          value={{
                            value: formData.region_id,
                            label: formData.selectedRegionName,
                          }}
                          onChange={(option) => {
                            setFieldValue("region_id", option.value);
                            setFormData({
                              ...formData,
                              selectedRegionName: option.label,
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
                      value={formData.woreda_name}
                      handleChange={handleChanges}
                    />
                    <FormField
                      label="WeredaCode"
                      name="woreda_code"
                      type="text"
                      placeholder="Wereda Code"
                      value={formData.woreda_code}
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
                       <ErrorMessage
                        name="geojson"
                        component="div"
                        className="text-red-500 flex items-start"
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
