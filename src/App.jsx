import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayouy";
import "./App.css";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                {/* <Route index element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route
                    path="/jobs/:id"
                    element={<JobPage deleteJob={deleteJob} />}
                    loader={jobLoader}
                />
                <Route
                    path="/edit-job/:id"
                    element={<EditJobPage updateJobSubmit={updateJob} />}
                    loader={jobLoader}
                />
                <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />

                <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;
