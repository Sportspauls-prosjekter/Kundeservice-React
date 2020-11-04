import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Style/navbar.css';

export default class NavBar extends Component {
    render() {
        return (
            
            <div id="navbar">
                <Link to="/">
                    <img
                        src="/Bilder/logo.svg"
                        alt="NOR-WAY sin logo. NOR i bold rødt og WAY i bold kursiv blått.
        De to ordene skilles av en rød prikk" />
                </Link>
                <ul>
                    <li><Link to="/kontakt"> Kontakt oss</Link></li>
                </ul>   
                </div>
            
        );
    }
}