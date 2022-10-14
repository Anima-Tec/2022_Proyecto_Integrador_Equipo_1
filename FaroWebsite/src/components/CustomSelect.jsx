import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { style } from "../utils/data";

const CustomSelect = ({ onChange, options, value, name, placeholder }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div>
      <Select
        defaultValue="no select"
        name={name}
        options={options}
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        placeholder={placeholder}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={style}
      />
    </div>
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
};
