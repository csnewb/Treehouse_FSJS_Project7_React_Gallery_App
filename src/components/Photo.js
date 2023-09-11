import React from 'react';


function Photo({image}) {
    const { id, secret, server } = image;
    const imageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    return (
        <li>
            <img src={imageUrl} alt=""/>
        </li>
    )
}

export default Photo;