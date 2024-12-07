import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterVisitor from './components/RegisterVisitor';
import Login from './components/LoginVisitor';
import LandingPage from './pages/LandingPage';
import VisitationRequest from './pages/VisitationRequest';
import VisitationHistory from './pages/VisitationHistory';
import GuidelinesPage from './pages/Guidelines';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterVisitor />} />
                <Route path="/login" element={<Login />} />
                <Route path="/visitation-request" element={<VisitationRequest />} />
                <Route path="/visitation-history" element={<VisitationHistory />} />
                <Route path="/guidelines" element={<GuidelinesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
