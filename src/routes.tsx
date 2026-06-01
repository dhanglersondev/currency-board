
import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/Home"
import Layout from "./components/Layout"
import { NotFound } from "./pages/NotFound"
import { Coin } from "./pages/Coin"

const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: "/",
            element: <Home />
         },
         {
            path: "/coin/:id",
            element: <Coin />
         },
         {
            path: "*",
            element: <NotFound />
         }
      ]
   }
])

export { router }