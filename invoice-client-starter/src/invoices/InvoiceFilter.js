import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField"
import React from 'react';



const InvoiceFilter = (props) => {
  
  
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  const filter = props.filter;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <InputSelect
            name="buyerId"
            items={props.buyerIdList}
            handleChange={handleChange}
            label="Odběratel"
            prompt="nevybrán"
            value={filter.buyerId}
          />
        </div>
        <div className="col">
          <InputSelect
            name="sellerId"
            items={props.sellerIdList}
            handleChange={handleChange}
            label="Dodavatel"
            prompt="nevybrán"
            value={filter.sellerId}
          />
        </div>
        <div className="col">
            <InputField
              type="text"
              name="product"
              handleChange={handleChange}
              label="Produkt"
              value={filter.product}
            />
          </div>
      </div>

      <div className="row">
          <div className="col">
            <InputField
              type="number"
              min="0"
              name="minPrice"
              handleChange={handleChange}
              label="Minimální cena faktury"
              prompt="neuveden"
              value={filter.minPrice ? filter.minPrice : ''}
            />
          </div>

        <div className="col">
            <InputField
              type="number"
              min="0"
              name="maxPrice"
              handleChange={handleChange}
              label="Maximální cena faktury"
              prompt="neuveden"
              value={filter.maxPrice ? filter.maxPrice: ''}
            />
          </div>

        <div className="col">
          <InputField
            type="number"
            min="1"
            name="limit"
            handleChange={handleChange}
            label="Limit počtu faktur"
            prompt="neuveden"
            value={filter.limit ? filter.limit: '' }
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-secondary float-right mt-2"
            value={props.confirm}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceFilter;


/*
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField"
import React from 'react';



const InvoiceFilter = (props) => {
  
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  const filter = props.filter;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <InputSelect
            name="buyerId"
            items={props.buyerIdList}
            handleChange={handleChange}
            label="Odběratel"
            prompt="nevybrán"
            value={filter.buyerId}
          />
        </div>
        <div className="col">
          <InputSelect
            name="sellerId"
            items={props.sellerIdList}
            handleChange={handleChange}
            label="Dodavatel"
            prompt="nevybrán"
            value={filter.sellerId}
          />
        </div>
        <div className="col">
            <InputField
              type="text"
              name="product"
              handleChange={handleChange}
              label="Produkt"
              value={filter.product}
            />
          </div>
      </div>

      <div className="row">
          <div className="col">
            <InputField
              type="number"
              min="0"
              name="minPrice"
              handleChange={handleChange}
              label="Minimální cena faktury"
              prompt="neuveden"
              value={filter.minPrice ? filter.minPrice : ''}
            />
          </div>

        <div className="col">
            <InputField
              type="number"
              min="0"
              name="maxPrice"
              handleChange={handleChange}
              label="Maximální cena faktury"
              prompt="neuveden"
              value={filter.maxPrice ? filter.maxPrice: ''}
            />
          </div>

        <div className="col">
          <InputField
            type="number"
            min="1"
            name="limit"
            handleChange={handleChange}
            label="Limit počtu faktur"
            prompt="neuveden"
            value={filter.limit ? filter.limit: '' }
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-secondary float-right mt-2"
            value={props.confirm}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceFilter;
*/