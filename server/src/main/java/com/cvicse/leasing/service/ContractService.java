package com.cvicse.leasing.service;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.exception.ContractNotFoundException;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.payload.ContractRequest;
import com.cvicse.leasing.repository.ContractRepository;
import org.javers.core.Javers;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.javers.repository.jql.JqlQuery;
import org.javers.repository.jql.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private Javers javers;

    private static final Logger logger = LoggerFactory.getLogger(ContractService.class);

    public List<Contract> getAllContract() {
        logger.info("contracts returned");
        List<Contract> contracts = contractRepository.findAll();
        return contracts;
    }

    public Contract getContract(String id) throws ContractNotFoundException {
        if(!this.contractRepository.findById(id).isPresent())
            throw new ContractNotFoundException("ContractRequest Not Found in contractRepository.");
        return this.contractRepository.findById(id).get();
    }

    public Contract createContract(ContractRequest contractRequest) {
        logger.info("contract saved");
        Contract contract = new Contract(contractRequest.getContent());
        return contractRepository.save(contract);
    }

    public Contract updateContract(ContractRequest contractRequest, String id) throws ContractNotFoundException{
        this.contractRepository.findById(id).ifPresent(contract -> {
            contract.content = contractRequest.getContent();
            this.contractRepository.save(contract);
        });
        if(!this.contractRepository.findById(id).isPresent()){
            throw new ContractNotFoundException("ContractRequest Not Found in contractRepository.");
        }
        return this.contractRepository.findById(id).get();
    }

    public void deleteContract(String id) throws ContractNotFoundException {
        if(!this.contractRepository.findById(id).isPresent())
            throw new ContractNotFoundException("ContractRequest Not Found in contractRepository.");
        logger.info("contract deleted");
        this.contractRepository.deleteById(id);
    }

    public JSONArray trackContractChangesWithJavers(String contractId) throws ContractNotFoundException {
        Contract contract = this.getContract(contractId);
        JSONArray jsonArray = new JSONArray();
        JqlQuery jqlQuery = QueryBuilder.byInstance(contract).build();
        List<CdoSnapshot> snapshots =javers.findSnapshots(jqlQuery);
        for(CdoSnapshot snapshot:snapshots){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("commitId",snapshot.getCommitId().getMajorId());
            jsonObject.put("commitDate", snapshot.getCommitMetadata().getCommitDate());
            jsonObject.put("content", JSON.parseObject(javers.getJsonConverter().toJson(snapshot.getState()),Contract.class));
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    public Contract getContractWithJaversCommitId(String contractId, String commitId) throws ContractNotFoundException{
        Contract contract = this.getContract(contractId);
        JqlQuery jqlQuery= QueryBuilder.byInstance(contract).build();
        List<CdoSnapshot> snapshots = javers.findSnapshots(jqlQuery);
        for(CdoSnapshot snapshot:snapshots){
            if(snapshot.getCommitId().getMajorId() == Integer.parseInt(commitId))
                return JSON.parseObject(javers.getJsonConverter().toJson(snapshot.getState()),Contract.class);
        }
        return null;
    }
}
