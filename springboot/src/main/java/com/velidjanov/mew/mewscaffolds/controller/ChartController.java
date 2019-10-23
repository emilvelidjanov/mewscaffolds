package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.entity.Layer;
import com.velidjanov.mew.mewscaffolds.math.ChartData;
import com.velidjanov.mew.mewscaffolds.math.Vector2D;
import com.velidjanov.mew.mewscaffolds.math.Vector2DSerializable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.2.101:4200"})
@Slf4j
public class ChartController {

    // TODO: cleanup!
    // TODO: cleanup return data ?
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
            for (int i = 0; i < layer.getFibers(); i++) {
                // TODO: rotate around scaffold center?
                Vector2D origin = new Vector2D(root);
                origin.rotateBy(layerAngle * (Math.PI / 180));
                Vector2D target = new Vector2D(root.x + layerWidth, root.y);
                target.rotateBy(layerAngle * (Math.PI / 180));
                ChartData fiberChartData = new ChartData(
                        new Vector2DSerializable(origin.x, origin.y),
                        new Vector2DSerializable(target.x, target.y)
                );
                result.get(layer.getId()).add(fiberChartData);
                root.add(0, layer.getDistanceBetweenFibers());
            }
        }
        log.debug("calculateLayerChartData() >>> Map<Long, List<ChartData>>: {}", result);
        return result;
    }
}
