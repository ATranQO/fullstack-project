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
package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticDTO;
import cz.itnetwork.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/persons")
    public PersonDTO addPerson(@RequestBody PersonDTO personDTO) {
        return personService.addPerson(personDTO);
    }

    @GetMapping("/persons")
    public List<PersonDTO> getPersons() {
        return personService.getAll();
    }


    @DeleteMapping("/persons/{personId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable Long personId) {
        personService.removePerson(personId);
    }

    @GetMapping("/persons/{personId}")
    public PersonDTO getPerson(@PathVariable Long personId) {
        return personService.getPersonById(personId);
    }

    @PutMapping("/persons/{personId}")
    public PersonDTO editPerson(@PathVariable long personId, @RequestBody PersonDTO personDTO) {
        return personService.editPerson(personId, personDTO);
    }

    @GetMapping("/identification/{identificationNumber}/sales")
    public List<InvoiceDTO> getSales(@PathVariable String identificationNumber) {
        return personService.getSales(identificationNumber);
    }


    @GetMapping("/identification/{identificationNumber}/purchases")
    public List<InvoiceDTO> getPurchases(@PathVariable String identificationNumber) {
        return personService.getPurchases(identificationNumber);
    }

    /*
    @GetMapping("/identification/{identificationNumber}/purchases")
    public List<InvoiceDTO> getPurchases(@PathVariable String identificationNumber) {
        return personService.getPurchases(identificationNumber);
    }
     */

    @GetMapping("/persons/statistics")
    public List<PersonStatisticDTO> getStatistics() {
        return personService.getStatistics();
    }



}





    /*
    @GetMapping("/api/persons/statistics")
    public List<PersonStatisticDTO> getStatistics() {
        return personService.getStatistics();
    }
*/







/*
@GetMapping("invoices/statistics")
    public List<PersonStatisticDTO> getStatistics() {
        return personService.getStatistics();
    }
 */


/*


package cz.itnetwork.controller;

        import cz.itnetwork.dto.InvoiceDTO;
        import cz.itnetwork.dto.PersonDTO;
        import cz.itnetwork.dto.PersonStatisticDTO;
        import cz.itnetwork.service.PersonService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/persons")
    public PersonDTO addPerson(@RequestBody PersonDTO personDTO) {
        return personService.addPerson(personDTO);
    }

    @GetMapping("/persons")
    public List<PersonDTO> getPersons() {
        return personService.getAll();
    }

    @DeleteMapping("/persons/{personId}")
    public void deletePerson(@PathVariable Long personId) {
        personService.removePerson(personId);
    }

    @GetMapping("/persons/{personId}")
    public PersonDTO getPerson(@PathVariable Long personId) {
        return personService.getPersonById(personId);
    }

    @PutMapping("/persons/{personId}")
    public PersonDTO editPerson(@PathVariable long personId, @RequestBody PersonDTO personDTO) {
        return personService.editPerson(personId, personDTO);
    }

    @GetMapping("/identification/{identificationNumber}/sales")
    public List<InvoiceDTO> getSales(@PathVariable String identificationNumber) {
        return personService.getSales(identificationNumber);
    }

    @GetMapping("/identification/{identificationNumber}/purchases")
    public List<InvoiceDTO> getPurchases(@PathVariable String identificationNumber) {
        return personService.getPurchases(identificationNumber);
    }

    @GetMapping
    public List<PersonStatisticDTO> getStatistics() {
        return personService.getStatistics();
    }
}
 */







