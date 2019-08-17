package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter @ToString
public class Fiber {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @NonNull
    private String name;
}
