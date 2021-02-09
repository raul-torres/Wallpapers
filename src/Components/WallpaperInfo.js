import React, { useRef, useState } from 'react';
import './WallpaperInfo.css';
import { IoInformationCircleOutline, IoCloudDownloadOutline, IoCloseSharp } from "react-icons/io5";
// import { useSpring, animated } from 'react-spring';
import { Tooltip } from '@material-ui/core';


export const WallpaperInfo = ({ props, showModal, setShowModal }) => {
    const modalRef = useRef();
    const scrollRef = useRef(null);
    const [openInfo, setOpenInfo] = useState(false);

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
            setOpenInfo(false)
        }
    }

    // Causing Browser to download image
    const download = e => {
        console.log(e);
        fetch(e, {
            method: "GET",
            headers: {},
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "Wallpaper.jpg");
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Converting UNIX time to DateTime
    const UnixToDateTime = () => {
        var d = new Date(props.created_utc * 1000),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        time = mm + '/' + dd + '/' + yyyy + ' - ' + h + ':' + min + ' ' + ampm;
        return time;
    }


    return (
        <>
            {showModal ? (
                <div className="background" ref={modalRef} onClick={closeModal}>
                    <div className="centerBlock">
                        <img src={props.url} alt="Full Definition Reddit Wallpaper"></img>
                        <div className="imageIcons">
                            <a href={props.url} download onClick={() => download(props.url)} target="blank">
                                <IoCloudDownloadOutline />
                            </a>
                            <IoInformationCircleOutline onClick={() => (setOpenInfo(true))} />
                            <IoCloseSharp onClick={() => (setShowModal(false))} />
                        </div>
                        {openInfo ? (
                            <div className="wallpaperInfoContainer">
                                <div className="wallpaperInfo" ref={scrollRef}>
                                    <IoCloseSharp className="exitInfo" onClick={() => (setOpenInfo(false))} />
                                    <span className="title">{props.title}</span>
                                    <hr />
                                    <p className="author">Posted by, <a href={"https://www.reddit.com/user/" + props.author} target="blank">r/{props.author}</a></p>
                                    <p className="author">SubReddit, <a href={"https://www.reddit.com/r/" + props.subreddit} >r/{props.subreddit}</a> </p>
                                    <p className="time">{UnixToDateTime()}</p>
                                    <svg className="svg-icon" viewBox="0 0 20 20">
                                        <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                                    </svg>
                                    <span className="ups">{props.ups}</span>
                                    <br />
                                    <div className="awardsWrapper">
                                        {
                                            props.all_awardings.map((award, i) => (
                                                <Tooltip title={award.description}>
                                                    <img src={award.icon_url} alt="Award" key={i} />
                                                </Tooltip>
                                            )
                                            )
                                        }
                                    </div>
                                </div>

                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    )
}