import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const router = createBrowserRouter([
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
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
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