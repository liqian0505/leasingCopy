package com.cvicse.leasing.controller;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.exception.ContractNotFoundException;
import com.cvicse.leasing.exception.TemplateNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.service.ContractService;

import com.cvicse.leasing.service.TemplateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @Autowired
    private TemplateService templateService;

    private static final Logger logger = LoggerFactory.getLogger(ContractController.class);

    @GetMapping
    public List<Contract> getContracts(@RequestParam(value = "templateId",defaultValue = "null") String templateId) {
        if(templateId.equals("null")){
            logger.info("All contracts requested.");
            return contractService.getAllContract();
        }
        else{
            try{
                logger.info("Get ContractList with Template.id"+ templateId);
                return this.templateService.getContractList(templateId);
            }catch (Exception e){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found",e);
            }
        }
    }


//    @GetMapping
//    public List<Contract> getAllContracts() {
//            logger.info("All contracts requested.");
//            return contractService.getAllContract();
//    }

    @GetMapping("/{id}")
    public Contract getContract(@PathVariable String id) {
        try{
            logger.info("Get contract with contract.id " + id);
            return this.contractService.getContract(id);
        }catch(ContractNotFoundException e) {
            logger.info(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Contract Not Found",e);
        }
    }

    @PostMapping
    public List<Contract> createContract(@RequestBody JSONObject content, @RequestParam(value = "templateId",defaultValue = "null") String templateId) {
        logger.info("Create contract");
        Contract newContract = new Contract(content);
        try{
            Contract contract = this.contractService.createContract(newContract);
            logger.info(contract.getId());
            this.templateService.addContract(templateId,contract.getId());
            return this.templateService.getContractList(templateId);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Template Not Found",e);
        }
    }

    @PutMapping(value = "/{id}")
    public Contract updateContract(@RequestBody JSONObject content, @PathVariable String id) {
        logger.info("UpdateContract with contract.id " + id);
        return this.contractService.updateContract(content, id);
    }

    @DeleteMapping("/{id}")
    public List<Contract> deleteContract(@PathVariable String id,@RequestParam(value = "templateId",defaultValue = "null") String templateId) {
       try{
            logger.info("Delete contract with contract.id " + id);
           this.templateService.deleteContract(templateId,id);
           this.contractService.deleteContract(id);
           return this.templateService.getContractList(templateId);
       }catch (Exception e) {
           logger.info(e.getMessage());
           throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Contract Not Found");
       }
    }

}