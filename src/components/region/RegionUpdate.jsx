import React, { useEffect, useState } from "react";
import { FormField } from "../Resource/Utility/FormField";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../Resource/Utility/BackButton";
import { useGetRegionByIdQuery, useUpdateRegionMutation } from "../../redux/region/RegionApiSlice";
import { useParams } from "react-router-dom";
import GeoJsonConverter from "../Resource/Convertion/GeoJsonConverter";
import { log } from "../Resource/Utility/Logger";

const validationSchema = Yup.object().shape({
  region_name: Yup.string().required("Region name is required"),
  region_code: Yup.string().required("Region code is required"),
//   geojson: Yup.mixed().test("fileSize", "File size is too large", (value) => !value || (value && value.size <= 1048576)),
});

export const RegionUpdate = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [UpdateRegion] = useUpdateRegionMutation();
  const {data: RegionData , isSuccess, isFetching} = useGetRegionByIdQuery(id);
  const [formData, setFormData] = useState({
    region_name: "",
    status: "active",
    region_code: "",
    male_population: "",
    female_population: "",
  });

  useEffect(() => {
    if(isSuccess && RegionData){
        const region = RegionData.data;
        const {region_name, status, region_code, male_population, female_population,geojson} = region;
        setFormData({
            region_name,
            status,
            region_code,
            male_population,
            female_population,
            geojson
        })
    }    
  }, [isSuccess, RegionData]);

  const handleSubmit = async (values) => {
    log(values);
    const formData = new FormData();
    for (const key in values) {
      if (key !== "geojson") {
        formData.append(key, values[key]);
      }
    }
    if (values.geojson instanceof File) {
      // Use the GeoJsonConverter component to convert the GeoJSON file
      const geoJsonConverter = await GeoJsonConverter.convert(
        values.geojson
      );
      log(values.geojson);
      log(geoJsonConverter);
      formData.append("geojson", geoJsonConverter);
    }
    log({ id: id, values });

    const region = await UpdateRegion({ id: id, data: formData });
    log(region);
    if (region.data) {
      toast.success("Region added successfully!");
      window.location.href = `/admin/region`;
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
          <h1 className="text-3xl font-bold mb-5">Update Region</h1>

          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="flex flex-wrap">
                  <FormField
                    label="Region"
                    name="region_name"
                    type="text"
                    placeholder="Name of Region"
                    value={formData.region_name}
                    handleChange={handleChanges}
                  />
                  <FormField
                    label="Region Code"
                    name="region_code"
                    type="text"
                    placeholder="Region Code"
                    value={formData.region_code}
                    handleChange={handleChanges}
                  />
                  <FormField
                    label="Region GeoJSON"
                    type="file"
                    name="geojson"
                    accept=".geojson"
                    handleChange={(event) => {
                      const file = event.target.files[0];
                      setFieldValue("geojson", file);
                    }}
                  />
                  <FormField
                    label="Male Population"
                    name="male_population"
                    type="number"
                    placeholder="Male Population"
                    value={formData.male_population}
                    handleChange={handleChanges}
                  />
                  <FormField
                    label="Female Population"
                    name="female_population"
                    type="number"
                    placeholder="Female Population"
                    value={formData.female_population}
                    handleChange={handleChanges}
                  />
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
