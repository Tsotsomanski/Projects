import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ExpandableRow = ({userInfo}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [sections, setSections]: any = useState({});

  useEffect(() => {
    isExpanded && setSections(extractUserInfoSectionsRecursive(userInfo));
  }, [isExpanded, userInfo]);

  // const onSubmit = (data: any) => console.log(data);

  const renderSectionItems = (items: any): any => Object.keys(items)
    .map(key => {
      return (<ItemWrap key={key}>
        <label>{key}</label>
        <input defaultValue={items[key]} {...register(key)} />
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
        { sections && Object.keys(sections).map(section => {
          return (
            <SectionWrap>
              <h3>{section}</h3>
              <InnerWrap>{renderSectionItems(sections[section])}</InnerWrap>
            </SectionWrap>)
        })}

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          {/* register your input into the hook by invoking the "register" function */}
          {/* <input defaultValue="test" {...register("example")} /> */}

          {/* include validation with required or other standard HTML validation rules */}
          {/* <input {...register("exampleRequired", { required: true })} /> */}
          {/* errors will return when field validation fails  */}
          {/* {errors.exampleRequired && <span>This field is required</span>} */}

          {/* <input type="submit" /> */}
        {/* </form> */}
      </Body>
    </Wrap>
  )
}

function extractUserInfoSectionsRecursive(userInfo: any, section?: string, nextResult?: any) {
  let result: any = nextResult || {};

  Object.keys(userInfo).map((key: string) => {
    const currentRowValue = userInfo[key];

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
  }

`;

const SectionWrap = styled.div`

`;

const InnerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
`;