import React from 'react'


import HomePage from '../pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import FrontPage from '../pages/FrontPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import SalaryGuide from '../pages/SalaryGuidePage'
import SalaryGuidePage from '../pages/SalaryGuidePage'
import CompanyReviewPage from '../pages/CompanyReviewPage'
import ProfilePage from '../pages/ProfilePage'
import EmployerAccntPage from '../pages/EmployerAccntPage'
import EmployerSignUpPage from '../pages/EmployerSignUpPage'
import AddQualificationPage from '../pages/AddQualificationPage'
import ProctedRoute from '../Components/ProtectedRoutes/ProtectedRoutes'
import PostViewPage from '../pages/PostViewPage'
import DetailedPostViewPage from '../pages/DetailedPostViewPage'
import ApplyForJobPage from '../pages/ApplyForJobPage'
import SavedPostpage from '../pages/SavedPostpage'
import SearchPage from '../pages/searchPage'



function UserRoutes() {
  return (
    <Routes>
        <Route path="/:id?" element={<HomePage/>}/>
        <Route path="frontpage" element={<FrontPage/>}/>
        <Route path="loginpage" element={<LoginPage/>}/>
        <Route path="signup"  element={<SignUpPage/>}/>
        <Route path="salaryguide" element={<SalaryGuidePage/>}/>
        <Route path="companyreviews" element={<CompanyReviewPage/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
        <Route path='employer' element={<EmployerSignUpPage/>}/>
        <Route path='employeraccount' element={<ProctedRoute><EmployerAccntPage/></ProctedRoute>}/>
        <Route path='AddQualification' element={<AddQualificationPage/>}/>
        <Route path='viewjobpost' element={<PostViewPage/>}/>
        <Route path='/postdetails/:id' element={<DetailedPostViewPage/>}/>
        <Route path='/Applyforjobs/:id' element={<ApplyForJobPage/>}/>
        <Route path='/savedjobs' element={<SavedPostpage/>}/>
        <Route path='/searchjobs' element={<SearchPage/>}></Route>
    </Routes>
  )
}

export default UserRoutes