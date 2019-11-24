package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.entity.Layer;
import com.velidjanov.mew.mewscaffolds.math.ChartData;
import com.velidjanov.mew.mewscaffolds.math.SinusoidalChartData;
import com.velidjanov.mew.mewscaffolds.math.Vector2D;
import com.velidjanov.mew.mewscaffolds.math.Vector2DSerializable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = {"http://mewscaffolds.herokuapp.com", "http://localhost:4200"})
@Slf4j
public class ChartController {

    @RequestMapping(value = "/calculate", method = RequestMethod.POST)
    public Map<Long, List<ChartData>> calculateLayerChartData(@RequestBody final List<Layer> layers) {
        log.debug("calculateLayerChartData() <<< List<Layer>: {}", layers);
        Map<Long, List<ChartData>> result = new HashMap<>();
        for (Layer layer : layers) {
            result.put(layer.getId(), new ArrayList<>());
            Double layerWidth = layer.getWidth();
            Double layerHeight = layer.getHeight();
            double layerAngle = layer.getAngle() == null ? 0 : layer.getAngle();
            Vector2D root = new Vector2D(-layerWidth / 2, -layerHeight / 2);
            if (!layer.getIsSinusoidal()) {
                for (int i = 0; i < layer.getFibers(); i++) {
                    Vector2D origin = new Vector2D(root);
                    origin.rotateBy(Math.toRadians(layerAngle));
                    Vector2D target = new Vector2D(root.x + layerWidth, root.y);
                    target.rotateBy(Math.toRadians(layerAngle));
                    ChartData fiberChartData = new ChartData(
                            new Vector2DSerializable(origin.x, origin.y),
                            new Vector2DSerializable(target.x, target.y)
                    );
                    result.get(layer.getId()).add(fiberChartData);
                    root.add(0, layer.getDistanceBetweenFibers());
                }
            }
            else {
                Double phaseStep = layer.getPhase() / 8d;
                for (int i = 0; i < layer.getFibers(); i++) {
                    SinusoidalChartData sinusoidalChartData = new SinusoidalChartData();
                    Double progress = 0d;
                    Double goal = layer.getWidth();
                    Double x = 0d;
                    Double y = 0d;
                    while (progress <= goal) {
                        x = progress;
                        y = Math.sin(Math.toRadians(x + layer.getPhaseShift()) / layer.getPhase() * 360) * layer.getAmplitude();
                        Vector2D point = new Vector2D(x + root.x, y + root.y);
                        point.rotateBy(Math.toRadians(layerAngle));
                        sinusoidalChartData.getSinePoints().add(new Vector2DSerializable(point.x, point.y));
                        progress += phaseStep;
                    }
                    result.get(layer.getId()).add(sinusoidalChartData);
                    root.add(0, layer.getDistanceBetweenFibers());
                }
            }
        }
        log.debug("calculateLayerChartData() >>> Map<Long, List<ChartData>> size: {}", result.size());
        return result;
    }
}
