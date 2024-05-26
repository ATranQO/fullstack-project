/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */
package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private InvoiceMapper invoiceMapper;
    @Autowired
    private InvoiceRepository invoiceRepository;

    public PersonDTO addPerson(PersonDTO personDTO) {
        PersonEntity entity = personMapper.toEntity(personDTO);
        entity = personRepository.save(entity);

        return personMapper.toDTO(entity);
    }

    @Override
    public void removePerson(long personId) {
        try {
            PersonEntity person = fetchPersonById(personId);
            person.setHidden(true);

            personRepository.save(person);
        } catch (NotFoundException ignored) {

        }
    }

    @Override
    public List<PersonDTO> getAll() {
        return personRepository.findByHidden(false)
                .stream()
                .map(i -> personMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public PersonDTO getPersonById(long personId) {
        PersonEntity personEntity = fetchPersonById(personId);

        return personMapper.toDTO(personEntity);
    }

    @Override
    public PersonDTO editPerson(long personId, PersonDTO personDTO) {
        PersonEntity oldEntity = fetchPersonById(personId);
        oldEntity.setHidden(true);
        personRepository.save(oldEntity);

        PersonEntity entity = personMapper.toEntity(personDTO);
        personRepository.save(entity);
        return personMapper.toDTO(entity);
    }

    @Override
    public List<InvoiceDTO> getPurchases(String identificationNumber) {
        List<InvoiceEntity> invoiceEntities = invoiceRepository.findByBuyer_IdentificationNumber(identificationNumber);
        return invoiceMapper.toDTOs(invoiceEntities);
    }

    @Override
    public List<InvoiceDTO> getSales(String identificationNumber) {
        List<InvoiceEntity> invoiceEntities = invoiceRepository.findBySeller_IdentificationNumber(identificationNumber);
        return invoiceMapper.toDTOs(invoiceEntities);
    }


    @Override
    public List<PersonStatisticDTO> getStatistics(){
        return personRepository.getStatistics();
    }



    private PersonEntity fetchPersonById(long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Person with id " + id + " wasn't found in the database."));
    }

}


/*
@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private InvoiceMapper invoiceMapper;
    @Autowired
    private InvoiceRepository invoiceRepository;

    public PersonDTO addPerson(PersonDTO personDTO) {
        PersonEntity entity = personMapper.toEntity(personDTO);
        entity = personRepository.save(entity);

        return personMapper.toDTO(entity);
    }

    @Override
    public void removePerson(long personId) {
        try {
            PersonEntity person = fetchPersonById(personId);
            person.setHidden(true);

            personRepository.save(person);
        } catch (NotFoundException ignored) {

        }
    }

    @Override
    public List<PersonDTO> getAll() {
        return personRepository.findByHidden(false)
                .stream()
                .map(i -> personMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public PersonDTO getPersonById(long personId) {
        PersonEntity personEntity = fetchPersonById(personId);

        return personMapper.toDTO(personEntity);
    }

    @Override
    public PersonDTO editPerson(Long personId, PersonDTO changeDTO) {
        PersonEntity oldEntity = fetchPersonById(personId);
        oldEntity.setHidden(true);
        personRepository.save(oldEntity);

        PersonEntity entity = personMapper.toEntity(changeDTO);
        personRepository.save(entity);
        return personMapper.toDTO(entity);
    }

    @Override
    public List<InvoiceDTO> getPurchases(String identificationNumber) {
        List<InvoiceEntity> invoiceEntities = invoiceRepository.findByBuyer_IdentificationNumber(identificationNumber);
        return invoiceMapper.toDTOs(invoiceEntities);
    }

    @Override
    public List<InvoiceDTO> getSales(String identificationNumber) {
        List<InvoiceEntity> invoiceEntities = invoiceRepository.findBySeller_IdentificationNumber(identificationNumber);
        return invoiceMapper.toDTOs(invoiceEntities);
    }


    @Override
    public List<PersonStatisticDTO> getStatistics(){return personRepository.getStatistics();}



    private PersonEntity fetchPersonById(long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Person with id " + id + " wasn't found in the database."));
    }

}
 */
