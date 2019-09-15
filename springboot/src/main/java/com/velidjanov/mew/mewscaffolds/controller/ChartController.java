package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.entity.Fiber;
import com.velidjanov.mew.mewscaffolds.entity.Layer;
import com.velidjanov.mew.mewscaffolds.math.Vector2D;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.2.101:4200"})
@Slf4j
public class ChartController {

    @RequestMapping(value = "/calculate", method = RequestMethod.POST)
    public List<Vector2D[]> calculateLayerChartData(@RequestBody final List<Layer> layers) {
        log.info("calculateLayerChartData() <<< List<Layer>: {}", layers);
        List<Vector2D[]> result = new ArrayList<>();
        for (Layer layer : layers) {
            Double layerWidth = 0.0d;
            Double layerHeight = 0.0d;
            List<Fiber> fibers = layer.getChildren();
            for (Fiber fiber : fibers) {
                if (fiber.getLength() > layerWidth) layerWidth = fiber.getLength();
                layerHeight += fiber.getDistanceToNextFiber();
            }
            if (fibers.size() > 0) layerHeight -= fibers.get(fibers.size() - 1).getDistanceToNextFiber();

            Vector2D root = new Vector2D(layerWidth / 2, layerHeight / 2);
            for (Fiber fiber: fibers) {
                Vector2D origin = new Vector2D(root);
                origin.rotateBy(layer.getAngle());
                Vector2D target = new Vector2D(root.x + fiber.getLength(), root.y);
                target.rotateBy(layer.getAngle());
                Vector2D[] fiberChartData = {origin, target};
                result.add(fiberChartData);
                root.add(fiber.getDistanceToNextFiber(), 0);
            }
        }
//        result.forEach(item -> {
//            log.debug("Vector2D[]: [1]: {} [2]: {}", item[0], item[1]);
//        });
        log.info("calculateLayerChartData() >>> List<Vector2D[]>: {}", result);
        return result;
    }
}
