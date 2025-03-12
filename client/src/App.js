import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import ImportantDates from "./pages/ImportantDates";
import Committee from "./pages/Committee";
import VenueAccommodation from "./pages/VenueAccommodation";
import Submission from "./pages/Submission";
import { UserContext } from './UserContext'; // Import the UserProvider
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ViewAllUsers from "./sections/adminDashboard/view-all-users";
import ViewAllUserSubmissions from "./sections/adminDashboard/view-all-users-submissions";
import AddNewSubmission from "./sections/userDashboard/add-new-submission";
import ViewMySubmissions from "./sections/userDashboard/view-my-submissions";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import ViewAssignedSubmissions from "./sections/reviewerDashboard/view-assigned-submissions";
import GivePaperFeedback from "./sections/reviewerDashboard/give-paper-feedback";
import ScrollToTop from "./ScrollToTop";
import ManageAnnouncements from "./sections/adminDashboard/manage-announcements";


function App() {
	const { user, logout, isUserValid } = useContext(UserContext);

	useEffect(() => {
		try {
			if (!isUserValid()) {
				logout();
			}
		} catch (error) {
			logout();
		}
	}, []);

	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route path='/*' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/submission' element={<Submission />} />
					<Route path='/important-dates' element={<ImportantDates />} />
					<Route path='/registration' element={user ? <Home /> : <Registration />} />
					<Route path='/committee' element={<Committee />} />
					<Route path='/venue-accommodation' element={<VenueAccommodation />} />
					<Route path='/contact' element={<Contact />} />


					{/* user routes */}
					{user &&
						<>
							<Route path='/user/dashboard' element={<UserDashboard />} />
							<Route path='/user/dashboard/add-new-submission' element={<AddNewSubmission />} />
							<Route path='/user/dashboard/view-my-submissions' element={<ViewMySubmissions />} />
						</>
					}

					{user && user.role === 'reviewer' &&
						<>
							<Route path='/reviewer/dashboard' element={<ReviewerDashboard />} />
							<Route path='/reviewer/dashboard/view-assigned-submissions' element={<ViewAssignedSubmissions />} />
							<Route path='/reviewer/dashboard/give-paper-feedback' element={<GivePaperFeedback />} />
						</>
					}

					{/* admin routes */}
					{user && user.role === 'admin' &&
						<>
							<Route path='/admin/dashboard' element={<AdminDashboard />} />
							<Route path='/admin/dashboard/view-all-users' element={<ViewAllUsers />} />
							<Route path='/admin/dashboard/view-all-user-submissions' element={<ViewAllUserSubmissions />} />
							<Route path='/admin/dashboard/manage-announcements' element={<ManageAnnouncements />} />
						</>
					}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
