package com.velidjanov.mew.mewscaffolds.math;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class SinusoidalChartData extends ChartData {

    private List<Vector2DSerializable> sinePoints = new ArrayList<>();
}
