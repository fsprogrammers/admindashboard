import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import DonationsPage from './pages/DonationsPage';
import QuotesPage from './pages/QuotesPages';
import ClinicPage from './pages/ClinicPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const defaultAdmins = [
    { firstName: 'Admin1', lastName: 'User', email: 'admin1@example.com', password: 'password1', address: 'Address 1', mobile: '1234567890', profilePhoto: 'https://w0.peakpx.com/wallpaper/435/732/HD-wallpaper-laptop-numbers-dark.jpg' },
    { firstName: 'Admin2', lastName: 'User', email: 'admin2@example.com', password: 'password2', address: 'Address 2', mobile: '2345678901', profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfoAOwO0FQGbhxQE8oX8KBBRmInYVJOSFWeA&s' },
    { firstName: 'Admin3', lastName: 'User', email: 'admin3@example.com', password: 'password3', address: 'Address 3', mobile: '3456789012',profilePhoto: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg' },
    { firstName: 'Admin4', lastName: 'User', email: 'admin4@example.com', password: 'password4', address: 'Address 4', mobile: '4567890123',profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5vRWZOPhy_XraJ-qbhoVWZfMFZxMBKdDx-g&s' }
  ];
  


  useEffect(() => {
    if (!localStorage.getItem('admins')) {
      localStorage.setItem('admins', JSON.stringify(defaultAdmins));
    }
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const superAdminStatus = localStorage.getItem('isSuperAdmin') === 'true';
  
    setIsLoggedIn(loggedInStatus);
    setIsSuperAdmin(superAdminStatus);
    const loggedInAdmin = JSON.parse(localStorage.getItem('loggedInAdmin'));
    if (loggedInAdmin) {
      setProfilePhoto(loggedInAdmin.profilePhoto);
    }
  }, []);
  
  
  const handleLogin = (email, password) => {
    if (email === 'superadmin@gmail.com' && password === 'superadmin#@') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isSuperAdmin', 'true');
      setIsLoggedIn(true);
      setIsSuperAdmin(true);
      setProfilePhoto('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgj9zAP5dPVfTc357VxZrF9hXYbG2ybB4vJQ&s'); // Super admin profile photo
    } else {
      const storedAdmins = JSON.parse(localStorage.getItem('admins'));
      console.log('Stored admins:', storedAdmins);
      const loggedInAdmin = storedAdmins.find(admin => admin.email === email && admin.password === password);
  
      if (loggedInAdmin) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isSuperAdmin', 'false');
        localStorage.setItem('loggedInAdmin', JSON.stringify(loggedInAdmin)); // Save the logged-in admin data
        setIsLoggedIn(true);
        setIsSuperAdmin(false);
        setProfilePhoto(loggedInAdmin.profilePhoto);
      } else {
        alert('Access Denied: Invalid email or password.');
        console.log('Entered email:', email);
console.log('Entered password:', password);
console.log('Stored admins:', storedAdmins);
        setIsLoggedIn(false);
        setIsSuperAdmin(false);
      }
    }
  };

 

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isSuperAdmin');
    localStorage.removeItem('loggedInAdmin');
    setIsLoggedIn(false);
    setIsSuperAdmin(false);
  };

  const handleProfilePhotoChange = (newPhoto) => {
    setProfilePhoto(newPhoto);
    const loggedInAdmin = JSON.parse(localStorage.getItem('loggedInAdmin'));
    loggedInAdmin.profilePhoto = newPhoto; // Update the logged-in admin's profile photo
    localStorage.setItem('loggedInAdmin', JSON.stringify(loggedInAdmin)); // Save updated admin data
  };
  return (
    <Router>
      <div className="flex">
        {isLoggedIn && <Sidebar isSuperAdmin={isSuperAdmin} />}
        <div className="flex-1">
          {isLoggedIn && <Header profilePhoto={profilePhoto} onLogout={handleLogout} />}
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/" element={isLoggedIn ? <MainContent /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isLoggedIn ? <MainContent /> : <Navigate to="/login" />} />
            <Route path="/clinic" element={isLoggedIn ? <ClinicPage /> : <Navigate to="/login" />} />
            <Route path="/quotes" element={isLoggedIn ? <QuotesPage /> : <Navigate to="/login" />} />
            <Route path="/donations" element={isLoggedIn ? <DonationsPage /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isLoggedIn ? <SettingsPage onProfilePhotoChange={handleProfilePhotoChange} isSuperAdmin={isSuperAdmin} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;