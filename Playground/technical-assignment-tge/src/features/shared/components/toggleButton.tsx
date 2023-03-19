import { useState } from "react";
import styled from "styled-components";

interface IToggleButtonProps {
  isChecked: boolean;
  handleChange: any;
  taskIndex: number;
}

const ToggleButton = ({isChecked, taskIndex, handleChange}: IToggleButtonProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleOnChange = () => {
    setChecked(!checked);
    handleChange(!checked, taskIndex);
  }

  return (
    <Wrap>
      <label className={isChecked ? "checked" : ""} htmlFor={`switch-${taskIndex}`}>Toggle</label>
      <input type="checkbox" id={`switch-${taskIndex}`} checked={checked} onChange={handleOnChange}/>
    </Wrap>
  )
}

export default ToggleButton;

const Wrap = styled.div`
  input[type=checkbox]{
	  display: block;
  }

  label {
    display: block;
    position: relative;
    width: 40px;
    height: 20px;
    cursor: pointer;
    text-indent: -9999px;
    background: grey;
    border-radius: 100px;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 5px;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 90px;
      transition: 0.3s;
    }
  }

  label {
    background: red;  

    &.checked {
      background: #bada55;
    }
  }
  
  input:checked+label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 60px;
  }
`;