package com.cvicse.leasing.controller;

import java.util.List;

import com.cvicse.leasing.exception.ContractNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.service.ContractService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    private static final Logger logger = LoggerFactory.getLogger(ContractController.class);

    @GetMapping
    public List<Contract> getContracts() {
        try{
        logger.info("All contracts requested.");
        return contractService.getAllContract();
        }catch(ContractNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Contract Not Found",e);
        }
    }

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
    public Contract createContract(@RequestBody Contract newContract) {
        logger.info("Create contract");
        return this.contractService.createContract(newContract);
    }

    @PutMapping("/{id}")
    public Contract updateContract(@RequestBody Contract newContract, @PathVariable String id) {
        logger.info("UpdateContract with contract.id " + id);
        return this.contractService.updateContract(newContract, id);
    }

    @DeleteMapping("/{id}")
    public void deleteContract(@PathVariable String id) {
       try{ logger.info("Delete contract with contract.id " + id);
        this.contractService.deleteContract(id);
       }catch (ContractNotFoundException e) {
           logger.info(e.getMessage());
           throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Contract Not Found");
       }
    }

}