import Layout from "./pages/layout";
import Home from './pages/home';
import Projects from './pages/projects';
import About from './pages/about';
import Contact from './pages/contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function PageRoute() {
    return (<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Projects" element={<Projects />} />
            <Route path="About" element={<About />} />
            <Route path="Contact" element={<Contact />} />    
          </Route>
        </Routes>
    </BrowserRouter>)
}
export default PageRoute;