package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.entity.Layer;
import com.velidjanov.mew.mewscaffolds.entity.Scaffold;
import com.velidjanov.mew.mewscaffolds.repository.LayerRepository;
import com.velidjanov.mew.mewscaffolds.repository.ScaffoldRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scaffold") @CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class ScaffoldController {

    @Autowired
    private ScaffoldRepository scaffoldRepository;

    @Autowired
    private LayerRepository layerRepository;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Layer addLayerToScaffold(@RequestBody final Long id) {
        Scaffold scaffold = scaffoldRepository.findById(id).orElse(null);
        Layer layer = null;
        if (scaffold != null) {
            layer = layerRepository.saveAndFlush(new Layer("Layer " + (scaffold.getChildren().size() + 1)));
            scaffold.getChildren().add(layer);
            scaffoldRepository.saveAndFlush(scaffold);
        }
        return layer;
    }
}
