import React from "react";
import Select from "react-select";

const MultiselectPresentationComponent = ({
  lang,
  options,
  handleAddPresentationField,
  values,
}) => {
  return (
    <Select
      isMulti={true}
      value={values}
      options={options}
      className="block m-0 appearance-none  border border-gray-300 cursor-pointer rounded-md pb-1 focus:outline-none focus:border-gray-400 w-full"
      name="presentations"
      htmlFor="presentations"
      placeholder="Presentaciones"
      onChange={handleAddPresentationField}
    />
  );
};

export default MultiselectPresentationComponent;
