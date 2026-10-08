import React from 'react'
import { Routes, Route,useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TestRole from './TestRole'
import ProtectedRoute from './components/ProtectedRoute'

//public pages
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword';

//customer pages
import Vehicles from './customer/Vehicles'
import ServiceCenters from './customer/ServiceCenter'
import CustomerBookings from './customer/Booking'
import ServiceHistory from './customer/ServiceHistory'
import CustomerReviews from './customer/Reviews' 

//service center pages
import ServiceCenterDashboard from './serviceCenter/DashBoard'
import ServiceCenterServices from './serviceCenter/Services'
import TimeSlots from './serviceCenter/Timeslots'
import ServiceCenterBookings from './serviceCenter/Booking'
import ServiceCenterReviews from './serviceCenter/Reviews'
import ServiceCenterProfile from './serviceCenter/Profile'

//admin pages
import AdminDashboard from './admin/Dashboard'
import Customers from './admin/Customers'
import AdminServiceCenters from './admin/ServiceCenter'
import AdminServices from './admin/Services'
import AdminBookings from './admin/Bookings'
import AdminReviews from './admin/Reviews'





const App = () => {

  const location = useLocation();
  const showFooter = [
    '/',
    '/service',
    '/about'
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <Navbar/>

      <main className="min-h-[calc(100vh-140px)]">

        <Routes>

          {/*public routes*/}
          <Route path="/" element={<Home/>}/>
          <Route path="/service" element={<Services/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>

           {/*customer routes*/}
           <Route
    path="/customer/vehicles"
    element={
        <ProtectedRoute role="customer">
            <Vehicles />
        </ProtectedRoute>
    }
/>

<Route
    path="/customer/service-centers"
    element={
        <ProtectedRoute role="customer">
            <ServiceCenters />
        </ProtectedRoute>
    }
/>

<Route
    path="/customer/bookings/new"
    element={
        <ProtectedRoute role="customer">
            <CustomerBookings />
        </ProtectedRoute>
    }
/>

<Route
    path="/customer/bookings"
    element={
        <ProtectedRoute role="customer">
            <CustomerBookings />
        </ProtectedRoute>
    }
/>

<Route
    path="/customer/service-history"
    element={
        <ProtectedRoute role="customer">
            <ServiceHistory />
        </ProtectedRoute>
    }
/>

<Route
    path="/customer/reviews"
    element={
        <ProtectedRoute role="customer">
            <CustomerReviews />
        </ProtectedRoute>
    }
/>

           {/*service center routes*/}
           <Route
    path="/service-center/dashboard"
    element={
        <ProtectedRoute role="serviceCenter">
            <ServiceCenterDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/service-center/services"
    element={
        <ProtectedRoute role="serviceCenter">
            <ServiceCenterServices />
        </ProtectedRoute>
    }
/>

<Route
    path="/service-center/time-slots"
    element={
        <ProtectedRoute role="serviceCenter">
            <TimeSlots />
        </ProtectedRoute>
    }
/>

<Route
    path="/service-center/bookings"
    element={
        <ProtectedRoute role="serviceCenter">
            <ServiceCenterBookings />
        </ProtectedRoute>
    }
/>

<Route
    path="/service-center/reviews"
    element={
        <ProtectedRoute role="serviceCenter">
            <ServiceCenterReviews />
        </ProtectedRoute>
    }
/>

<Route
    path="/service-center/profile"
    element={
        <ProtectedRoute role="serviceCenter">
            <ServiceCenterProfile />
        </ProtectedRoute>
    }
/>

           {/*admin routes*/}
           <Route
    path="/admin/dashboard"
    element={
        <ProtectedRoute role="admin">
            <AdminDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/customers"
    element={
        <ProtectedRoute role="admin">
            <Customers />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/service-centers"
    element={
        <ProtectedRoute role="admin">
            <AdminServiceCenters />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/services"
    element={
        <ProtectedRoute role="admin">
            <AdminServices />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/bookings"
    element={
        <ProtectedRoute role="admin">
            <AdminBookings />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/reviews"
    element={
        <ProtectedRoute role="admin">
            <AdminReviews />
        </ProtectedRoute>
    }
/>
           <Route path="/test-role" element={<TestRole/>}/>


    
        </Routes>
        
      </main>
      {showFooter && <Footer/>}
      
    </div>
  )
}

export default App
