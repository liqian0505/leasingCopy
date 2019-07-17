package com.cvicse.leasing.service;

import com.cvicse.leasing.exception.ContractNotFoundException;
import com.cvicse.leasing.exception.TemplateNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.repository.ContractRepository;
import com.cvicse.leasing.repository.TemplateRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.List;

/*
* Authored by Tc
*/
@Service
public class TemplateService {
    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private ContractRepository contractRepository;

    private static final Logger logger = LoggerFactory.getLogger(TemplateService.class);

    public List<Template> getAllTemplate(){
        List<Template> templateList = templateRepository.findAll();
        logger.info("Templates returned");
        return templateList;
    }

    public Template getTemplate(String id) throws TemplateNotFoundException {
        if(!this.templateRepository.findById(id).isPresent())
            throw new TemplateNotFoundException("Template Not Found in templateRepository.");

        logger.info("Template "+id+" returned");
        return this.templateRepository.findById(id).get();
    }


    public Template createTemplate(Template newTemplate) {
        logger.info("Template saved");
        return templateRepository.save(newTemplate);
    }

    public Template updateTemplate(Template newTemplate, String id) {
        this.templateRepository.findById(id).ifPresent(Template -> {
            Template.name = newTemplate.name;
            this.templateRepository.save(Template);
        });
        return newTemplate;
    }

    public void deleteTemplate(String id) throws TemplateNotFoundException {
        if(!this.templateRepository.findById(id).isPresent())
            throw new TemplateNotFoundException("Template Not Found in templateRepository.");
        logger.info("Template deleted");
        this.templateRepository.deleteById(id);
    }

    public ArrayList<Contract> getContractList(String id) throws Exception {
        if(!this.templateRepository.findById(id).isPresent())
            throw new TemplateNotFoundException("Template Not Found in templateRepository.");
        ArrayList<Contract> contracts = new ArrayList<>();
        for(String contractId: this.templateRepository.findById(id).get().contractIdList) {
            if(this.contractRepository.findById(contractId).isPresent())
                contracts.add(this.contractRepository.findById(contractId).get());
            else
                throw new ContractNotFoundException("Contract Not Found in contractRepository.");
        }
        return contracts;
    }
}
