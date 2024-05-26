package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import cz.itnetwork.entity.repository.specification.InvoiceSpecification;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PersonRepository personRepository;

    /*
     @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);

        PersonEntity buyer = entity.getBuyer();
        Long buyerId = buyer.getId();
        PersonEntity foundBuyer = personRepository.getReferenceById(buyerId);
        entity.setBuyer(foundBuyer);

        entity.setSeller(personRepository.getReferenceById(invoiceDTO.getSeller().getId()));

        entity = invoiceRepository.save(entity);
        return invoiceMapper.toDTO(entity);
    }
     */
    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity = invoiceRepository.save(entity);

        // Nastaví kupujícího a prodávajícího podle jejich ID
        entity.setBuyer(personRepository.getReferenceById(invoiceDTO.getBuyer().getId()));
        entity.setSeller(personRepository.getReferenceById(invoiceDTO.getSeller().getId()));


        return invoiceMapper.toDTO(entity);
    }


    @Override
    public void removeInvoice(long invoiceId) {
        try {
            InvoiceEntity invoice = fetchInvoiceById(invoiceId);
            invoice.setHidden(true);

            invoiceRepository.save(invoice);
        } catch (NotFoundException ignored) {

        }
    }




        @Override
        public InvoiceDTO getInvoiceById ( long invoiceId){
            InvoiceEntity invoiceEntity = fetchInvoiceById(invoiceId);

            return invoiceMapper.toDTO(invoiceEntity);

        }


    @Override
    public InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long invoiceId) {
        if (!personRepository.existsById(invoiceId)){
            throw new EntityNotFoundException("Invoice with id" + invoiceId + "wasn't found in the database.");
        }


        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity.setId(invoiceId);
        InvoiceEntity saved = invoiceRepository.save(entity);
        return invoiceMapper.toDTO(saved);
    }





         /*
        entity.setSeller(personRepository.getReferenceById(invoiceDTO.getSeller().getId()));
        entity.setBuyer(personRepository.getReferenceById(invoiceDTO.getBuyer().getId()));
        */


/*
        @Override
        public List<InvoiceDTO> getAllInvoices (InvoiceFilter invoiceFilter){
            InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);

            return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, invoiceFilter.getLimit()))
                    .stream()
                    .map(invoiceMapper::toDTO)
                    .collect(Collectors.toList());
        }

 */

    @Override
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);

        return invoiceRepository.findAll((root, query, criteriaBuilder) -> {
                    Predicate predicate = invoiceSpecification.toPredicate(root, query, criteriaBuilder);
                    // Přidání podmínky pro ne-skryté faktury
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("hidden"), false));
                    return predicate;
                }, PageRequest.of(0, invoiceFilter.getLimit()))
                .stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }





    @Override
        public InvoiceStatisticDTO getStatistics () {
            return invoiceRepository.getStatistics();
        }






    private InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }

}

/*
@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PersonRepository personRepository;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);

        PersonEntity buyer = entity.getBuyer();
        Long buyerId = buyer.getId();

        PersonEntity foundBuyer = personRepository.getReferenceById(buyerId);
        entity.setBuyer(foundBuyer);

        entity.setSeller(personRepository.getReferenceById(entity.getSeller().getId()));

        entity = invoiceRepository.save(entity);
        return invoiceMapper.toDTO(entity);
    }

    @Override
    public void removeInvoice(long invoiceId) {
        invoiceRepository.findById(invoiceId).ifPresent(invoice -> {
            invoiceRepository.save(invoice);
        });
    }

    @Override
    public InvoiceDTO getInvoiceById(long invoiceId) {
        InvoiceEntity invoiceEntity = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + invoiceId + " wasn't found in the database."));
        return invoiceMapper.toDTO(invoiceEntity);

    }

    @Override
    public InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, long invoiceId) {
        if (!personRepository.existsById(invoiceId)){
            throw new EntityNotFoundException("Invoice with id" + invoiceId + "wasn't found in the database.");
        }


        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity.setId(invoiceId);
        InvoiceEntity saved = invoiceRepository.save(entity);
        return invoiceMapper.toDTO(saved);
    }

    @Override
    public List<InvoiceDTO> getAllInvoices() {
        return invoiceRepository.findAll()
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .collect(Collectors.toList());

    }

    @Override
    public List<InvoiceStatisticDTO> getStatistics() {
        return invoiceRepository.getStatistics();
    }

}
 */