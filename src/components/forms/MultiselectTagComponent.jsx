import React from "react";
import Select from "react-select";

const MultiselectTagComponent = ({
  lang,
  options,
  handleAddTagField,
  values,
}) => {
  return (
    <Select
      isMulti
      value={values}
      options={options}
      className="block m-0 appearance-none  border border-gray-300 cursor-pointer rounded-md pb-1 focus:outline-none focus:border-gray-400 w-full"
      name="tags"
      htmlFor="tags"
      placeholder="Palabras Clave"
      onChange={handleAddTagField}
    />
  );
};

export default MultiselectTagComponent;
