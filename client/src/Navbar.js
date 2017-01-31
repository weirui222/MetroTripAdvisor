import React, { Component } from 'react';

class Navbar extends Component {
 render() {
   return (
     <nav className="navbar navbar-default">
       <div className="container-fluid">
         <div className="navbar-header">
           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"  aria-expanded="false">
             <span className="sr-only">Toggle navigation</span>
             <span className="icon-bar"></span>
             <span className="icon-bar"></span>
             <span className="icon-bar"></span>
           </button>
           <a className="navbar-brand" href={`/`}>Metro Trip Advisor</a>
         </div>

         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
           <ul className="nav navbar-nav">
             <li><a href={`/login`}>Login or Signup <span className="sr-only">(current)</span></a></li>
             <li><a href="#">Info</a></li>
             <li><a href="#">Nearby</a></li>
           </ul>
           <form className="navbar-form navbar-left">
             <div className="form-group">
               <input type="text" className="form-control search-query span2" placeholder=" Search Puget Sound&hellip;" />
             </div>
             <button type="submit" className="btn btn-default">Submit</button>
           </form>
           <ul className="nav navbar-nav navbar-right">
             <li><a href="#">Recent</a></li>
             <li><a href="#">Bookmarks</a></li>
           </ul>
         </div>
       </div>
     </nav>
   );
 }
}


export default Navbar;
