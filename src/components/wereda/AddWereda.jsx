import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AddForm } from "./addform/AddForm";
import { AddForm2 } from "./addform/AddForm2";
import { AddForm3 } from "./addform/AddForm3";
import { ArrowDropDown } from "@mui/icons-material";
import { useAddWoredaDataMutation } from "../../redux/wereda/WeredaApiSlice";
import { toast } from "react-toastify";
import { useAddResourceMutation } from "../../redux/resource/ResourceApiSlice";
import BackButton from "../Resource/Utility/BackButton";
const validationSchema = Yup.object().shape({
  region_id: Yup.string().required("Region is required"),
  woreda_id: Yup.string().required("Wereda is required"),
});

export const FormField = ({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  options,
  onChange,
  value,
  handleChange,
  accept,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.length > 0) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
    if (type === "dropdown") {
      setFilteredOptions(
        options.filter(
          (option) =>
            typeof option.label === "string" &&
            option.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    handleChange(e);
  };

  const handleSelectOption = (value) => {
    setInputValue(value.label);
    // Create a mock event object with a name property
    const mockEvent = {
      target: {
        name: name,
        value: value,
      },
    };

    onChange(mockEvent); // Pass the mock event to handleChange
    setFilteredOptions([]);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="w-full lg:w-2/5 px-4 ">
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-gray-500 text-xs font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
        <div
          className="flex items-center border border-gray-300 rounded px-3 py-2"
          onClick={toggleDropdown}
        >
          {Icon && <Icon className="text-gray-400 mr-2" />}
          {type === "dropdown" ? (
            <>
              <Field
                type="text"
                id={name}
                name={name}
                value={inputValue}
                className="border-0 px-3 py-1 text-sm focus:outline-none w-full bg-transparent"
                placeholder={placeholder}
                onChange={handleInputChange}
              />
              <ArrowDropDown
                className="text-gray-400 ml-2 cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownVisible && (
                <ul className="absolute top-full left-0 w-full max-h-48 overflow-y-auto border border-gray-300 bg-white rounded mt-1 z-10">
                  {filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectOption(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Field
              type={type}
              id={name}
              name={name}
              className="border-0 px-3 py-1 text-sm focus:outline-none w-full bg-transparent"
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              accept={accept}
            />
          )}
        </div>
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 flex items-start"
        />
      </div>
    </div>
  );
};

export const Addwereda = () => {
  const [addResource] = useAddResourceMutation();
  const [step, setStep] = useState(1);
  const [addweredadata] = useAddWoredaDataMutation();
  const [formData, setFormData] = useState({
    region_id: "",
    woreda_id: "",
    selectedRegionName: "",
    selectedWeredaName: "",
    urban_kebeles: "",
    rural_kebeles: "",
    male_hh: "",
    female_hh: "",
    male_population: "",
    female_population: "",
    type1: "",
    area1: "",
    asphalt: "",
    allseasongravel: "",
    seasonalgravel: "",
    college: "",
    tvet: "",
    highschool: "",
    secoundschool: "",
    primary: "",
    general: "",
    referral: "",
    clinic: "",
    vetclinic: "",
  });

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const landArray = [];
    let i = 1;
    while (true) {
      const typeKey = `type${i}`;
      const areaKey = `area${i}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "LAND",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          } else {
            toast.error(response.error.data.message);
          }
        }
        landArray.push({
          resource_id: values[typeKey],
          amount: values[areaKey],
        });
        i++;
      } else {
        break;
      }
    }
    const roadArray = [];
    let j = 1;
    while (true) {
      const typeKey = `roadtype${j}`;
      const areaKey = `distance${j}`;
      if (values[typeKey] && values[areaKey]) {
        if (isNaN(values[typeKey])) {
          const response = await addResource({
            name: values[typeKey],
            resource_type: "ROAD",
          });
          if (response.data) {
            toast.success("Resource added successfully");
            values[typeKey] = response.data.data.id;
          } else {
            toast.error(response.error.data.message);
          }
        }
        roadArray.push({
          resource_id: values[typeKey],
          amount: values[areaKey],
        });
        j++;
      } else {
        break;
      }
    }
    const schoolArray = [];
    let k = 1;
    while (true) {
      const typeKey = `schooltype${k}`;
      const areaKey = `schoolnumber${k}`;
      if (values[typeKey] && values[areaKey]) {
        schoolArray.push({
          institution_id: values[typeKey],
          amount: values[areaKey],
        });
        k++;
      } else {
        break;
      }
    }
    const healthArray = [];
    let l = 1;
    while (true) {
      const typeKey = `healthFacilitytype${l}`;
      const areaKey = `healthFacilitynumber${l}`;
      if (values[typeKey] && values[areaKey]) {
        healthArray.push({
          institution_id: values[typeKey],
          amount: values[areaKey],
        });
        l++;
      } else {
        break;
      }
    }

    const institution = [...schoolArray, ...healthArray];
    const resource = [...landArray, ...roadArray];
    const urban_kebeles = values.urban_kebeles;
    const rural_kebeles = values.rural_kebeles;
    const male_hh = values.male_hh;
    const female_hh = values.female_hh;
    const male_population = values.male_population;
    const female_population = values.female_population;

    // Create a new object to store these values
    const data = {
      urban_kebeles,
      rural_kebeles,
      male_hh,
      female_hh,
      male_population,
      female_population,
    };
    const value = {
      resource,
      data,
      institution,
    };

    console.log(value);
    // Check if it's the last step before submitting
    const response = await addweredadata({ ...value, id: values.woreda_id });
    console.log(response);
    if (response.data) {
      toast.success("Data Added Successfully");
    } else {
      toast.error(response.error.data.message);
    }
  };
  const handleChange = (e) => {
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
          <h1 className="text-3xl font-bold mb-5">Add Wereda Data</h1>
          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange }) => (
              <Form>
                {step === 1 && (
                  <AddForm
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {step === 2 && (
                  <AddForm2
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {step === 3 && (
                  <AddForm3
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                <div className="mt-20 flex justify-between w-10/12">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                    >
                      Back
                    </button>
                  )}
                  <div className="text-gray-500 text-sm">Page {step} of 3</div>
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-800 text-white font-bold py-2 px-4 rounded hover:bg-darkMain"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
