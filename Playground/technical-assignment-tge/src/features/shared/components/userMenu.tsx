import styled from "styled-components"
import { Link } from 'react-router-dom';

const UserMenu = () => {

  return (
    <Wrap className="navbar">
        <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>  
          <div className="logo">
            <h1>Navbar</h1>
          </div>
          <div className="menu-items">
            <li><Link to="/">Users</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
          </div>
        </div>
      </Wrap>
  )
}

export default UserMenu;

const Wrap = styled.div`
  &.navbar {
    width: 100%;
    box-shadow: 0 1px 4px rgb(146 161 176 / 15%);

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 62px;

      li {
        list-style: none;
      }

      a {
        text-decoration: none;
        color: #0e2431;
        font-weight: 500;
        font-size: 1.2rem;
        padding: 0.7rem;

        &:hover{
          font-weight: bolder;
        }
      }

      .checkbox {
        position: absolute;
        display: block;
        height: 32px;
        width: 32px;
        top: 20px;
        left: 20px;
        z-index: 5;
        opacity: 0;
        cursor: pointer;
      }

      .hamburger-lines {
        display: block;
        height: 26px;
        width: 32px;
        position: absolute;
        top: 17px;
        left: 20px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .line {
          display: block;
          height: 4px;
          width: 100%;
          border-radius: 10px;
          background: #0e2431;
        }

        .line1 {
          transform-origin: 0% 0%;
          transition: transform 0.4s ease-in-out;
        }

        .line2 {
          transition: transform 0.2s ease-in-out;
        }

        .line3 {
          transform-origin: 0% 100%;
          transition: transform 0.4s ease-in-out;
        }
      }
    }

    .menu-items {
      padding-top: 120px;
      box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
      height: 105px;
      width: 100%;
      transform: translateY(-100%);
      display: flex;
      flex-direction: column;
      margin-left: -40px;
      padding-left: 50px;
      transition: transform 0.5s ease-in-out;
      text-align: center;
      background: silver;
      box-shadow: 0 0 12px black;

      li {
        margin-bottom: 1.2rem;
        font-size: 1.5rem;
        font-weight: 500;
      }
    }

    .logo {
      position: absolute;
      top: 0;
      right: 15px;
      font-size: 1.2rem;
      color: #0e2431;

      h1 {
        margin: 5px;
      }
    }

    .nav-container input[type="checkbox"]:checked ~ .menu-items {
      transform: translateX(0);
    }

    .nav-container input[type="checkbox"]:checked ~ .logo{
      display: none;
    }

    .nav-container input[type="checkbox"]:checked ~ .hamburger-lines {
      .line1 {
        transform: rotate(45deg);
      }

      .line2 {
        transform: scaleY(0);
      }

      .line3 {
        transform: rotate(-45deg);
      }
    }
  }

  .container {
    width: 100%;
    margin: auto;
  }
`;