package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.InvoiceStatisticDTO;
import cz.itnetwork.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {

    List<InvoiceEntity> findBySeller_IdentificationNumber(String identificationNumber);

    List<InvoiceEntity> findByBuyer_IdentificationNumber(String identificationNumber);

    @Query(value = """
            SELECT new cz.itnetwork.dto.InvoiceStatisticDTO(
                ROUND(COALESCE(SUM(CASE WHEN YEAR(i.issued) = YEAR(CURRENT_DATE) THEN i.price ELSE 0 END), 0.0), 2) AS currentYearSum,
                ROUND(COALESCE(SUM(i.price), 0.0), 2) AS allTimeSum,
                COUNT(i.id) AS invoicesCount
            )
            FROM invoice i
            """)
    InvoiceStatisticDTO getStatistics();

   // List<InvoiceEntity> findByHidden(boolean hidden);



   // List<InvoiceEntity> getFilteredInvoices(InvoiceFilter filter, Pageable pageable);



}




/*
@Repository
public interface InvoiceRepository extends PagingAndSortingRepository<InvoiceEntity, Long>, JpaRepository<InvoiceEntity, Long> {

    List<InvoiceEntity> findBySeller_IdentificationNumber(String identificationNumber);

    List<InvoiceEntity> findByBuyer_IdentificationNumber(String identificationNumber);

    @Query(value = """
            SELECT new cz.itnetwork.dto.InvoiceStatisticDTO(
                ROUND(COALESCE(SUM(CASE WHEN YEAR(i.issued) = YEAR(CURRENT_DATE) THEN i.price ELSE 0 END), 0.0), 2) AS currentYearSum,
                ROUND(COALESCE(SUM(i.price), 0.0), 2) AS allTimeSum,
                COUNT(i.id) AS invoicesCount
            )
            FROM invoice i
            """)
    List<InvoiceStatisticDTO> getStatistics();
 */











/*
    @Query(value = """
        SELECT new cz.itnetwork.dto.InvoiceStatisticDTO(
            ROUND(COALESCE(
                (SELECT SUM(i.price) FROM invoice i 
                WHERE YEAR(i.date) = YEAR(CURRENT_DATE)), 0.0), 2) AS currentYearSum, -- currentYearSum
            ROUND(COALESCE(SUM(i.price), 0.0), 2) AS allTimeSum, -- allTimeSum
            COUNT(i.id) AS invoicesCount -- invoicesCount
        )
        FROM invoice i
        """
    )

    @Query("""
    SELECT NEW cz.itnetwork.dto.InvoiceStatisticDTO(
        SUM(i.price),
        SUM(CASE WHEN YEAR(i.issued) = YEAR(CURRENT_DATE) THEN i.price ELSE 0 END)
        COUNT(i.price))
        FROM invoice i
    """
    )
    InvoiceStatisticDTO getStatistics();
*/
