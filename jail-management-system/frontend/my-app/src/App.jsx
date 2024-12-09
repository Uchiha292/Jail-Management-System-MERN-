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
import ManageTransfers from './pages/ManageTransfers';
import AllTransfers from './pages/AllTransfers';
import PrisonerTransfers from './pages/PrisonerTransfers';
import PendingTransfers from './pages/PendingTransfers';
import GenerateReports from './pages/GenerateReports';
import IncidentFreqReport from './pages/IncidentFreqReport';
import PrisonerDemoReports from './pages/PrisonerDemReports';
import ManageGuidelines from './pages/ManageGuidlines';

import LoginJailer from './components/LoginJailer';
import JailerHomePage from './pages/JailerHomePage'; 
import visitationHandel from './pages/visitationHandel'; 

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
                <Route path="/warden/manage-transfers" element={<ManageTransfers />} />
                <Route path="/warden/manage-transfers/history" element={<AllTransfers />} />
                <Route path="/warden/manage-transfers/history/:id" element={<PrisonerTransfers />} />
                <Route path="/warden/manage-transfers/pending" element={<PendingTransfers />} />
                <Route path="/warden/reports" element={<GenerateReports />} />
                <Route path="/warden/report/incident-frequency" element={<IncidentFreqReport />} />
                <Route path="/warden/report/prisoner-demographics" element={<PrisonerDemoReports />} />
                <Route path="/warden/manage-guidelines" element={<ManageGuidelines />} />
                
                {/* Jailer Panel Routes */}
                <Route path="/jailer/login" element={<LoginJailer />} />
                <Route path="/jailer/home" element={<JailerHomePage />} />
                <Route path="/visitation-handle" element={<visitationHandel />} />
                

            </Routes>
        </Router>
    );
}

export default App;


