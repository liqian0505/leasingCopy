package com.cvicse.leasing.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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

    @PostMapping("/new")
    public List<Template> createTemplate(@RequestBody JSONObject content) {
        logger.info("Create Template");
        Template newTemplate=new Template(content);
        this.templateService.createTemplate(newTemplate);
        return templateService.getAllTemplate();
    }

    @PutMapping("/{id}")
    public Template updateTemplate(@RequestBody JSONObject content, @PathVariable String id) {
        logger.info("UpdateTemplate with Template.id " + id);
        return this.templateService.updateTemplate(content, id);
    }

    @DeleteMapping("/{id}")
    public List<Template> deleteTemplate(@PathVariable String id) {
        try{
        logger.info("Delete Template with Template.id " + id);
        this.templateService.deleteTemplate(id);
        return this.templateService.getAllTemplate();
        }catch(TemplateNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found.",e);
        }
    }

//    @GetMapping("/{id}/commits")
//    public JSONArray getTemplateChanges(@PathVariable String id){
//        try{
//            logger.info("Get Template commits with Template.id "+ id);
//            return this.templateService.trackTemplateChangesWithJavers(id);
//        }catch(TemplateNotFoundException e){
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found.",e);
//        }
//    }

    @GetMapping("/{id}/commits")
    public JSONArray getTemplateWithCommitId(@PathVariable String id, @RequestParam(value = "commitId",defaultValue = "null") String commitId){
        if(commitId.equals("null")){
            try{
                logger.info("Get Template commits with Template.id "+ id);
                return this.templateService.trackTemplateChangesWithJavers(id);
            }catch(TemplateNotFoundException e){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found.",e);
            }
        }else{
            try{
                logger.info("Cet Template commit with commitId"+commitId);
                JSONArray jsonArray = new JSONArray();
                jsonArray.add(this.templateService.getTemplateWithJaversCommitId(id,commitId));
                return jsonArray;
            }catch (TemplateNotFoundException e){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found.",e);
            }
        }
    }


    @RequestMapping(value = "*", method = { RequestMethod.GET, RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT })
    @ResponseBody
    public String allFallback() {
        return "Fallback for All Requests";
    }

}
