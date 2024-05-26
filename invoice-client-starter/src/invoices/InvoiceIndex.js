import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
  const [invoicesState, setInvoices] = useState([]);
  const [productListState, setProductList] = useState([]);
  const [persons, setPersons] = useState([]);
  const [filterState, setFilter] = useState({
  
    buyerId: undefined,
    sellerId: undefined,
    product: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    limit: undefined
  });

  const deleteInvoice = async (id) => {
    try {
      await apiDelete("/api/invoices/" + id);
    } catch (error) {
      console.log(error.message);
      alert(error.message)
  }
    setInvoices(invoicesState.filter((item) => item._id !== id));
  };

  useEffect(() => {
    apiGet("/api/invoices").then((data) => setInvoices(data));
    apiGet("/api/persons").then((data) => setPersons(data));
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
    if (
      e.target.value === "false" ||
      e.target.value === "true" ||
      e.target.value === ""
    ) {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: undefined };
      });
    } else {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = filterState;

    const data = await apiGet("/api/invoices", params);
    setInvoices(data);
  };

 

  return (
    <div>
      <h1>Seznam faktur</h1>
      <hr />
      <InvoiceFilter
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buyerIdList={persons}
        sellerIdList={persons}
        productList={productListState}
        filter={filterState}
        confirm="Filtrovat faktury"
      />
      <hr />
      <InvoiceTable
        deleteInvoice={deleteInvoice}
        items={invoicesState}
        label="Počet faktur:"
      />
    </div>
  );
};

export default InvoiceIndex;


/*


import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [buyerListState, setBuyerList] = useState([]);
  const [sellerListState, setSellerList] = useState([]);
  const [productListState, setProductList] = useState([]);
  const [minPriceListState, setMinPriceList] = useState([]);
  const [maxPriceListState, setMaxPriceList] = useState([]);
  const [limitListState, setLimitList] = useState([]);
  const [filter, setFilter] = useState({
    buyerId: undefined,
    sellerId: undefined,
    product: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    limit: undefined
  });

  useEffect(() => {
    apiGet("/api/invoices").then((data) => setInvoices(data));
    apiGet("/api/buyers").then((data) => setBuyerList(data));
    apiGet("/api/sellers").then((data) => setSellerList(data));
    
  }, []);

  const deleteInvoice = async (id) => {
    try {
      await apiDelete("/api/invoices/" + id);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
    setInvoices(invoices.filter((item) => item._id !== id));
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
    if (
      e.target.value === "false" ||
      e.target.value === "true" ||
      e.target.value === ""
    ) {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: undefined };
      });
    } else {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = filter;

    const data = await apiGet("/api/invoices", params);
    setInvoices(data);
  };

  return (
    <div>
      <h1>Seznam faktur</h1>
      <hr />
      <InvoiceFilter
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buyerIdList={buyerListState}
        sellerIdList={sellerListState}
        productList={productListState}
        filter={filter}
        confirm="Filtrovat faktury"
      />
      <hr />
      <InvoiceTable
        deleteInvoice={deleteInvoice}
        items={invoices}
        label="Počet faktur:"
      />
    </div>
  );
};

export default InvoiceIndex;




*/





