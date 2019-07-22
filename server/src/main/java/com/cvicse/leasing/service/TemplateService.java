package com.cvicse.leasing.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.exception.TemplateNotFoundException;
import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.payload.TemplateRequest;
import com.cvicse.leasing.repository.TemplateRepository;
import org.javers.core.Javers;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.javers.repository.jql.JqlQuery;
import org.javers.repository.jql.QueryBuilder;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import java.util.List;

/**
* Authored by Tc
**/
@Service
public class TemplateService {
    @Autowired
    private TemplateRepository templateRepository;

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
            logger.info("TemplateRequest Not Found in templateRepository.");
            throw new TemplateNotFoundException("TemplateRequest Not Found in templateRepository.");
        }
        logger.info("TemplateRequest "+id+" returned");
        return this.templateRepository.findById(id).get();
    }


    public Template createTemplate(TemplateRequest templateRequest) {
        logger.info("TemplateRequest saved");
        logger.info(templateRequest.getContent().toJSONString());
        Template template =new Template(templateRequest.getContent());
        return templateRepository.save(template);
    }

    public Template updateTemplate(TemplateRequest templateRequest, String id) throws TemplateNotFoundException{
        this.templateRepository.findById(id).ifPresent(template -> {
            template.content = templateRequest.getContent();
            this.templateRepository.save(template);
        });
        if(this.templateRepository.findById(id).isPresent()){
        return this.templateRepository.findById(id).get();
        }else {
            throw new TemplateNotFoundException("TemplateRequest Not Found in templateRepository.");
        }
    }

    public void deleteTemplate(String id) throws TemplateNotFoundException {
        if(!this.templateRepository.findById(id).isPresent())
            throw new TemplateNotFoundException("TemplateRequest Not Found in templateRepository.");
        logger.info("TemplateRequest deleted");
        this.templateRepository.deleteById(id);
    }

    public JSONArray trackTemplateChangesWithJavers(String templateId) throws TemplateNotFoundException{
        Template template = this.getTemplate(templateId);
        JSONArray jsonArray = new JSONArray();
        JqlQuery jqlQuery= QueryBuilder.byInstance(template).build();
        List<CdoSnapshot> snapshots = javers.findSnapshots(jqlQuery);
        for(CdoSnapshot snapshot:snapshots){
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
