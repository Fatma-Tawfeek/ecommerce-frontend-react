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

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;
