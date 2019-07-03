package com.cvicse.leasing.controller;

import java.util.List;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.service.ContractService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    private static final Logger logger = LoggerFactory.getLogger(ContractController.class);

    @GetMapping
    public List<Contract> getContracts() {
        logger.info("All contracts requested");
        return contractService.getAllContract();
    }

    @GetMapping("/{id}")
    public Contract getContract(@PathVariable String id) {
        logger.info("Get contract with contract.id " + id);
        return this.contractService.getContract(id);
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
        logger.info("Delete contract with contract.id " + id);
        this.contractService.deleteContract(id);
    }

}