import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./adminRoute";
import customerRoute from "./customerRoute";

const router = createBrowserRouter([
    ...adminRoutes,
    ...customerRoute
]);

export default router;
