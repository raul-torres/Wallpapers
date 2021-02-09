import React, { useState } from 'react'
import Wallpaper from './Wallpaper.js'
import PhoneWallpaper from './PhoneWallpaper.js'
import './AllWallpapers.css'


const AllWallpapers = (props) => {


    return (
        <div>
            <div className="ogDiv">
                {
                    props.posts.map((post, index) => {
                        if (post.data.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                            console.log(post);
                            if (props.deviceType === 1) {
                                return (<Wallpaper post={post.data} key={index} />)
                            } else if (props.deviceType === 2) {
                                return (<PhoneWallpaper post={post.data} key={index} />)
                            }
                        }
                        return null;
                    })
                }
            </div>
            <div className="btn-div">
                <button className="btn" onClick={props.onLoadMore}>Load More</button>
            </div>

            <p className="portfolioLink">Made by <a href="www.rauldev.com" targer="blank">Raul Torres</a></p>
        </div>
    )
};

export default AllWallpapers;