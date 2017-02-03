import React, { Component } from 'react';
import icon from './img/bus-icon-trans.png';

class Navbar extends Component {
 render() {
   return (
     <nav className="navbar navbar-inverse navbar-static-top">
       <div className="container-fluid">
         <div className="navbar-header">
           <a className="navbar-brand" href={`/`}>Metro Trip Advisor</a>
         </div>
         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
           <ul className="nav navbar-nav">
             <li><a href={`/login`}>Login or Signup <span className="sr-only">(current)</span></a></li>
             <li><a href="#">Recent</a></li>
           </ul>
           <ul className="nav navbar-nav navbar-right">
             <img src={icon}/>
           </ul>
           <p>{this.props.username} </p>
         </div>
       </div>
     </nav>
   );
 }
}


export default Navbar;
