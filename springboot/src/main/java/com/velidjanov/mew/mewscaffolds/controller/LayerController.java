package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.entity.Fiber;
import com.velidjanov.mew.mewscaffolds.entity.Layer;
import com.velidjanov.mew.mewscaffolds.repository.FiberRepository;
import com.velidjanov.mew.mewscaffolds.repository.LayerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/layer") @CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class LayerController {

    @Autowired
    private LayerRepository layerRepository;

    @Autowired
    private FiberRepository fiberRepository;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Fiber addFiberToLayer(@RequestBody final Long id) {
        Layer layer = layerRepository.findById(id).orElse(null);
        Fiber fiber = null;
        if (layer != null) {
            fiber = fiberRepository.saveAndFlush(new Fiber("Fiber " + (layer.getChildren().size() + 1)));
            layer.getChildren().add(fiber);
            layerRepository.saveAndFlush(layer);
        }
        return fiber;
    }
}
