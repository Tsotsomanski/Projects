import { useState } from "react";
import styled from "styled-components";

interface IToggleButtonProps {
  isChecked: boolean;
  handleChange: any;
  taskId: number;
}

const ToggleButton = ({isChecked, handleChange, taskId}: IToggleButtonProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleOnChange = () => {
    setChecked(!checked);
    handleChange(!checked, taskId);
  }

  return (
    <Wrap>
      <label className={isChecked ? "checked" : ""} htmlFor={`switch-${taskId}`}>Toggle</label>
      <input type="checkbox" id={`switch-${taskId}`} checked={checked} onChange={handleOnChange}/>
    </Wrap>
  )
}

export default ToggleButton;

const Wrap = styled.div`
  input[type=checkbox]{
	  display: none;
  }

  label {
    display: block;
    position: relative;
    width: 30px;
    height: 12px;
    cursor: pointer;
    text-indent: -9999px;
    background: grey;
    border-radius: 100px;

    &:after {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      width: 14px;
      height: 14px;
      background: #dedede;
      border-radius: 90px;
      transition: 0.3s;
      box-shadow: 0 0 2px black;
    }
  }

  label {
    background: red;  
    box-shadow: 0 0 2px black;

    &.checked {
      background: #1fff5a;
    }
  }
  
  label:active:after {
    width: 32px;
  }
`;