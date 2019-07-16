package com.cvicse.leasing.service;

import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.repository.TemplateRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import java.util.List;

/*
* Authored by Tc
*/
@Service
public class TemplateService {
    @Autowired
    private TemplateRepository templateRepository;

    private static final Logger logger = LoggerFactory.getLogger(TemplateService.class);

    public List<Template> getAllTemplate() {
        List<Template> templateList = templateRepository.findAll();
        logger.info("Templates returned");
        return templateList;
    }

    public Template getTemplate(String id) {
        return this.templateRepository.findById(id).get();
    }

    public Template createTemplate(Template newTemplate) {
        logger.info("Template saved");
        return templateRepository.save(newTemplate);
    }

    public Template updateTemplate(Template newTemplate, String id) {
        this.templateRepository.findById(id).ifPresent(Template -> {
            Template.content = newTemplate.content;
            this.templateRepository.save(Template);
        });
        return newTemplate;
    }

    public void deleteTemplate(String id) {
        logger.info("Template deleted");
        this.templateRepository.deleteById(id);
    }
}
