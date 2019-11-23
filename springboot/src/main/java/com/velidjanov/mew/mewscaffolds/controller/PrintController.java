package com.velidjanov.mew.mewscaffolds.controller;

import com.velidjanov.mew.mewscaffolds.MewscaffoldsApplication;
import com.velidjanov.mew.mewscaffolds.entity.Print;
import com.velidjanov.mew.mewscaffolds.entity.Scaffold;
import com.velidjanov.mew.mewscaffolds.pojo.GeneratedCode;
import com.velidjanov.mew.mewscaffolds.pojo.TemplateModel;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

@RestController
@RequestMapping("/print")
@CrossOrigin(origins = {"http://mewscaffolds.herokuapp.com"})
@Slf4j
public class PrintController {

    @RequestMapping(value = "/generateCode",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public GeneratedCode generateCode(@RequestBody final TemplateModel templateModel) throws IOException, TemplateException {
        log.debug("generateCode() <<< print: {}", templateModel.getPrint().getId());
        templateModel.setNumberOfScaffolds((long) templateModel.getPrint().getChildren().size());
        templateModel.setHighestNumberOfLayers(calculateHighestNumberOfLayers(templateModel.getPrint()));

        freemarker.template.Configuration cfg = new freemarker.template.Configuration(freemarker.template.Configuration.VERSION_2_3_28);
        cfg.setClassForTemplateLoading(MewscaffoldsApplication.class, "/");
        cfg.setDefaultEncoding("UTF-8");
        Template template = cfg.getTemplate("template.ftl");
        Writer stringWriter = new StringWriter();
        template.process(templateModel, stringWriter);

        GeneratedCode generatedCode = new GeneratedCode();
        generatedCode.setCode(stringWriter.toString());
        return generatedCode;
    }

    private Long calculateHighestNumberOfLayers(final Print print) {
        Long result = 0L;
        for (Scaffold scaffold : print.getChildren()) {
            Long number = (long) scaffold.getChildren().size();
            if (number > result) result = number;
        }
        return result;
    }
}
