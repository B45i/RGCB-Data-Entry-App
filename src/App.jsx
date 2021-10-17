import Navbar from './components/Navbar';
import DiseaseForm from './components/DiseaseForm';

import './App.css';

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <DiseaseForm />
            </div>
        </>
    );
}

export default App;
