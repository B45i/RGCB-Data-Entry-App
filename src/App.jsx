import { useState } from 'react';
import Navbar from './components/Navbar';
import DiseaseForm from './components/DiseaseForm';

import './App.css';

function App() {
    const [data, setData] = useState([]);
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

    const addNewDisease = () => {
        setCurrentDisease(null);
    };

    const downloadFile = () => {
        const element = document.createElement('a');
        const textFile = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json',
        });
        element.href = URL.createObjectURL(textFile);
        element.download = 'db.json';
        document.body.appendChild(element);
        element.click();
    };

    const handleSave = val => {
        setCurrentDisease(val);
        if (!currentDisease) {
            setData([...data, val]);
            return;
        }

        setData(
            data.map(d => {
                if (d === currentDisease) {
                    return val;
                }
                return d;
            })
        );
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
                            <li
                                className={`list-group-item ${
                                    entry === currentDisease
                                        ? 'border-primary'
                                        : ''
                                }`}
                                key={i}
                            >
                                <button
                                    className="btn w-100"
                                    onClick={e => handleDisease(entry)}
                                >
                                    {entry.name}
                                </button>
                            </li>
                        ))}

                        <li className="list-group-item">
                            <button
                                className="btn btn-primary w-100"
                                onClick={addNewDisease}
                            >
                                Add New
                            </button>
                        </li>
                    </ul>

                    <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={downloadFile}
                    >
                        Download Data
                    </button>
                </div>
                <div className="col-9">
                    <DiseaseForm disease={currentDisease} onSave={handleSave} />
                </div>
            </div>
        </>
    );
}

export default App;
