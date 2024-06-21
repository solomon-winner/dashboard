import React from 'react';
import { ErrorMessage, Field } from "formik";
import Dropdown from './Dropdown';
import useInputHandler from './useInputHandler';

const FormField = ({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  options,
  onChange,
  value,
  accept,
  step,
}) => {
  const {
    inputValue,
    dropdownVisible,
    filteredOptions,
    handleInputChange,
    handleSelectOption,
    setDropdownVisible,
  } = useInputHandler(value, options, type, onChange);

  const renderInputElement = () => {
    if (type === 'dropdown') {
      return (
        <>
          <Field
            type="text"
            id={name}
            name={name}
            value={inputValue}
            className="border-0 px-3 py-1 text-sm focus:outline-none w-full bg-transparent"
            placeholder={placeholder}
            onChange={handleInputChange}
            aria-haspopup="listbox"
            aria-expanded={dropdownVisible}
          />
          <Dropdown
            options={filteredOptions}
            onSelect={handleSelectOption}
            visible={dropdownVisible}
            toggleDropdown={() => setDropdownVisible(!dropdownVisible)}
          />
        </>
      );
    } else {
      return (
        <Field
          type={type}
          id={name}
          name={name}
          className="border-0 px-3 py-1 text-sm focus:outline-none w-full bg-transparent"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          accept={accept}
          step={step}
          min={0}
        />
      );
    }
  };

  return (
    <div className="w-full lg:w-2/5 px-4">
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-gray-500 text-xs font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
          {Icon && <Icon className="text-gray-400 mr-2" />}
          {renderInputElement()}
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


export default FormField;
