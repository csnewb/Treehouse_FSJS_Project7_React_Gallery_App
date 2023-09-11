
import "../css/index.css"
import {Route, Routes} from "react-router-dom";
import Computers from "./Computers";
import Home from "./Home";
import Search from "./Search";
import Cats from "./Cats";
import Dogs from "./Dogs";
import Error404 from "./Error404";
import Nav from "./Nav";
import SearchForm from "./SearchForm";


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
