import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../client/NavBar.css'

function Navbar({logout, user}) {
  let navigate = useNavigate()

  return (
    
    <nav className="navbar">
    <ul>
      <li>
      {window.location.pathname  == "/" ? 
        <a><div className="noItem"></div></a>
         :       
        // <div className='back-button'>
        //         <button onClick={() => navigate(-1)}>&laquo; terug</button> 
        // </div>
        <a>
            <div className="item">
            <img src='Images/back-button.png' onClick={() => navigate(-1)}/>
          </div>
        </a>
      } 
      </li>
      <li>
        <Link to="/">
        <div className="item">
          <img src='Images/home.png'/>
        </div>
        </Link>
      </li>
      <li>
        <Link to="/ReceptenGeschiedenisPage">
        <div className="item">
          <img src='Images/history2.png'/>
        </div>
        </Link>
      </li>
      <li>
        <Link to="/GroepsInstellingenPage">
        <div className="item">
          <img src='Images/people.png'/>
        </div>
        </Link>
      </li>
      <li>
        <Link >
        <div className="itemRight" onClick={logout}>
          <img src='Images/logout.png'/>
        </div>
        </Link>
      </li>
    </ul>
  </nav>
  );
}

export default Navbar;
