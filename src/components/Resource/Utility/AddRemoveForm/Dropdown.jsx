import React from 'react';
import { ArrowDropDown } from "@mui/icons-material";

const Dropdown = ({ options, onSelect, visible, toggleDropdown }) => (
  <>
    <ArrowDropDown
      className="text-gray-400 ml-2 cursor-pointer"
      onClick={toggleDropdown}
      aria-label="Toggle dropdown"
    />
    {visible && (
      <ul
        className="absolute top-full left-0 w-full max-h-48 overflow-y-auto border border-gray-300 bg-white rounded mt-1 z-10"
        role="listbox"
      >
        {options.map((option, index) => (
          <li
            key={index}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(option)}
            role="option"
            aria-selected={false}
          >
            {option.label}
          </li>
        ))}
      </ul>
    )}
  </>
);

export default Dropdown;
