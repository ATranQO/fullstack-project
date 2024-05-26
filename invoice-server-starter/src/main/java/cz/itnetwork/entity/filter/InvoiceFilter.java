package cz.itnetwork.entity.filter;

import lombok.Data;

@Data
public class InvoiceFilter {


    private Long buyerId;
    private Long sellerId;
    private String product;
    private Integer limit = 100;
    private Double maxPrice;
    private Double minPrice;
}

/*
@Data
public class InvoiceFilter {


    private Long buyerId = -1L;           // ID odběratele, výchozí hodnota -1 označuje žádného odběratele
    private Long sellerId = -1L;          // ID dodavatele, výchozí hodnota -1 označuje žádného dodavatele
    private String product = "";          // Název produktu
    private Integer limit = 10;           // Limit počtu faktur, výchozí hodnota 10
    private Double maxPrice = null;       // Maximální cena faktury, null značí neomezeno
    private Double minPrice = null;       // Minimální cena faktury, null značí neomezeno
}
 */
