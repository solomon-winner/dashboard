import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { RadioButtonGroup } from "../../../site/AddSite";

const parseInitialValues = (initialValues, labels) => {
  const dynamicValues = {};

  Object.entries(initialValues).forEach(([key, value]) => {
    const match = key.match(/(\D+)(\d+)/);
    if (match && labels.includes(match[1])) {
      const [, name, id] = match;
      const numericId = parseInt(id, 10);
      if (!dynamicValues[numericId]) {
        dynamicValues[numericId] = { id: numericId, values: {} };
      }
      dynamicValues[numericId].values[name] = value;
    }
  });

  return Object.values(dynamicValues);
};

const FieldComponent = ({
  initialValues = {},
  placeholder,
  type,
  label,
  onValueChange,
  options = [],
  onremove,
  icon,
}) => {
  const dynamicValues = parseInitialValues(initialValues, label);
  const [fields, setFields] = useState(dynamicValues);
  useEffect(() => {
    setFields(parseInitialValues(initialValues, label));
  }, [initialValues, label]);
  const addField = () => {
    const highestId = fields.reduce(
      (highest, field) => Math.max(highest, field.id),
      0
    );
    const newFieldValue = Object.fromEntries(label.map((name) => [name, ""]));
    setFields([
      ...fields,
      {
        id: highestId + 1,
        values: newFieldValue,
      },
    ]);
  };

  const removeField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
    onremove(id);
  };

  const handleChange = (id, name, value) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? { ...field, values: { ...field.values, [name]: value } }
          : field
      )
    );
    onValueChange(id, name, value);
  };

  return (
    <div>
      {fields.map((field) => (
        <div key={field.id} className="md:flex md:flex-wrap">
          {label.map((name, nameIndex) =>
            type[nameIndex] === "radio" ? (
              <RadioButtonGroup
                key={`${field.id}-${name}`}
                name={`energy_sourcelevel${field.id}`}
                type="radio"
                value={field.values[name]}
                placeholder={placeholder[nameIndex]}
                options={["HIGH", "MEDIUM", "LOW"]}
                handleChange={(e) =>
                  handleChange(field.id, name, e.target.value)
                }
              />
            ) : (
              <FormField
                key={`${field.id}-${name}`}
                label={name}
                name={name}
                value={
                  type[nameIndex] === "dropdown"
                    ? options.find(
                        (option) => option.value === field.values[name]
                      )?.label || ""
                    : field.values[name] || ""
                }
                placeholder={placeholder[nameIndex]}
                type={type[nameIndex]}
                options={options}
                onChange={(e) => handleChange(field.id, name, e.target.value)}
                icon={icon}
                step={0.001}
              />
            )
          )}
          <Delete onClick={() => removeField(field.id)} className="lg:mt-8" />
        </div>
      ))}
      <AddCircleOutline onClick={addField} className="lg:mt-8" />
    </div>
  );
};

export default FieldComponent;
