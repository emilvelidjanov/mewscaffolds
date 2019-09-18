package com.velidjanov.mew.mewscaffolds.math;

import lombok.*;

import java.util.List;

@NoArgsConstructor @RequiredArgsConstructor @Getter @Setter @ToString
public class ChartData {

    @NonNull
    private Vector2DSerializable origin;

    @NonNull
    private Vector2DSerializable target;
}
