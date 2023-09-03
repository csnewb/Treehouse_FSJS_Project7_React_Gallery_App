import logo from './logo.svg';
import "./css/index.css"
import {Route, Routes, Link, NavLink, useParams, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react"
import axios from "axios"
import apiKey from "./config";


//App components


function Nav() {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to='cats'>Cats</NavLink></li>
                <li><NavLink to='dogs'>Dogs</NavLink></li>
                <li><NavLink to='computers'>Computers</NavLink></li>
            </ul>
        </nav>
    )
}

function PhotoContainer({term}) {

    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%27${term}%27&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                // handle success
                const photos = response.data.photos.photo;
                setImages(photos)

            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }, [term]);


    return (
        <div className="photo-container">
            <ul>
                {images.length > 0 ? (
                    images.map(image => (
                    <Photo key={image.id} image={image}/>
                ))

                ) : (
                    <NotFound/>
                )}
            </ul>
        </div>
    )
}

function Photo({image}) {
    const { id, title, secret, server, farm } = image;
    const imageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
    return (
        <li>
            <img src={imageUrl} alt=""/>
        </li>
    )
}

function SearchForm() {
    const term = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let searchTerm = term.current.value;
        let path = `/search/${searchTerm}`
        navigate(path)

        // Clear the input field
        term.current.value = '';
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="search" name="search" placeholder="Search" required ref={term}/>
            <button type="submit" className="search-button">
                <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </button>
        </form>
    )
}

function NotFound() {
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>You search did not return any results. Please try again.</p>
        </li>
    )
}

function Home() {
    return (
        <>
            <h2>Home Page:</h2>
            <PhotoContainer term="home"/>
        </>
    )
}

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

function Cats() {
    return (
        <>
            <h2>Results for Search Term: Cats</h2>
            <PhotoContainer term="cats"/>
        </>
    )
}

function Dogs() {
    return (
        <>
            <h2>Results for Search Term: Dogs</h2>
            <PhotoContainer term="dogs"/>
        </>
    )
}

function Computers() {
    return (
        <>
            <h2>Results for Search Term: Computers</h2>


            <PhotoContainer term="computers"/>
        </>
    )
}


function Error404() {
    return (
        <>
            <h2>Error: 404</h2>
            <h2> Oops! It looks like the page you are looking for cannot be found.</h2>
            <p>Please check your spelling and try again.</p>


        </>
    )
}

function App() {


    return (
        <div className="App">
            <SearchForm/>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search/:term" element={<Search/>}/>
                <Route path="/cats" element={<Cats/>}/>
                <Route path="/dogs" element={<Dogs/>}/>
                <Route path="/computers" element={<Computers/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>


        </div>
    );
}

export default App;
