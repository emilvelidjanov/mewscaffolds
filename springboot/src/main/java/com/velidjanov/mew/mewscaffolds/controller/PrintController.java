package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.entity.Print;
import com.velidjanov.mew.mewscaffolds.entity.Scaffold;
import com.velidjanov.mew.mewscaffolds.repository.PrintRepository;
import com.velidjanov.mew.mewscaffolds.repository.ScaffoldRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/print")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.2.101:4200"})
@Slf4j
public class PrintController {

    @Autowired
    private PrintRepository printRepository;

    @Autowired
    private ScaffoldRepository scaffoldRepository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Print getById(@PathVariable("id") final Long id) {
        log.info("getById() <<< id: {}", id);
        Print print = printRepository.findById(id).orElse(null);
        log.info("getById() >>> Print: {}", print);
        return print;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Print> getAll() {
        log.info("getAll() <<<");
        List<Print> prints = printRepository.findAll();
        log.info("getAll() >>> List<Print>: {}", prints);
        return prints;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Print save(@RequestBody final Print print) {
        log.info("save() <<< print: {}", print);
        Print savedPrint = printRepository.saveAndFlush(print);
        log.info("save() >>> Print: {}", savedPrint);
        return savedPrint;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") final Long id) {
        log.info("delete() <<< id: {}", id);
        printRepository.findById(id).ifPresent(print -> printRepository.delete(print));
    }
}
