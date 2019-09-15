package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter @ToString
public class Scaffold {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @NonNull
    private String name;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Layer> children;

    @NotNull
    @NonNull
    private Double positionX = 0.0d;

    @NotNull
    @NonNull
    private Double positionY = 0.0d;
}
