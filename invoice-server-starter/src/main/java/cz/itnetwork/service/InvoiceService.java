package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;

import java.util.List;

public interface InvoiceService  {


    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    void removeInvoice(long id);

    List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter);

    InvoiceDTO getInvoiceById(long id);

    InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long invoiceId);

    InvoiceStatisticDTO getStatistics();



}



/*
public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    void removeInvoice(long id);

    InvoiceDTO getInvoiceById(long id);

    InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long invoiceId);

    List<InvoiceDTO> getAllInvoices();
    //List<PersonStatisticDTO> getStatistics();
   // List<InvoiceStatisticDTO> getStatisticsForInvoice();

     List<InvoiceStatisticDTO> getStatistics();
}
 */
