import { ArrowDropDown } from "@mui/icons-material";
import { ErrorMessage, Field } from "formik";
import { useState } from "react";

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
  