import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CoursePage from "./pages/CoursePage";
import ShareCoursePage from "./pages/ShareCoursePage";
import TestPage from "./pages/TestPage";
import NewCoursePage from "./pages/NewCoursePage";
import React, { useEffect, useState } from "react";
import { isLoggedIn } from "./auth";
import MarkdownPage from "./pages/MarkdownPage.tsx";

const RedirectTo: React.FC = () => {
    const [redirectTo, setRedirectTo] = useState<string | null>(null);
  
    useEffect(() => {
      if (isLoggedIn()) {
        setRedirectTo('/courses');
      } else {
        setRedirectTo('/sign-in');
      }
    }, []);
  
    return redirectTo ? <Navigate to={redirectTo} /> : null;
  };

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RedirectTo />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/courses" element={<HomePage />}>
                    <Route path="courses/:courses_number" element={<HomePage />}>
                        <Route path=":course_name" element={<HomePage />}>
                            <Route path=":course_year" element={<HomePage />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="courses/create" element={<NewCoursePage />} />
                <Route path="/courseEditionView" element={<CoursePage />} />
                <Route path="/courseEditionView/:course_id/share" element={<ShareCoursePage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/markdown" element={<MarkdownPage />} />
                <Route path="*" element={<NoMatchPage />} />
            </Routes>
        </Router>
    );
}

export default App;
