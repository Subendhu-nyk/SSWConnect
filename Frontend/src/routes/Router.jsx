import { Suspense, lazy, useEffect } from "react"

import routesConfig from "./routesConfig"
import ProtectedRoute from "./ProtectedRoute"
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";


const MainLayout = lazy(() => import("../layouts/MainLayout"));


const Router = () => {
  return (
    <div>Router</div>
  )
}

export default Router