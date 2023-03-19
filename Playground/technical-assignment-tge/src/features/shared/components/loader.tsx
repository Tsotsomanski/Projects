import styled from "styled-components"

const Loader = () => {
  return (
    <Wrap>
      <p>Loading</p>
      <div className="dot-stretching"></div>
    </Wrap>
  )
}

export default Loader;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    padding-right: 25px;
  }


  @keyframes dot-stretching {
    0% {
      transform: scale(1.25, 1.25);
    }
    50%, 60% {
      transform: scale(0.8, 0.8);
    }
    100% {
      transform: scale(1.25, 1.25);
    }
  }

  @keyframes dot-stretching-before {
    0% {
      transform: translate(0) scale(0.7, 0.7);
    }
    50%, 60% {
      transform: translate(-25px) scale(1, 1);
    }
    100% {
      transform: translate(0) scale(0.7, 0.7);
    }
  }

  @keyframes dot-stretching-after {
    0% {
      transform: translate(0) scale(0.7, 0.7);
    }
    55%, 60% {
      transform: translate(25px) scale(1, 1);
    }
    100% {
      transform: translate(0px) scale(0.7, 0.7);
    }
  }

  .dot-stretching {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    transform: scale(1.25, 1.25);
    animation: dot-stretching 2s infinite ease-in;

    &:before, :after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
    }

    &:before {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
      animation: dot-stretching-before 2s infinite ease-in;
    }

    &:after {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
      animation: dot-stretching-after 2s infinite ease-in;
    }
  }
`