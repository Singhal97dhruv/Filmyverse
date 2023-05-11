import Cards from "./components/Cards";
import Header from "./components/layout/Header";
import {Route,Routes} from "react-router-dom"
import AddMovie from "./components/AddMovie.js"
import Detail from './components/Detail.js'
import { createContext,useState } from "react";
import Login from "./components/Login.js"
import Signup from "./components/Signup.js"

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

    </Routes>
    </div>
    </Appstate.Provider> 
  );
}

export default App;
export {Appstate};
