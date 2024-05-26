package cz.itnetwork.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer invoiceNumber;

    @Column(nullable = false)
    private String product;

    private String note;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private Integer vat;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private LocalDate issued;

    @ManyToOne(fetch = FetchType.LAZY)
    private PersonEntity buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    private PersonEntity seller;

    private boolean hidden = false;
}

/*
@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer invoiceNumber;

    @Column(nullable = false)
    private String product;

    private String note;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private Integer vat;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private LocalDate issued;

    @ManyToOne(fetch = FetchType.LAZY)
    private PersonEntity buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    private PersonEntity seller;
}
 */