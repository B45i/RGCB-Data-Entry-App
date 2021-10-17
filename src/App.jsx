import { useState } from 'react';
import Navbar from './components/Navbar';
import DiseaseForm from './components/DiseaseForm';

import './App.css';

function App() {
    const [data, setData] = useState(null);
    const [currentDisease, setCurrentDisease] = useState(null);

    const handleUpload = async e => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        let reader = new FileReader(file);
        reader.onload = async e => {
            let data = e.target.result;
            let content = await JSON.parse(data);
            setData(content);
        };
        reader.readAsText(file);
    };

    const handleDisease = d => {
        setCurrentDisease(d);
    };

    return (
        <>
            <Navbar />

            <div className="my-3 mx-2">
                <input
                    className="form-control"
                    type="file"
                    accept="application/JSON"
                    onChange={handleUpload}
                />
            </div>

            <div className="row">
                <div className="col-3 p-3">
                    <ul className="list-group">
                        {(data || []).map((entry, i) => (
                            <li className="list-group-item" key={i}>
                                <button
                                    className="btn w-100"
                                    onClick={e => handleDisease(entry)}
                                >
                                    {entry.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-9">
                    <DiseaseForm disease={currentDisease} />
                </div>
            </div>
        </>
    );
}

export default App;
