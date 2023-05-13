import Cards from "./components/Cards";
import Header from "./components/layout/Header";
import {Route,Routes} from "react-router-dom"
import AddMovie from "./components/AddMovie.js"
import Detail from './components/Detail.js'
import { createContext,useState } from "react";
import Login from "./components/Login.js"
import Signup from "./components/Signup.js"
import Footer from "./components/layout/Footer";
import About from "./components/layout/About";
import NotFound from "./components/layout/NotFound";
const Appstate=createContext();

function App() {
  const [login,setLogin]=useState(false);
  const [userName,setUserName]=useState("");

  return (
    <Appstate.Provider value={{login,userName,setLogin,setUserName}}>

    <div className="App">
    <Header/>
    <Routes>
      <Route path="/" element={<Cards/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>
    <Footer/>
    </div>
    </Appstate.Provider> 
  );
}

export default App;
export {Appstate};
