import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayouy";
import "./App.css";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetailsPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;
