// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelectionRegister from './components/RoleSelectionRegister';
import RoleSelectionLogin from './components/RoleSelectionLogin';
import RegisterVisitor from './components/RegisterVisitor';
import RegisterWarden from './components/RegisterWarden';
import RegisterJailer from './components/RegisterJailer';
import Login from './components/Login'; // The unified login component
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import VisitationRequest from './pages/VisitationRequest';
import VisitationHistory from './pages/VisitationHistory';
import GuidelinesPage from './pages/Guidelines';

import WardenHome from './pages/WardenHomePage';
import JailerHomePage from './pages/JailerHomePage';
import IncidentCheck from './pages/IncidentCheck';
import PrisonerManager from './pages/PrisonerManager';
import VisitationHandle from './pages/VisitationHandle';
import IncidentReports from './pages/IncidentReports';
import CellManager from './pages/CellManager';

import ManageTransfers from './pages/ManageTransfers';
import AllTransfers from './pages/AllTransfers';
import PrisonerTransfers from './pages/PrisonerTransfers';
import PendingTransfers from './pages/PendingTransfers';
import GenerateReports from './pages/GenerateReports';
import IncidentFreqReport from './pages/IncidentFreqReport';
import PrisonerDemoReports from './pages/PrisonerDemReports';
import ManageGuidelines from './pages/ManageGuidlines';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />

                {/* General Registration and Login Routes */}
                <Route path="/register" element={<RoleSelectionRegister />} />
                <Route path="/login" element={<RoleSelectionLogin />} />

                {/* Specific Registration Routes */}
                <Route path="/register/visitor" element={<RegisterVisitor />} />
                <Route path="/register/warden" element={<RegisterWarden />} />
                 <Route path="/register/jailer" element={<RegisterJailer />} />

                {/* Specific Login Routes (THESE are the ones that pass userType via useParams) */}
                {/* THESE routes must render the unified Login component */}
                {
                <Route path="/login/:userType" element={<Login />} />
                /* <Route path="/login/visitor" element={<Login />} />
                <Route path="/login/warden" element={<Login />} />
                <Route path="/login/jailer" element={<Login />} /> */}

                {/* Visitor Panel Routes */}
                <Route path="/visitation-request" element={<VisitationRequest />} />
                <Route path="/visitation-history" element={<VisitationHistory />} />
                <Route path="/guidelines" element={<GuidelinesPage />} />

                {/* Warden Panel Routes */}
                <Route path="/warden/home" element={<WardenHome />} />
                <Route path="/warden/manage-transfers" element={<ManageTransfers />} />
                <Route path="/warden/manage-transfers/history" element={<AllTransfers />} />
                <Route path="/warden/manage-transfers/history/:id" element={<PrisonerTransfers />} />
                <Route path="/warden/manage-transfers/pending" element={<PendingTransfers />} />
                <Route path="/warden/reports" element={<GenerateReports />} />
                <Route path="/warden/report/incident-frequency" element={<IncidentFreqReport />} />
                <Route path="/warden/report/prisoner-demographics" element={<PrisonerDemoReports />} />
                <Route path="/warden/manage-guidelines" element={<ManageGuidelines />} />

                {/* Jailer Panel Routes */}

                   <Route path="/jailer/home" element={<JailerHomePage />} />
                <Route path="/prisoner-manager" element={<PrisonerManager />} />
                <Route path="/visitation-handle" element={<VisitationHandle />} />
                <Route path="/incident-reports" element={<IncidentReports />} />
                <Route path="/cell-manager" element={<CellManager />} />
            </Routes>
        </Router>
    );
}

export default App;