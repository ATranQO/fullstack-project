import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const InvoiceStatistics = () => {
    const [invoiceStatistics, setInvoiceStatistics] = useState({});
    const [personStatistics, setPersonStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            apiGet("/api/invoices/statistics"),
            apiGet("/api/persons/statistics")
        ])
        .then(([invoiceData, personData]) => {
            setInvoiceStatistics(invoiceData);
            setPersonStatistics(personData); // Assuming personData is an array of persons
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Filter persons with income
    const filteredPersonStatistics = personStatistics.filter(person => person.roundedSum > 0);

    return (
        <div>
            <h1>Statistiky</h1>
            <hr />
            <div>
                <h2 style={{ color: '#4a90e2', fontSize: '1.5em' }}>Statistiky Faktur</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '0.9em', lineHeight: '1.4', fontWeight: 'bold', textAlign: 'center' }}>
                    <span>Součet za letošní rok</span>
                    <span>Součet za všechna období</span>
                    <span>Počet faktur</span>
                </div>
                <hr style={{ margin: '10px 0' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '0.9em', lineHeight: '1.4', textAlign: 'center' }}>
                    <span>{invoiceStatistics?.currentYearSum}</span>
                    <span>{invoiceStatistics?.allTimeSum}</span>
                    <span>{invoiceStatistics?.invoicesCount}</span>
                </div>
                <hr style={{ margin: '10px 0' }} />
            </div>
            <div>
                <h2 style={{ color: '#ffd700', fontSize: '1.5em' }}>Statistiky Osob</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '0.9em', lineHeight: '1.4', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    <span>Id</span>
                    <span>Jméno</span>
                    <span>Příjmy</span>
                </div>
                {filteredPersonStatistics.map((person) => (
                    <div key={person.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '0.9em', lineHeight: '1.4', textAlign: 'center', borderBottom: '1px solid #ddd', padding: '5px 0' }}>
                        <span>{person.id}</span>
                        <span>{person.name}</span>
                        <span>{person.roundedSum}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvoiceStatistics;












/*
import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { useParams } from "react-router-dom";

const InvoiceStatistics = () => {
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/invoices/statistics")
            .then((data) => {
                setStatistics(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    
        apiGet("/api/persons/statistics")
        .then((data) => setStatistics(data));
        }, []); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1 style={{ color: '#4a90e2', fontSize: '2em', textDecoration: 'underline' }}>Statistiky</h1>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '1em', lineHeight: '1.4', fontWeight: 'bold' }}>
                <span>Součet za letošní rok</span>
                <span>Součet za všechna období</span>
                <span>Počet faktur</span>
            </div>
            <hr style={{ margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '1em', lineHeight: '1.4' }}>
                <span>{statistics?.currentYearSum}</span>
                <span>{statistics?.allTimeSum}</span>
                <span>{statistics?.invoicesCount}</span>
            </div>
        </div>
    );
};

export default InvoiceStatistics;
*/