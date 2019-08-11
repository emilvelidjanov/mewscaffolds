package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter @ToString
public class Layer {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @NonNull
    private String name;

    @OneToMany
    @ToString.Exclude
    private List<Fiber> fibers;
}
