import styled from "styled-components"

const Error = () => {
  return (
    <Wrap>
      <p>We have trouble getting the data. Please try again later.</p>
    </Wrap>
  )
}

export default Error;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;