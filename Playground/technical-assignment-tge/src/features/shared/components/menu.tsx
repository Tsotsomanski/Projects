import styled from "styled-components"
import { Link } from 'react-router-dom';
import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrap>
      <div className={`container nav-container ${isOpen ? "expanded": "collapsed"}`} >
          <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>  
        <div className="logo">
          <h1>Navbar</h1>
        </div>
        <div className="menu-items">
          <li><Link to="/" onClick={() => setIsOpen(!isOpen)}>Users</Link></li>
          <li><Link to="/tasks" onClick={() => setIsOpen(!isOpen)}>Tasks</Link></li>
        </div>
      </div>
    </Wrap>
  ) 
}

export default Menu;

const Wrap = styled.div`
    width: 100%;
    box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
    
    .container {
      width: 100%;
      margin: auto;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 62px;

      &.expanded {
        .menu-items {
          transform: translateX(0);
        }

        .logo{
          display: none;
        }

        .hamburger-lines {
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

      li {
        list-style: none;
      }

      a {
        padding: 0.7rem;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.2rem;
        color: #0e2431;

        &:hover{
          font-weight: bolder;
        }
      }

      input[type=checkbox] {
        display: block;
        position: absolute;
        top: 20px;
        left: 20px;
        width: 32px;
        height: 32px;
        opacity: 0;
        cursor: pointer;
        z-index: 5;
      }

      .hamburger-lines {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 17px;
        left: 20px;
        width: 32px;
        height: 26px;
        z-index: 2;

        .line {
          display: block;
          width: 100%;
          height: 4px;
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

      .menu-items {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 105px;
        margin-left: -40px;
        padding-top: 120px;
        padding-left: 50px;
        transform: translateY(-100%);
        transition: transform 0.5s ease-in-out;
        text-align: center;
        background: silver;
        box-shadow: 0 0 12px black;
        z-index: 1;
        
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
    }
`;