package cz.itnetwork.entity.repository.specification;

import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.InvoiceEntity_;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.PersonEntity_;
import cz.itnetwork.entity.filter.InvoiceFilter;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
public class InvoiceSpecification implements Specification<InvoiceEntity> {

    private final InvoiceFilter filter;

    @Override
    public Predicate toPredicate(Root<InvoiceEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getSellerId() != null) {
            Join<InvoiceEntity, PersonEntity> sellerJoin = root.join(InvoiceEntity_.SELLER);
            predicates.add(criteriaBuilder.equal(sellerJoin.get(PersonEntity_.ID),
                    filter.getSellerId()));
        }

        if (filter.getBuyerId() != null) {
            Join<InvoiceEntity, PersonEntity> buyerJoin = root.join(InvoiceEntity_.BUYER);
            predicates.add(criteriaBuilder.equal(buyerJoin.get(PersonEntity_.ID),
                    filter.getBuyerId()));
        }

        if(filter.getMinPrice()!=null){
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get(InvoiceEntity_.PRICE),
                    filter.getMinPrice()));
        }

        if (filter.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get(InvoiceEntity_.PRICE),
                    filter.getMaxPrice()));
        }

        if (filter.getProduct() != null){
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(InvoiceEntity_.PRODUCT)), String.format("%%%s%%",
                    filter.getProduct().toLowerCase())));
        }


        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}


/*
@RequiredArgsConstructor
public class InvoiceSpecification implements Specification<InvoiceEntity> {

    private final InvoiceFilter filter;

    @Override
    public Predicate toPredicate(Root<InvoiceEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getSellerId() != null) {
            Join<InvoiceEntity, PersonEntity> sellerJoin = root.join(InvoiceEntity_.SELLER);
            predicates.add(criteriaBuilder.equal(sellerJoin.get(PersonEntity_.ID),
                    filter.getSellerId()));
        }

        if (filter.getBuyerId() != null) {
            Join<InvoiceEntity, PersonEntity> buyerJoin = root.join(InvoiceEntity_.BUYER);
            predicates.add(criteriaBuilder.equal(buyerJoin.get(PersonEntity_.ID),
                    filter.getBuyerId()));
        }

        if(filter.getMinPrice()!=null){
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get(InvoiceEntity_.PRICE),
                    filter.getMinPrice()));
        }

        if (filter.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get(InvoiceEntity_.PRICE),
                    filter.getMaxPrice()));
        }

        if (filter.getProduct() != null){
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(InvoiceEntity_.PRODUCT)), String.format("%%%s%%",
                    filter.getProduct().toLowerCase())));
        }


        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
 */