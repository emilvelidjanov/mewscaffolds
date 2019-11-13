package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.MewscaffoldsApplication;
import com.velidjanov.mew.mewscaffolds.entity.Print;
import com.velidjanov.mew.mewscaffolds.pojo.GeneratedCode;
import com.velidjanov.mew.mewscaffolds.repository.PrintRepository;
import com.velidjanov.mew.mewscaffolds.repository.ScaffoldRepository;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

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
    public GeneratedCode generateCode(@RequestBody final Print print) throws IOException, TemplateException {
        log.debug("generateCode() <<< print: {}", print.getId());
        freemarker.template.Configuration cfg = new freemarker.template.Configuration(freemarker.template.Configuration.VERSION_2_3_28);
        cfg.setClassForTemplateLoading(MewscaffoldsApplication.class, "/");
        cfg.setDefaultEncoding("UTF-8");
        Template template = cfg.getTemplate("template.ftl");
        Writer stringWriter = new StringWriter();
        template.process(print, stringWriter);
        GeneratedCode generatedCode = new GeneratedCode();
        generatedCode.setCode(stringWriter.toString());
        return generatedCode;
    }
}
