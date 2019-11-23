package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import java.util.List;

@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter @ToString
public class Scaffold {

    private Long id;

    @NonNull
    private String name;

    @ToString.Exclude
    private List<Layer> children;

    @NonNull
    private Double positionX = 0.0d;

    @NonNull
    private Double positionY = 0.0d;
}
