import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

export default function Navbar() {

    const [click, setClick] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
    const [dropdown3, setDropdown3] = useState(false);
    const [dropdown4, setDropdown4] = useState(false);

    const handleClick = () => setClick(!click);

    const onMouseEnter1 = () => setDropdown(true);
    const onMouseLeave1 = () => setDropdown(false);

    const onMouseEnter2 = () => setDropdown2(true);
    const onMouseLeave2 = () => setDropdown2(false);

    const onMouseEnter3 = () => setDropdown3(true);
    const onMouseLeave3 = () => setDropdown3(false);

    const onMouseEnter4 = () => setDropdown4(true);
    const onMouseLeave4 = () => setDropdown4(false);

    return (
        <>
           <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    Numerical Method
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item' onMouseEnter={onMouseEnter1} onMouseLeave={onMouseLeave1}>
                        <div className="nav-links">
                            Roots of Equations <i className='fas fa-caret-down'/>
                        </div>
                        {dropdown && <Dropdown name="Roots"/>}
                    </li>
                    <li className='nav-item' onMouseEnter={onMouseEnter2} onMouseLeave={onMouseLeave2}>
                        <div className="nav-links" >
                            Linear Algebraic <i className='fas fa-caret-down'/>
                        </div>
                        {dropdown2 && <Dropdown name="Linear"/>}
                    </li>
                    <li className='nav-item' onMouseEnter={onMouseEnter3} onMouseLeave={onMouseLeave3}>
                        <div className="nav-links" >
                            Interpolation & Extrapolation <i className='fas fa-caret-down'/>
                        </div>
                        {dropdown3 && <Dropdown name="Interpolation"/>}
                    </li>
                    <li className='nav-item' onMouseEnter={onMouseEnter4} onMouseLeave={onMouseLeave4}>
                        <div className="nav-links" >
                        Least-Squares Regression <i className='fas fa-caret-down'/>
                        </div>
                        {dropdown4 && <Dropdown name="Regression"/>}
                    </li>
                </ul>   
            </nav> 
        </>
    )
}
