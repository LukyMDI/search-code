import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import AddPage from "./pages/AddPage/AddPage";
import SearchPage from "./pages/searchPage/SearchPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />} exact />
                <Route path="/addProduct" element={<AddPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
