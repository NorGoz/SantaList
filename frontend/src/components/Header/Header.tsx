import React from "react";
import {NavLink} from "react-router-dom";
import './header.css'

export const Header = () => <div className='header'>
    Menu : <NavLink
    className='header__link'
    to={'/gift'}>Gift</NavLink> | <NavLink
    className='header__link'
    to={'/child'}>Child</NavLink>
</div>
