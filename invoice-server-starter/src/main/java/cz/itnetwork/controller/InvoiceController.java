package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices") // Update mapping to /api/invoices
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    @DeleteMapping("/{invoiceId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.removeInvoice(invoiceId);
    }

    @GetMapping("/{invoiceId}")
    public InvoiceDTO getInvoice(@PathVariable long invoiceId) {
        return invoiceService.getInvoiceById(invoiceId);
    }

    @PutMapping("/{invoiceId}")
    public InvoiceDTO editInvoice(@PathVariable long invoiceId, @RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.editInvoice(invoiceDTO, invoiceId);
    }

    @GetMapping
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {return invoiceService.getAllInvoices(invoiceFilter);
    }

    @GetMapping("/statistics")
    public InvoiceStatisticDTO getStatistics(){
        return invoiceService.getStatistics();
    }


}

/*
package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.InvoiceService;
import cz.itnetwork.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices") // Update mapping to /api/invoices
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    @DeleteMapping("/{invoiceId}")
    public void deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.removeInvoice(invoiceId);
    }

    @GetMapping("/{invoiceId}")
    public InvoiceDTO getInvoice(@PathVariable long invoiceId) {
        return invoiceService.getInvoiceById(invoiceId);
    }

    @PutMapping("/{invoiceId}")
    public InvoiceDTO editInvoice(@PathVariable long invoiceId, @RequestBody InvoiceDTO invoiceDTO){
        return invoiceService.editInvoice(invoiceDTO, invoiceId);
    }


    @GetMapping
    public List<InvoiceDTO> getInvoices() {
        return invoiceService.getAllInvoices();
    }

}
 */
