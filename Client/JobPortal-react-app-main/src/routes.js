import { createBrowserRouter } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
import App from "./App";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import JobList from "./components/JobList/JobList";
import AddJob from './components/AddJob/AddJob';
import ApplicationList from './components/ApplicationList/ApplicationList';
import RecruiterAppList from './components/RecruiterAppList/RecruiterAppList';
import RecruiterJobList from './components/RecruiterJobList/RecruiterJobList';
import JobseekerProfile from './components/JobseekerProfile/JobseekerProfile';
import JobseekerUpdateProfile from './components/JobseekerUpdateProfile/JobseekerUpdateProfile';
import RecruiterProfile from './components/RecruiterProfile/RecruiterProfile';
import EditRecruiterProfile from './components/EditRecruiterProfile/EditRecruiterProfile';
import AdminController from './components/AdminController/AdminController';
import JobseekerAppliedApplicationList from "./components/JobseekerAppliedApplicationList/JobseekerAppliedApplicationList";
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorComponent />,
        children: [
            {
                path: "/",
                element: <Home />
               
            },
            {
                path: "/signIn",
                element: <SignIn />
            },
            {
                path: "/signUp",
                element: <SignUp />
            },
            {
                path: "/jobList",
                element: <JobList />
            },
            {
                path: "/postJob",
                element: <AddJob />
            },
            {
                path: "/ApplicationList",
                element: <ApplicationList />
            },
            {
                path: "/RecruiterappList/:jobId",
                element: <RecruiterAppList />
            },
            {
                path: "/RecruiterJobList",
                element: <RecruiterJobList />
            },
            {
                path: "/JobseekerProfile",
                element: <JobseekerProfile />
            },
            {
                path: "/JobseekerUpdateProfile",
                element: <JobseekerUpdateProfile />
            },
            {
                path: "/myJobs",
                element: <JobseekerAppliedApplicationList />
            },
            {
                path: "/RecruiterProfile",
                element: <RecruiterProfile />
            },
            {
                path: "/EditRecruiterProfile",
                element: <EditRecruiterProfile />
            },
            {
                path: "/AdminController",
                element: <AdminController />
            }
        ]
    }
])
export default appRouter;