import styled from "styled-components";

const ConfirmationPopUp = ({checkIfConfirmed}: any) => {
  return (<Wrap>
    <div>
      <p>Are you sure that you want to delete that post ?</p>
      <section>
        <span onClick={() => checkIfConfirmed(true)}>Yes</span>
        <span onClick={() => checkIfConfirmed(false)}>No</span>
      </section>
    </div>
  </Wrap>)
}

export default ConfirmationPopUp

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  &>div {
    width: 350px;
    height: 120px;
    background-color: white;
    border-radius: 10px;

    p {
      text-align: center;
    }
    
    section {
      display: flex;
      justify-content: center;
      
      span {
        box-shadow: 0 0 5px black;
        border-radius: 10px;
        padding: 5px 15px;
        cursor: pointer;

        &:hover {
          box-shadow: inset 0 0 5px black;
        }
      }

      span:first-child {
        margin-right: 20px;
      }
    }
  }
`;