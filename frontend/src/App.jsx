import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventProvider from './context/EventProvider';
import Home from './pages/Home';
const App = () => (
    <EventProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </EventProvider>
);
export default App;