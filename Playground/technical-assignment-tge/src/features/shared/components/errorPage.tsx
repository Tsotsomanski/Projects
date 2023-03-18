import { useRouteError } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Wrap id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`