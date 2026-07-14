import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Add from "./pages/Add";
import SingleRecipe from "./pages/SingleRecipe";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/recipes" element={<Recipes />}/>
        <Route path="/recipes/:_id" element={<SingleRecipe />}/>   
        <Route path="/add" element={<Add />}/>        
      </Routes>
    </BrowserRouter>
  )
}