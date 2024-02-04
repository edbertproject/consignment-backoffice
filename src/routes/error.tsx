import ErrorLayout from "../layouts/Error";
import Error404 from "../pages/Error/404";


const errorRoutes = [
    {
        path: '*',
        element: <ErrorLayout />,
        children: [
            { path: '*', element: <Error404 /> },
        ]
    }
]

export default errorRoutes;
