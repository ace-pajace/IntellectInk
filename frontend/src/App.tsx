import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SubjectPage from "./pages/SubjectPage";
import ShareSubjectPage from "./pages/ShareSubjectPage";
import TestPage from "./pages/TestPage";
import NewSubjectPage from "./pages/NewSubjectPage";
import MarkdownPage from "./pages/MarkdownPage";

const router = createBrowserRouter([
    {
        path: "/test",
        element: <TestPage />,
    },
    {
        path: "/subjects",
        element: <HomePage />,
        children: [
            {
                path: "semesters/:semester_number",
                element: <HomePage />,
                children: [
                    {
                        path: ":subject_name",
                        element: <HomePage />,
                        children: [
                            {
                                path: ":subject_year",
                                element: <HomePage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "subjects/create",
        element: <NewSubjectPage />,
    },
    {
        path: "/sign-in",
        element: <SignInPage />,
    },
    {
        path: "/sign-up",
        element: <SignUpPage />,
    },
    {
        path: "/subjectEditionView",
        element: <SubjectPage />,
    },
    {
        path: "/subjectEditionView/:subject_id/share",
        element: <ShareSubjectPage />,
    },
    {
        path: "/markdown",
        element: <MarkdownPage />,
    },
    {
        path: "*",
        element: <NoMatchPage />,
    },
]);

const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default App;

// Alternative with fixed layout on top of all pages
// <Router>
//   <Routes>
//     <Route path="/" element={<Layout />}>
//       <Route index element={<HomePage />} />
//       <Route path="sign-in" element={<SignInPage />} />
//       <Route path="sign-up" element={<SignUpPage />} />
//       <Route path="*" element={<NoMatchPage />} />
//     </Route>
//   </Routes>
// </Router>