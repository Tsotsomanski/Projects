import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { filterBy, selectedFilter, updateSelectedFilter } from "../../tasks/tasksSlice";

interface IFilterPorps {
  name: string;
  options: Array<string>;
  defaultValue: string | undefined;
}

const Filter = ({name, options, defaultValue}: IFilterPorps) => {
  const dispatch = useAppDispatch();
  const selectedFilterName = useAppSelector(selectedFilter);
  const [selectedValue, setSelectedValue] = useState(defaultValue || undefined);

  const handleOnChange = (e: any) => {
    setSelectedValue(e.target.value);
    dispatch(updateSelectedFilter(name));
    dispatch(filterBy({filter: name, value: e.target.value }));
  }

  useEffect(() => {
    let selectFormValue;

    if (!defaultValue) {
      selectFormValue = selectedFilterName === name ? selectedValue : "default";
    } else {
      selectFormValue = selectedFilterName !== name ? defaultValue : selectedValue;
    }

    setSelectedValue(selectFormValue);
  }, [defaultValue, name, selectedFilterName, selectedValue])


  return (<div >
    <img src="/filter-icon.png" alt="" />
    <select
      onChange={handleOnChange}
      value={selectedValue}
    >
      {!defaultValue && <option value="default" defaultValue="" disabled hidden>Sort by</option>}
      
      {options.map((item: any) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>)
}

export default Filter;