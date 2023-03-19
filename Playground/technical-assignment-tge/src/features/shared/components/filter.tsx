import styled from "styled-components";

import { useAppDispatch } from "../../../app/hooks";
import { filterBy } from "../../tasks/tasksSlice";

interface IFilterPorps {
  name: string;
  options: Array<string>;
  defaultValue: string | undefined;
}

const Filter = ({name, options, defaultValue}: IFilterPorps) => {
  const dispatch = useAppDispatch();

  const handleOnChange = (e: any) => {
    dispatch(filterBy({filter: name, value: e.target.value }));
  }

  return (<Wrap >
    <img src="/filter-icon.png" alt="" />
    <select defaultValue={defaultValue || "default"} onChange={handleOnChange}>
      {!defaultValue && <option value="default" defaultValue="" disabled hidden>Sort by</option>}
      
      {options.map((item: any) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </Wrap>)
}

export default Filter;

const Wrap = styled.div`
  
`;