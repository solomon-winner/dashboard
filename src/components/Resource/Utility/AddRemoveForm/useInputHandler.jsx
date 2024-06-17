import { useState, useMemo } from 'react';

const useInputHandler = (initialValue, options, type, onChange) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filteredOptions = useMemo(() => {
    if (type === 'dropdown' && inputValue) {
      return options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return options;
  }, [inputValue, options, type]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setDropdownVisible(value.length > 0);
    onChange(e);
  };

  const handleSelectOption = (selectedOption) => {
    setInputValue(selectedOption.label);
    onChange({ target: { name: selectedOption.name, value: selectedOption } });
    setDropdownVisible(false);
  };

  return {
    inputValue,
    dropdownVisible,
    filteredOptions,
    handleInputChange,
    handleSelectOption,
    setDropdownVisible,
  };
};

export default useInputHandler;