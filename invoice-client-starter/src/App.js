import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

// Importing the components for persons and invoices
import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import InvoiceStatistics from "./invoices/InvoiceStatistics";

const App = () => {
  return (
      <Router>
          <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <Link to={"/persons"} className="nav-link">
                              Osoby
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/invoices"} className="nav-link">
                              Faktury
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link to={"/statistics"} className="nav-link">
                              Statistiky 
                          </Link>
                      </li>
                  </ul>
              </nav>

              <Routes>
                  <Route index element={<Navigate to={"/persons"} />} />
                  <Route path="/persons">
                      <Route index element={<PersonIndex />} />
                      <Route path="show/:id" element={<PersonDetail />} />
                      <Route path="create" element={<PersonForm />} />
                      <Route path="edit/:id" element={<PersonForm />} />
                  </Route>
                  <Route path="/invoices">
                      <Route index element={<InvoiceIndex />} />
                      <Route path="show/:id" element={<InvoiceDetail />} />
                      <Route path="create" element={<InvoiceForm />} />
                      <Route path="edit/:id" element={<InvoiceForm />} />
                  </Route>
                  <Route index element={<Navigate to={"/statistics"} />} />
                  <Route path="/statistics">
                  <Route index element={<InvoiceStatistics />} />
                  </Route>
              </Routes>
          </div>
      </Router>
  );
};

export default App;


/*
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

// Importing the components for persons and invoices
import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import InvoiceStatistics from "./invoices/InvoiceStatistics";

const App = () => {
    return (
        <Router>
            <div className="container">
               
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/persons"} className="nav-link">
                                Osoby
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/invoices"} className="nav-link">
                                Faktury
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/invoices/show"} className="nav-link">
                                Statistiky faktur
                            </Link>
                        </li>
                    </ul>
                </nav>

               
                <Routes>
                  
                    <Route index element={<Navigate to={"/persons"} />} />
                    
                    
                    <Route path="/persons">
                        <Route index element={<PersonIndex />} />
                        <Route path="show/:id" element={<PersonDetail />} />
                        <Route path="create" element={<PersonForm />} />
                        <Route path="edit/:id" element={<PersonForm />} />
                    </Route>
                    
                    
                    <Route path="/invoices">
                        <Route index element={<InvoiceIndex />} />
                        <Route path="show/:id" element={<InvoiceDetail />} />
                        <Route path="create" element={<InvoiceForm />} />
                        <Route path="edit/:id" element={<InvoiceForm />} />
                        <Route path="show" element={<InvoiceStatistics />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
*/