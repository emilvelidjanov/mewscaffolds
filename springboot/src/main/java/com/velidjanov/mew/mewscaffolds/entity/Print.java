package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter @ToString
public class Print {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @NonNull
    private String name;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Scaffold> children;
}
