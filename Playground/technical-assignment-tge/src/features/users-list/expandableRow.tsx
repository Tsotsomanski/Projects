import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { UserData } from './interfaces.ts/common';

const MANDATORY_FIELDS = ["username", "email", "address.street", "address.suite", "address.city"];

const ExpandableRow = ({userInfo}: any) => {
  const [actionBtnsDisabled, setActionBtnsDisabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sections, setSections]: any = useState({});
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    isExpanded && setSections(extractUserInfoSectionsRecursive(userInfo));
  }, [isExpanded, userInfo]);

  const onSubmit = (data: Record<string, string>): void => {
    !actionBtnsDisabled && console.log(data);
  }

  const handleRevert = (): void => {
    reset();
    setActionBtnsDisabled(true);
  }

  const renderSectionItems = (items: Record<string, string>, section: string): Array<JSX.Element> => Object.keys(items)
    .map((key: string) => {
      const isGeneralSection: boolean = section === "general";
      const isRequired: boolean = isGeneralSection ?
      !!MANDATORY_FIELDS.find(fieldKey => fieldKey === key) :
      MANDATORY_FIELDS.includes(`${section}.${key}`);

      return (<ItemWrap key={key}>
        <label>{key}</label>
        {key === "id" ? <span>{items[key]}</span> : <>
          <input defaultValue={items[key]} {...register(key, { required: isRequired })} />
          {errors[key] && <span className="error-msg">This field is required</span>}
        </>}
        
      </ItemWrap>)
    });

  return (
    <Wrap>
      <Header onClick={() => setIsExpanded(!isExpanded)}>
        <p>{userInfo.name}</p>

        <HeaderRightSide>
        <p>{userInfo.email}</p>
        <p className={`arrow-${isExpanded ? "up" : "down"}`} />
      </HeaderRightSide>
      </Header>

      <Body className={isExpanded ? "expanded" : "collapsed"}>
        <SeePostsBtn onClick={() => navigate("/posts")}>See posts</SeePostsBtn>
        <form
          onSubmit={handleSubmit(onSubmit)} 
          onChange={() => setActionBtnsDisabled(false)}
        >
          {sections && Object.keys(sections).map(section => {

            return (
              <div key={section}>
                {section !== "general" && <h3>{section}</h3>}
                <InnerWrap>{renderSectionItems(sections[section], section)}</InnerWrap>
              </div>)
          })}

          <ActionButtons className={actionBtnsDisabled ? "disabled" : ""}>
            <div>
              <span onClick={() => !actionBtnsDisabled && setIsExpanded(false)}>Cancel</span>/
              <span onClick={() => !actionBtnsDisabled && handleRevert()}>Revert</span>
            </div>
            <input type="submit" disabled={actionBtnsDisabled}/>
          </ActionButtons>
        </form>
      </Body>
    </Wrap>
  )
}

function extractUserInfoSectionsRecursive(userInfo: any, section?: string, nextResult?: any) {
  let result: any = nextResult || {};

  Object.keys(userInfo).map((key: string) => {
    const currentRowValue: string | Record<string, string> = userInfo[key];

    if (typeof currentRowValue === "object") {
      return extractUserInfoSectionsRecursive(currentRowValue, key, result);
    } else {
      if (section) {
        result[section] = {
          ...result[section],
          [key]: currentRowValue
        }
      } else {
        result["general"] = {
          ...result["general"],
          [key]: currentRowValue
        }
      }
    }

    return result;
  });

  return result;
};

export default ExpandableRow;

const Wrap = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  cursor: pointer;

  p:first-child {
    padding-left: 30px;
  }

  .arrow-up, .arrow-down {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top: 0;
    border-bottom: 10px solid rgba(0,0,0,0.15);
    margin-right: 30px;
    margin-left: 30px;
  }

  .arrow-down {
    transform: scaleY(-1);
  }
`;

const HeaderRightSide = styled.div`
  display: flex;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;

  &.collapsed {
    height: 0;
    transition: height 0.1s ease-out;
    visibility: hidden;
  }

  &.expanded {
    height: auto;
    max-height: 500px;
    transition: max-height 0.1s ease-in;
    background-color: #e8e8e8;
  }

  h3 {
    text-align: left;
    margin-left: 20px;
    text-transform: capitalize;
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 0;
  }

  input[type=submit] {
    height: 40px;
    border-radius: 5px;
    background-color: white;
    font-family: inherit;
    border: 0.4px solid black;
    margin-bottom: 10px;
    cursor: pointer;
    border: none;

    &:active {
      box-shadow: 0 0 3px black;
      text-shadow: 0 0 1px black;
      border: none;
    }

    &:disabled {
      box-shadow: none;
      text-shadow: none;
      cursor: default;
    }
  }
`;

const InnerWrap = styled.div`
  display: flex;
  padding-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
  margin-right: 20px;

  label {
    text-transform: capitalize;
    font-style: italic;
    margin-bottom: 10px;
  }

  .error-msg {
    color: red;
    font-size: 12px;
  }
`;

const ActionButtons = styled.div`
  font-size: 14px;
  user-select: none;

  div {
    margin-bottom: 10px;
  }

  &.disabled, &.disabled span:hover {
    color: silver;
    cursor: default;
  }

  span:hover {
    color: red;
    cursor: pointer;
  }
`

const SeePostsBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 20px;
    bottom: 50px;
    width: 150px;
    height: 50px;
    color: green;
    font-family: cursive;
    border-radius: 50px;
    background-color: white;
    cursor: pointer;

    &:hover {
      color: white;
      background-color: green;
    }
`;