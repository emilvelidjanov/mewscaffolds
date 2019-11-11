package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.entity.Print;
import com.velidjanov.mew.mewscaffolds.repository.PrintRepository;
import com.velidjanov.mew.mewscaffolds.repository.ScaffoldRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

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
        log.debug("getById() <<< id: {}", id);
        Print print = printRepository.findById(id).orElse(null);
        log.debug("getById() >>> Print: {}", print);
        return print;
    }

    @RequestMapping(value = "/generateCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, byte[]> generateCode(@RequestBody final Print print) throws IOException {
        log.debug("generateCode() <<< print: {}", print.getId());
        Map<String, byte[]> result = new HashMap<>();
        InputStream inputStream = getClass()
                .getClassLoader().getResourceAsStream("gcode/template.txt");
        if (inputStream != null) {
            result.put("code", inputStream.readAllBytes());
        }
        return result;
    }
}
