package com.cvicse.leasing.controller;

import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.exception.ContractNotFoundException;
import com.cvicse.leasing.exception.TemplateNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.payload.ContractRequest;
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
    public List<Contract> getContracts() {
        logger.info("All contracts requested.");
        return contractService.getAllContract();
    }

    @GetMapping("/{id}")
    public List<Contract> getContract(@PathVariable String id) {
        try{
            logger.info("Get contract with contract.id " + id);
            this.contractService.getContract(id);
            return this.contractService.getAllContract();
        }catch(ContractNotFoundException e) {
            logger.info(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ContractRequest Not Found",e);
        }
    }

    @PostMapping("/new")
    public List<Contract> createContract(@RequestBody ContractRequest contractRequest) {
        try{
            logger.info("Create contract");
            Contract contract = this.contractService.createContract(contractRequest);
            logger.info(contract.getId());
            return  this.contractService.getAllContract();
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"TemplateRequest Not Found",e);
        }
    }

    @PutMapping(value = "/{id}")
    public Contract updateContract(@RequestBody ContractRequest contractRequest, @PathVariable String id) {
        try{
            logger.info("UpdateContract with contract.id " + id);
        return this.contractService.updateContract(contractRequest, id);
        }catch(ContractNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"TemplateRequest Not Found",e);
        }
    }

    @DeleteMapping("/{id}")
    public List<Contract> deleteContract(@PathVariable String id) {
       try{
            logger.info("Delete contract with contract.id " + id);
           this.contractService.deleteContract(id);
           return this.contractService.getAllContract();
       }catch (Exception e) {
           logger.info(e.getMessage());
           throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ContractRequest Not Found");
       }
    }

    @GetMapping("/{id}/commits")
    public JSONArray getContractWithCommitId(@PathVariable String id, @RequestParam(value = "commitId",defaultValue = "null") String commitId){
        if(commitId.equals("null")){
            try{
                logger.info("Get ContractRequest commits with TemplateRequest.id "+ id);
                return this.contractService.trackContractChangesWithJavers(id);
            }catch(ContractNotFoundException e){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ContractRequest Not Found.",e);
            }
        }else{
            try{
                logger.info("Cet ContractRequest commit with commitId"+commitId);
                JSONArray jsonArray = new JSONArray();
                jsonArray.add(this.contractService.getContractWithJaversCommitId(id,commitId));
                return jsonArray;
            }catch (ContractNotFoundException e){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ContractRequest Not Found.",e);
            }
        }
    }

}