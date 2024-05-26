import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";


const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        product: "",
        note: "",
        price: "",
        vat: "",
        dueDate: "",
        issued: "",
        buyer: "",
        seller: "",
    });


    const [buyerState, setBuyer] = useState([]);
    const [sellerState, setSeller] = useState([]);
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    

    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);


    useEffect( () => { 
        if (id) {
            apiGet ("/api/invoices/" + id).then((data) => {
            setInvoice(data);
            setSeller(data.seller);
            setBuyer(data.buyer);
        });
    }

        apiGet("/api/persons").then((data) => setSellerList(data));
        console.log(apiGet("/api/persons"));
        console.log(sellerListState);
        apiGet("/api/persons").then((data) => setBuyerList(data));
    }, [id]);

  


    const handleSubmit = (e) => {
        e.preventDefault();
    
    
        (id ? apiPut("/api/invoices/" + id, invoice) 
            : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sentState && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Faktura úspěšně uložena." : ""}
                />
            )}

            <form onSubmit={handleSubmit}>
            <InputField
            required={true}
            type="number"
            name="invoiceNumber"
            label="Číslo faktury"
            prompt="Zadejte číslo faktury"
            value={invoice.invoiceNumber}
            handleChange={(e) => 
                setInvoice({...invoice, invoiceNumber: e.target.value})
    } 
></InputField>

<InputSelect
    required={true}
    name="seller"
    items={sellerListState}
    label="Dodavatel"
    prompt="Vyberte dodavatele"
    value={sellerState[0]} // Pokud je sellerState pole, získáváme první prvek pole
    handleChange={(e) => {
        console.log(e);
        setInvoice({...invoice, seller:  {_id: e.target.value}});
    }}
></InputSelect>

<InputSelect
    required={true}
    name="buyer"
    items={buyerListState}
    label="Odběratel"
    prompt="Vyberte odběratele"
    value={buyerState[0]} // Pokud je buyerState pole, získáváme první prvek pole
    handleChange={(e) => {
        console.log(e);
        setInvoice({...invoice, buyer: {_id: e.target.value}});
    }}
/>


<InputField
    required={true}
    type="date"
    name="issued"
    label="Datum vystavení"
    prompt="Zadejte datum vystavení"
    value={invoice.issued}
    handleChange={(e) => 
        setInvoice({...invoice, issued: e.target.value})
    }
/>


<InputField
    required={true}
    type="date"
    name="dueDate"
    label="Datum splatnosti"
    prompt="Zadejte datum splatnosti"
    value={invoice.dueDate}
    handleChange={(e) => 
        setInvoice({...invoice, dueDate: e.target.value})
    }
/>


<InputField
    required={true}
    type="text"
    name="product"
    label="Produkt"
    prompt="Zadejte produkt"
    value={invoice.product}
    handleChange={(e) => 
    setInvoice({...invoice, product: e.target.value})
    }
/>

<InputField
    required={true}
    type="number"
    name="price"
    label="Cena"
    prompt="Zadejte cenu"
    value={invoice.price}
    handleChange={(e) => 
    setInvoice({...invoice, price: e.target.value})
    }
/>

<InputField
    required={true}
    type="number"
    name="vat"
    label="DPH"
    prompt="Zadejte DPH v procentech"
    value={invoice.vat}
    handleChange={(e) => 
    setInvoice({...invoice, vat: e.target.value})
    }
/>

<InputField
    type="text"
    name="description"
    label="Popis"
    prompt="Zadejte popis"
    value={invoice.note}
    handleChange={(e) => 
    setInvoice({...invoice, note: e.target.value})
    }
/>



                <input type="submit" className="btn btn-primary" value={id ? "Aktualizovat" : "Vytvořit"} />
            </form>
        </div>
    );
};

export default InvoiceForm;

/*
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";
import InputCheck from "../components/InputCheck";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        product: "",
        note: "",
        price: "",
        vat: "",
        dueDate: "",
        issued: "",
        buyer: "",
        seller: "",
        
    });

    
    const [noteListState, setNoteListState] = useState("");
    const [vatListState, setVatListState] = useState("");
    const [priceListState, setPriceListState] = useState("");
    const [productListState, setProductListState] = useState("");
    const [dueDateListState, setDueDateListState] = useState([]);
    const [issuedListState, setIssuedListState] = useState("");
    const [buyerState, setBuyer] = useState([]);
    const [sellerState, setSeller] = useState([]);
    const [buyerListState, setBuyerList] = useState([]);
    const [sellerListState, setSellerList] = useState([]);
    

    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);


    useEffect( () => { 
        if (id) {
            apiGet ("/api/invoices/" + id).then((data) => {
            setInvoice(data);
            setSeller(data.seller);
            setBuyer(data.buyer);
        });
    }

        apiGet("/api/persons").then((data) => setSellerList(data));
        console.log(apiGet("/api/persons"));
        console.log(sellerListState);
        apiGet("/api/persons").then((data) => setBuyerList(data));
    }, [id]);

  


    const handleSubmit = (e) => {
        e.preventDefault();
    
    
        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sentState && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Faktura úspěšně uložena." : ""}
                />
            )}

            <form onSubmit={handleSubmit}>
            <InputField
            required={true}
            type="number"
            name="invoiceNumber"
            label="Číslo faktury"
            prompt="Zadejte číslo faktury"
            value={invoice.invoiceNumber}
            handleChange={(e) => 
                setInvoice({...invoice, invoiceNumber: e.target.value})
    } 
></InputField>

<InputSelect
    required={true}
    name="seller"
    items={sellerListState}
    label="Dodavatel"
    prompt="Vyberte dodavatele"
    value={sellerState[0]} // Pokud je sellerState pole, získáváme první prvek pole
    handleChange={(e) => {
        console.log(e);
        setInvoice({...invoice, seller:  {_id: e.target.value}});
    }}
></InputSelect>

<InputSelect
    required={true}
    name="buyer"
    items={buyerListState}
    label="Odběratel"
    prompt="Vyberte odběratele"
    value={buyerState[0]} // Pokud je buyerState pole, získáváme první prvek pole
    handleChange={(e) => {
        console.log(e);
        setInvoice({...invoice, buyer: {_id: e.target.value}});
    }}
/>


<InputField
    required={true}
    type="date"
    name="issued"
    label="Datum vystavení"
    prompt="Zadejte datum vystavení"
    value={invoice.issued}
    handleChange={(e) => 
        setInvoice({...invoice, issued: e.target.value})
    }
/>


<InputField
    required={true}
    type="date"
    name="dueDate"
    label="Datum splatnosti"
    prompt="Zadejte datum splatnosti"
    value={invoice.dueDate}
    handleChange={(e) => 
        setInvoice({...invoice, dueDate: e.target.value})
    }
/>


<InputField
    required={true}
    type="text"
    name="product"
    label="Produkt"
    prompt="Zadejte produkt"
    value={invoice.product}
    handleChange={(e) => 
    setInvoice({...invoice, product: e.target.value})
    }
/>

<InputField
    required={true}
    type="number"
    name="price"
    label="Cena"
    prompt="Zadejte cenu"
    value={invoice.price}
    handleChange={(e) => 
    setInvoice({...invoice, price: e.target.value})
    }
/>

<InputField
    required={true}
    type="number"
    name="vat"
    label="DPH"
    prompt="Zadejte DPH v procentech"
    value={invoice.vat}
    handleChange={(e) => 
    setInvoice({...invoice, vat: e.target.value})
    }
/>

<InputField
    type="text"
    name="description"
    label="Popis"
    prompt="Zadejte popis"
    value={invoice.note}
    handleChange={(e) => 
    setInvoice({...invoice, note: e.target.value})
    }
/>



                <input type="submit" className="btn btn-primary" value={id ? "Aktualizovat" : "Vytvořit"} />
            </form>
        </div>
    );
};

export default InvoiceForm;

*/






























