import { createBrowserRouter } from "react-router-dom";
import { Portfolio } from "./pages/Portfolio";

export const router = createBrowserRouter([
    {
        id: "Test",
        path: "/",
        element: <Portfolio />
    }
])