import React, {useEffect, useState} from 'react';
import axios from "axios";
import apiKey from "../config";
import Photo from "./Photo";
import NotFound from "./NotFound";


function PhotoContainer({ term }) {

    const [images, setImages] = useState([]);
    const [foundFlag, setFoundFlag] = useState(true);

    useEffect(() => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%27${term}%27&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                // handle success
                const photos = response.data.photos.photo;
                setImages(photos)
                if (photos.length === 0) {
                    setFoundFlag(false);
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }, [term]);

    return (
        <div className="photo-container">
            <ul>
                {images.length > 0 ?
                    images.map(image => (
                        <Photo key={image.id} image={image} />
                    ))
                    : null}

                {foundFlag ? null : <NotFound />}

            </ul>
        </div>
    )
}


export default PhotoContainer;