import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterVisitor from './components/RegisterVisitor';
import Login from './components/LoginVisitor';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage'; // Assuming the HomePage is here
import VisitationRequest from './pages/VisitationRequest';
import VisitationHistory from './pages/VisitationHistory';
import GuidelinesPage from './pages/Guidelines';
import LoginWarden from './components/LoginWarden';
import WardenHomePage from './pages/WardenHomePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/register" element={<RegisterVisitor />} />
                <Route path="/login" element={<Login />} />
                <Route path="/visitation-request" element={<VisitationRequest />} />
                <Route path="/visitation-history" element={<VisitationHistory />} />
                <Route path="/guidelines" element={<GuidelinesPage />} />

                {/* Warden Panel Routes */}
                <Route path="/warden/login" element={<LoginWarden />} />
                <Route path="/warden/home" element={<WardenHomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
