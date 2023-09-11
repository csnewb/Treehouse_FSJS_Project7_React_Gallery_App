import React from 'react';
import {useParams} from "react-router-dom";
import PhotoContainer from "./PhotoContainer";


function Search() {
    let params = useParams();
    let term = params.term


    return (
        <>
            <h2>Results for Search Term: {term}</h2>
            <PhotoContainer term={term}/>
        </>
    )
}

export default Search;