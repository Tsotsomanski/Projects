import styled from "styled-components";

const ExpandableRow = ({userInfo}: any) => {
  console.log(userInfo);

  return <Wrap>
    <Header>
      <p>{userInfo.name}</p>
      <p>{userInfo.email}</p>
    </Header>
  </Wrap>
}

export default ExpandableRow;

const Wrap = styled.div`
  display: flex;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;