package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@NoArgsConstructor @Getter @Setter @ToString
public class Layer {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @NonNull
    private String name;

    @NotNull
    @NonNull
    private Double angle = 0.0d;

    @NotNull
    private Integer fibers;

    @NotNull
    @NonNull
    private Double width;

    @NotNull
    @NonNull
    private Double height;

    @NotNull
    @NonNull
    private Double distanceBetweenFibers;

    public Layer(@NotNull @NonNull String name, @NotNull @NonNull Double angle, @NotNull @NonNull Double width,
                 @NotNull @NonNull Double height, @NotNull @NonNull Double distanceBetweenFibers) {
        this.name = name;
        this.angle = angle;
        this.width = width;
        this.height = height;
        this.distanceBetweenFibers = distanceBetweenFibers;
        this.fibers = (int) (this.height / this.distanceBetweenFibers);
        this.fibers += 1;
    }
}
