import React from 'react'

const Navbar = () => {
    return (
        // proloader
        <nav className="navbar navbar-light bg-light px-3 pb-2" id="navBar">
             <a class="navbar-brand" href="/">
                capcomputer.
                </a>
                <button className="navbar-toggler" type="button" data-toggle='collapse' data-target="#myNav">
                <span className="navbar-icon">
                    <i className="fas fa-bars"></i>
                </span>
                </button>
                <div className="collapse navbar-collapse" id="myNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <a href="/" className="nav-link">
                                Home
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a href="" className="nav-link">
                                Home
                            </a>
                        </li>
                    </ul>
                </div>
        </nav>
    )
}


export default Navbar;
