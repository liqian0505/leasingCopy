package com.cvicse.leasing.controller;


import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.service.TemplateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {
    @Autowired
    private TemplateService templateService;

    private static final Logger logger = LoggerFactory.getLogger(TemplateController.class);

    @GetMapping
    public List<Template> getTemplates() {
        logger.info("All Templates requested");
        return templateService.getAllTemplate();
    }

    @GetMapping("/{id}")
    public Template getTemplate(@PathVariable String id) {
        logger.info("Get Template with Template.id " + id);
        return this.templateService.getTemplate(id);
    }

    @PostMapping
    public Template createTemplate(@RequestBody Template newTemplate) {
        logger.info("Create Template");
        return this.templateService.createTemplate(newTemplate);
    }

    @PutMapping("/{id}")
    public Template updateTemplate(@RequestBody Template newTemplate, @PathVariable String id) {
        logger.info("UpdateTemplate with Template.id " + id);
        return this.templateService.updateTemplate(newTemplate, id);
    }

    @DeleteMapping("/{id}")
    public void deleteTemplate(@PathVariable String id) {
        logger.info("Delete Template with Template.id " + id);
        this.templateService.deleteTemplate(id);
    }

}
