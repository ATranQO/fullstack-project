import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceDetail = () => {

    const {id} = useParams();
    const [invoice, setInvoice] = useState({}); 

   
    useEffect(() => {
        apiGet("/api/invoices/" + id)
        .then((data) => 
        setInvoice(data)
        )
    }, [id]);

    

    return (
        <div>
            <h1>Detail faktury</h1>
            <hr/>
            <p>
                <strong> Číslo faktury: </strong> {invoice.invoiceNumber}
            </p>
            <p>
                <strong> Datum vystavení: </strong> <br/>
                {invoice.issued}
            </p>
            <p>
                <strong> Datum splatnosti: </strong> <br/>
                {invoice.dueDate}
            </p>
            <p>
                <strong> Odběratel: </strong> {invoice.buyer?.name} <br/>
            </p>
            <p>
                <strong> Dodavatel: </strong> {invoice.seller?.name} <br/>
            </p>
            <p>
                <strong> Produkt: </strong> {invoice.product} <br/>
            </p>
            <p>
                <strong> Cena: </strong> {invoice.price} Kč <br/>
            </p>
            <p>
                <strong> DPH: </strong> {invoice.vat} % <br/>
            </p>
            <p>
                <strong> Popis: </strong> {invoice.note} <br/>
            </p>
        </div>
    );
};

export default InvoiceDetail;

/*
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceDetail = () => {

    const {id} = useParams();
    const [invoice, setInvoice] = useState({}); 

   
    useEffect(() => {
        apiGet("/api/invoices/" + id)
        .then((data) => 
        setInvoice(data)
        )
    }, [id]);

    

    return (
        <div>
            <h1>Detail faktury</h1>
            <hr/>
            <p>
                <strong> Číslo faktury: </strong> {invoice.invoiceNumber}
            </p>
            <p>
                <strong> Datum vystavení: </strong> <br/>
                {invoice.issued}
            </p>
            <p>
                <strong> Datum splatnosti: </strong> <br/>
                {invoice.dueDate}
            </p>
            <p>
                <strong> Odběratel: </strong> {invoice.buyer?.name} <br/>
            </p>
            <p>
                <strong> Dodavatel: </strong> {invoice.seller?.name} <br/>
            </p>
            <p>
                <strong> Produkt: </strong> {invoice.product} <br/>
            </p>
            <p>
                <strong> Cena: </strong> {invoice.price} Kč <br/>
            </p>
            <p>
                <strong> DPH: </strong> {invoice.vat} % <br/>
            </p>
            <p>
                <strong> Popis: </strong> {invoice.note} <br/>
            </p>
        </div>
    );
};

export default InvoiceDetail;
*/
