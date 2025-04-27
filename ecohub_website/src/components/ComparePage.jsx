import React, { useState } from 'react';
import './HomePage.css';

// Fake models data with required metrics
const models = [
    {
        name: 'EcoBERT',
        dataset: [10000, 12], // [num images, num classes]
        efficiency: [0.12, 35, 420], // [avg inference (s), avg cpu (%), peak mem (MB)]
        ecometrics: [0.8, 0.02, 0.001], // [wh, co2 kg, trees]
        icon: '🌱',
    },
    {
        name: 'GreenVision',
        dataset: [25000, 20],
        efficiency: [0.09, 28, 390],
        ecometrics: [0.6, 0.015, 0.0008],
        icon: '🦁',
    },
    {
        name: 'EcoClassifier',
        dataset: [15000, 10],
        efficiency: [0.15, 40, 500],
        ecometrics: [1.1, 0.03, 0.0015],
        icon: '🔍',
    },
    {
        name: 'SustainableGAN',
        dataset: [8000, 8],
        efficiency: [0.20, 50, 600],
        ecometrics: [1.5, 0.05, 0.002],
        icon: '🎨',
    },
    {
        name: 'EcoSegmenter',
        dataset: [12000, 15],
        efficiency: [0.11, 32, 410],
        ecometrics: [0.7, 0.018, 0.0009],
        icon: '🖼️',
    },
];

export default function ComparePage() {
    const [selected, setSelected] = useState([]);

    const toggleSelect = (name) => {
        setSelected((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : prev.length < 3
                    ? [...prev, name]
                    : prev
        );
    };

    const selectedModels = models.filter((m) => selected.includes(m.name));

    // Helper to find the best (lowest) value for each metric
    const getBestIndexes = (metricGetter) => {
        if (selectedModels.length === 0) return [];
        const values = selectedModels.map(metricGetter);
        const min = Math.min(...values);
        return values.map((v) => v === min);
    };

    // For each metric, get an array of booleans indicating if that model is best
    const bestInf = getBestIndexes((m) => m.efficiency[0]);
    const bestCpu = getBestIndexes((m) => m.efficiency[1]);
    const bestMem = getBestIndexes((m) => m.efficiency[2]);
    const bestWh = getBestIndexes((m) => m.ecometrics[0]);
    const bestCo2 = getBestIndexes((m) => m.ecometrics[1]);
    const bestTrees = getBestIndexes((m) => m.ecometrics[2]);

    const greenArrow = <span style={{ color: '#10b981', marginLeft: 6 }}>↓</span>;

    return (
        <div className="homepage">
            <div className="hero-section" style={{ textAlign: 'left', padding: '2% 5%' }}>
                <h1>Compare Models</h1>
                <p className="tagline">Select up to 3 models to compare their environmental and performance metrics side by side.</p>
            </div>
            <div style={{ margin: '40px auto', maxWidth: 1000, background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.07)', padding: 32 }}>
                <h2 style={{ marginBottom: 24, color: 'var(--primary-dark)' }}>Select Models</h2>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                    {models.map((model) => (
                        <button
                            key={model.name}
                            className={`category-btn${selected.includes(model.name) ? ' active' : ''}`}
                            style={{ minWidth: 160, display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 600, boxShadow: selected.includes(model.name) ? '0 4px 16px rgba(16,185,129,0.15)' : undefined }}
                            onClick={() => toggleSelect(model.name)}
                            disabled={!selected.includes(model.name) && selected.length >= 3}
                        >
                            <span style={{ fontSize: 28 }}>{model.icon}</span> {model.name}
                        </button>
                    ))}
                </div>
                {selectedModels.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(248,250,252,0.7)', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <thead>
                                <tr style={{ background: 'var(--gradient-1)', color: '#fff' }}>
                                    <th style={{ padding: 16, borderRadius: '12px 0 0 0', minWidth: 180, textAlign: 'left' }}>Metric</th>
                                    {selectedModels.map((m) => (
                                        <th key={m.name} style={{ padding: 16, minWidth: 180, fontSize: 20, fontWeight: 700, textAlign: 'center' }}>{m.icon} {m.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: 17 }}>
                                <tr style={{ background: '#f0fdf4' }}>
                                    <td style={{ padding: 14, fontWeight: 600 }}>Avg Inference (s)</td>
                                    {selectedModels.map((m, i) => <td key={m.name + "inf"} style={{ padding: 14, textAlign: 'center' }}>{m.efficiency[0]}{bestInf[i] && greenArrow}</td>)}
                                </tr>
                                <tr style={{ background: '#e0f2fe' }}>
                                    <td style={{ padding: 14, fontWeight: 600 }}>Avg CPU Usage (%)</td>
                                    {selectedModels.map((m, i) => <td key={m.name + "cpu"} style={{ padding: 14, textAlign: 'center' }}>{m.efficiency[1]}{bestCpu[i] && greenArrow}</td>)}
                                </tr>
                                <tr style={{ background: '#f0fdf4' }}>
                                    <td style={{ padding: 14, fontWeight: 600 }}>Peak Memory (MB)</td>
                                    {selectedModels.map((m, i) => <td key={m.name + "mem"} style={{ padding: 14, textAlign: 'center' }}>{m.efficiency[2]}{bestMem[i] && greenArrow}</td>)}
                                </tr>
                                <tr style={{ background: '#e0f2fe' }}>
                                    <td style={{ padding: 14, fontWeight: 600 }}>Energy (Wh)</td>
                                    {selectedModels.map((m, i) => <td key={m.name + "wh"} style={{ padding: 14, textAlign: 'center' }}>{m.ecometrics[0]}{bestWh[i] && greenArrow}</td>)}
                                </tr>
                                <tr style={{ background: '#f0fdf4' }}>
                                    <td style={{ padding: 14, fontWeight: 600 }}>CO₂ Emissions (kg)</td>
                                    {selectedModels.map((m, i) => <td key={m.name + "co2"} style={{ padding: 14, textAlign: 'center' }}>{m.ecometrics[1]}{bestCo2[i] && greenArrow}</td>)}
                                </tr>
                                <tr style={{ background: '#e0f2fe' }}>
                                    <td style={{ padding: 14, fontWeight: 600 }}>Trees Needed to Offset</td>
                                    {selectedModels.map((m, i) => <td key={m.name + "tree"} style={{ padding: 14, textAlign: 'center' }}>{m.ecometrics[2]}{bestTrees[i] && greenArrow}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ color: 'var(--text-light)', marginTop: 32, textAlign: 'center', fontSize: 18 }}>
                        <p>Select models above to compare their metrics.</p>
                    </div>
                )}
            </div>
        </div>
    );
} 