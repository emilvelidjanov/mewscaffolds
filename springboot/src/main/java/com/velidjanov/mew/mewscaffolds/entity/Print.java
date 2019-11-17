package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter @ToString
public class Print {

    private Long id;

    @NonNull
    private String name;

    @ToString.Exclude
    private List<Scaffold> children;
}
