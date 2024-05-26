package cz.itnetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonStatisticDTO {

    private Long id;
    private String name;
    private double roundedSum; // Rounded sum of invoice prices
}

/*
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonStatisticDTO {
    private Long id;
    private String name;
    private double roundedSum; // Rounded sum of invoice prices
}
 */


