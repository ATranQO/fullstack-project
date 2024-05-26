import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [invoice, setInvoice] = useState({});


    console.log(person);

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => setPerson(data));
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    const ico = person.identificationNumber;

    useEffect(() => {
        apiGet(`/api/identification/${ico}/purchases`).then((data) => setPurchases(data));
    }, [ico])

    useEffect(() => {
        apiGet(`/api/identification/${ico}/sales`).then((data) => setSales(data));
    }, [ico])


    return (
        <div>
            <h1>Detail osoby</h1>
            <hr/>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h3>{person.name} ({person.identificationNumber})</h3>
                    <p>
                        <strong>DIČ:</strong>
                        <br/>
                        {person.taxNumber}
                    </p>
                    <p>
                        <strong>Bankovní účet:</strong>
                        <br/>
                        {person.accountNumber}/{person.bankCode} ({person.iban})
                    </p>
                    <p>
                        <strong>Telefonní číslo:</strong>
                        <br/>
                        {person.telephone}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        <br/>
                        {person.mail}
                    </p>
                    <p>
                        <strong>Sídlo:</strong>
                        <br/>
                        {person.street}, {person.city},
                        {person.zip}, {country}
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br/>
                        {person.note}
                    </p>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2>Vystavené faktury</h2>
                <table border="1" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Odběratel</th>
                            <th>Datum vystavení</th>
                            <th>Datum splatnosti</th>
                            <th>Částka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.buyer.name}</td>
                                <td>{invoice.issued}</td>
                                <td>{invoice.dueDate}</td>
                                <td>{invoice.price}</td>
                            </tr>
                        ))}
                        {sales.length === 0 && (
                            <tr>
                                <td colSpan="5">Žádné vystavené faktury</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2>Přijaté faktury</h2>
                <table border="1" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Prodejce</th>
                            <th>Datum vystavení</th>
                            <th>Datum splatnosti</th>
                            <th>Částka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.seller.name}</td>
                                <td>{invoice.issued}</td>
                                <td>{invoice.dueDate}</td>
                                <td>{invoice.price}</td>
                            </tr>
                        ))}
                        {purchases.length === 0 && (
                            <tr>
                                <td colSpan="5">Žádné přijaté faktury</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonDetail;















/*
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiGet} from "../utils/api";
import Country from "./Country";

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => setPerson(data));
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Telefonní číslo:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Email:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
            </div>
        </>
    );
};

export default PersonDetail;
*/