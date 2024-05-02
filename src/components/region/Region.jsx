import React, { useState } from "react";
import { FormField } from "../Resource/Utility/FormField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../Resource/Utility/BackButton";
import { useAddRegionMutation } from "../../redux/region/RegionApiSlice";
import { log } from "../Resource/Utility/Logger";

const validationSchema = Yup.object().shape({
  region_name: Yup.string().required("Region name is required"),
  region_code: Yup.string().required("Region code is required"),
//   geojson: Yup.mixed().test("fileSize", "File size is too large", (value) => !value || (value && value.size <= 1048576)),
});

export const Regions = () => {
  const [file, setFile] = useState(null);
  const [AddRegion] = useAddRegionMutation();
  const [formData, setFormData] = useState({
    region_name: "",
    status: "active",
    region_code: "",
  });
  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (values.geojson) {
      formData.append("geojson", values.geojson);
    }
    log(formData);

    const region = await AddRegion(formData);
    log(region);
    if (region.data) {
      toast.success("Wereda added successfully!");
      window.location.href = `/admin/region`;
    }
  };
  const handleChanges = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  return (
    <div className="h-screen bg-dashbordColor">
      <div className="pt-6 pl-4">
        <BackButton />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold mb-5">Add Region</h1>

          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, setFieldValue }) => (
              <Form>
                <div className="flex flex-wrap">
                  <FormField
                    label="Region"
                    name="region_name"
                    type="text"
                    placeholder="Name of Region"
                    handleChange={handleChange}
                  />
                  <FormField
                    label="Region Code"
                    name="region_code"
                    type="text"
                    placeholder="Region Code"
                    handleChange={handleChange}
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
                    handleChange={handleChange}
                  />
                  <FormField
                    label="Female Population"
                    name="female_population"
                    type="number"
                    placeholder="Female Population"
                    handleChange={handleChange}
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
