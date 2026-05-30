import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/detail/:cripto",
                element: <Detail />
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    }
])

export { router }