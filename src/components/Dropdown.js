import React, { useState } from 'react';
import { LinearLists } from './List/LinearLists';
import { RootsLists } from './List/RootsLists';
import { InterpolationLists } from './List/InterpolationLists';
import { RegressionLists } from './List/RegressionLists';
import { Link } from 'react-router-dom';
import './Dropdown.css'

function Dropdown(props){

    const [click, setClick] = useState(false)

    var Menu;

    if(props.name == "Linear"){
        Menu = LinearLists;
    }

    else if(props.name == "Roots"){
        Menu = RootsLists;
    }

    else if(props.name == "Interpolation"){
        Menu = InterpolationLists;
    }

    else if(props.name == "Regression"){
        Menu = RegressionLists;
    }

    const handleClick = () => {
        setClick(!click)
        console.log(click)
    }

    const Click = () => {
        setClick(false)
    }

    return (
        <>
            <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
                {Menu.map((item,index) => {
                    return(
                        <li key={index}>
                            <Link className={item.cName} to={item.path} onClick={Click}>
                                {item.title}    
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default Dropdown;