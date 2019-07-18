package com.cvicse.leasing.controller;


import com.cvicse.leasing.exception.TemplateNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.service.TemplateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
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
        try{
            logger.info("Get Template with Template.id " + id);
        return this.templateService.getTemplate(id);
        }catch (TemplateNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found",e);
        }
    }

    @GetMapping("/{id}/contractList")
    public ArrayList<Contract> getContractList(@PathVariable String id){
        try{
            logger.info("Get ContractList with Template.id"+ id);
            return this.templateService.getContractList(id);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found",e);
        }
    }

    @PostMapping
    public Template createTemplate(@RequestBody String name) {
        logger.info("Create Template");
        Template newTemplate=new Template(name);
        return this.templateService.createTemplate(newTemplate);
    }

    @PutMapping("/{id}")
    public Template updateTemplate(@RequestBody Template newTemplate, @PathVariable String id) {
        logger.info("UpdateTemplate with Template.id " + id);
        return this.templateService.updateTemplate(newTemplate, id);
    }

    @DeleteMapping("/{id}")
    public String deleteTemplate(@PathVariable String id) {
        try{
        logger.info("Delete Template with Template.id " + id);
        this.templateService.deleteTemplate(id);
        return "delete "+id+" succeed";
        }catch(TemplateNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found.",e);
        }
    }

}
