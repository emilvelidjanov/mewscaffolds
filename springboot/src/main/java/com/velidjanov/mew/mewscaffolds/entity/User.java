package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @NonNull
    private String name;

    @NotNull
    @NonNull
    private String email;
}
