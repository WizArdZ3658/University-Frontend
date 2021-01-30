import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className="site-header">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">   
                        <a className="navbar-brand mr-4">University</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarToggle">
                            <div className="navbar-nav mr-auto">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/chart" className="nav-item nav-link">Chart</Link>
                            </div>

                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;