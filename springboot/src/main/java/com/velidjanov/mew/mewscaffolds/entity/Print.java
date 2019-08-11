package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;
import org.hibernate.annotations.Fetch;

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

    @OneToMany
    @ToString.Exclude
    private List<Scaffold> scaffolds;
}
