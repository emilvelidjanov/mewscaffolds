package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor @Getter @Setter @ToString
public class Layer {

    private Long id;

    @NonNull
    private String name;

    @NonNull
    private Double angle = 0.0d;

    private Integer fibers;

    @NonNull
    private Double width;

    @NonNull
    private Double height;

    @NonNull
    private Double distanceBetweenFibers;

    @NonNull
    private Boolean isSinusoidal;

    @NonNull
    private Double amplitude;

    @NonNull
    private Double phase;

    @NonNull
    private Double phaseShift;

    @NonNull
    private Double temperature;

    @NonNull
    private Double pressure;

    @NonNull
    private Double speed;

    @NonNull
    private Double loopSpeed;

    @NonNull
    private Double loopRadius;

    @NonNull
    private Double waitIn;

    @NonNull
    private Double waitOut;

    @NonNull
    private Double distanceZ;

    public Layer(@NonNull Double height, @NonNull Double distanceBetweenFibers) {
        this.height = height;
        this.distanceBetweenFibers = distanceBetweenFibers;
        this.fibers = (int) (this.height / this.distanceBetweenFibers);
        this.fibers += 1;
    }
}
