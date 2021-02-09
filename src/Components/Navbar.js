import React from 'react'
import './Navbar.css'
import { IoIosDesktop, IoIosPhonePortrait, IoIosTabletPortrait, IoIosOptions, IoMdMoon } from "react-icons/io";

const Navbar = (props) => {

    const iconDevice = () => {
        if (props.deviceType === 1) {
            return <IoIosDesktop className="svg-icon navSvg" onClick={() => { props.setDeviceType(props.deviceType + 1) }} />;
        } else if (props.deviceType === 2) {
            return <IoIosPhonePortrait className="svg-icon navSvg" onClick={() => { props.setDeviceType(1) }} />;
        }
    }

    return (
        <div className="mainDiv">
            <span><a href="/">Wallpapers</a></span>
            <div className="links">

                {iconDevice()}

                <IoIosOptions className="svg-icon navSvg" />

                <IoMdMoon className="svg-icon navSvg" />
            </div>
        </div>
    )
}

export default Navbar;