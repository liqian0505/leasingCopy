package com.cvicse.leasing.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.exception.ContractNotFoundException;
import com.cvicse.leasing.exception.TemplateNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.repository.ContractRepository;
import com.cvicse.leasing.repository.TemplateRepository;
import org.aspectj.weaver.Shadow;
import org.javers.core.Changes;
import org.javers.core.Javers;
import org.javers.core.diff.Change;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.javers.repository.jql.JqlQuery;
import org.javers.repository.jql.QueryBuilder;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.List;

/**
* Authored by Tc
**/
@Service
public class TemplateService {
    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private Javers javers;

    private static final Logger logger = LoggerFactory.getLogger(TemplateService.class);

    public List<Template> getAllTemplate(){
        List<Template> templateList = templateRepository.findAll();
        logger.info("Templates returned");
        return templateList;
    }

    public Template getTemplate(String id) throws TemplateNotFoundException {
        if(!this.templateRepository.findById(id).isPresent()) {
            logger.info("Template Not Found in templateRepository.");
            throw new TemplateNotFoundException("Template Not Found in templateRepository.");
        }
        logger.info("Template "+id+" returned");
        return this.templateRepository.findById(id).get();
    }


    public Template createTemplate(Template newTemplate) {
        logger.info("Template saved");
        return templateRepository.save(newTemplate);
    }

    public Template updateTemplate(JSONObject content, String id) {
        this.templateRepository.findById(id).ifPresent(template -> {
            template.content = content;
            this.templateRepository.save(template);
        });
        return this.templateRepository.findById(id).get();
    }

    public void deleteTemplate(String id) throws TemplateNotFoundException {
        if(!this.templateRepository.findById(id).isPresent())
            throw new TemplateNotFoundException("Template Not Found in templateRepository.");
        logger.info("Template deleted");
        this.templateRepository.deleteById(id);
    }


    public ArrayList<Contract> getContractList(String id) throws Exception {
        if(!this.templateRepository.findById(id).isPresent()) {
            logger.info("Template Not Found in templateRepository.");
            throw new TemplateNotFoundException("Template Not Found in templateRepository.");
        }
        ArrayList<Contract> contracts = new ArrayList<>();
        logger.info(this.templateRepository.findById(id).get().contractIdList.toString());
        for(String contractId: this.templateRepository.findById(id).get().contractIdList) {
            if(this.contractRepository.findById(contractId).isPresent()) {
                logger.info("contract "+ contractId + " existed.");
                contracts.add(this.contractRepository.findById(contractId).get());
            }
            else{
                logger.info("Contract "+contractId+ " Not Found in contractRepository.");
                throw new ContractNotFoundException("Contract Not Found in contractRepository.");
            }
        }

        logger.info("return contractList.");
        return contracts;
    }

    public void addContract(String templateId,String contractId) throws Exception{
        if(this.getTemplate(templateId).contractIdList.contains(contractId)){
            throw new Exception("contract has existed");
        }
        else{
            logger.info("add new contractId");
            Template template = this.getTemplate(templateId);
            template.contractIdList.add(contractId);
            this.templateRepository.save(template);
        }
    }

    public void deleteContract(String templateId,String contractId) throws Exception{
        if(this.getTemplate(templateId).contractIdList.contains(contractId)){
            Template template = this.getTemplate(templateId);
            template.contractIdList.remove(contractId);
            this.templateRepository.save(template);
        }
        else{
            throw new Exception("contract can not found in template");
        }
    }

    public JSONArray trackTemplateChangesWithJavers(String templateId) throws TemplateNotFoundException{
        Template template = this.getTemplate(templateId);
        JSONArray jsonArray = new JSONArray();
        JqlQuery jqlQuery= QueryBuilder.byInstance(template).build();
        List<CdoSnapshot> snapshots = javers.findSnapshots(jqlQuery);
        for(CdoSnapshot snapshot:snapshots){
           // System.out.println(javers.getJsonConverter().toJson(snapshot));
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("commitId",snapshot.getCommitId().getMajorId());
            jsonObject.put("commitDate", snapshot.getCommitMetadata().getCommitDate());
            jsonObject.put("state", JSON.parseObject(javers.getJsonConverter().toJson(snapshot.getState()),Template.class));
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    public Template getTemplateWithJaversCommitId(String templateId, String commitId) throws TemplateNotFoundException{
        Template template = this.getTemplate(templateId);
        JqlQuery jqlQuery= QueryBuilder.byInstance(template).build();
        List<CdoSnapshot> snapshots = javers.findSnapshots(jqlQuery);
        for(CdoSnapshot snapshot:snapshots){
            if(snapshot.getCommitId().getMajorId()== Integer.parseInt(commitId))
                return JSON.parseObject(javers.getJsonConverter().toJson(snapshot.getState()),Template.class);
        }
        return null;
    }
}
