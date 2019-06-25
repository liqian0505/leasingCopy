package com.cvicse.leasing.controller;

import java.util.List;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.service.ContractService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

}