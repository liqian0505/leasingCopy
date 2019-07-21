package com.cvicse.leasing.service;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


/**
* @authored by TC.
*/
@RunWith(SpringRunner.class)
@SpringBootTest
public class ContractServiceTests {

    @Autowired
    ContractService contractService;

//    @Autowired
//    ContractRepository repository;

//    @Before
//    public void setUp(){
//        repository.deleteAll();
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","C1");
//        ContractRequest contract1=new ContractRequest(jsonObject);
//        contract1.setId("1");
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","C2");
//        ContractRequest contract2 = new ContractRequest(jsonObject1);
//        contract2.setId("2");
//        JSONObject jsonObject2 = new JSONObject();
//        jsonObject2.put("content","C2");
//
//        List<ContractRequest> allContracts = Arrays.asList(contract1, contract2);
//
//        Mockito.when(repository.findById(contract1.getId())).thenReturn(Optional.of(contract1));
//        Mockito.when(repository.findById(contract2.getId())).thenReturn(Optional.of(contract2));
//        Mockito.when(repository.findById("wrong_id")).thenReturn(null);
//        Mockito.when(repository.save(new ContractRequest(jsonObject2))).thenReturn(contract2);
//        Mockito.when(repository.findAll()).thenReturn(allContracts);
//    }
//
//    @Test
//    public void given2Contracts_when_getAllContracts_thenReturn2Records(){
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","C1");
//        ContractRequest contract1=new ContractRequest(jsonObject);
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","C2");
//        ContractRequest contract2 = new ContractRequest(jsonObject1);
//        List<ContractRequest> contractList= contractService.getAllContract();
//        assertThat(contractList).hasSize(2).extracting(ContractRequest::getContent).contains(contract1.getContent(),contract2.getContent());
//    }
//
//    @Test
//    public void givenRightContractId_thenReturnContract() throws ContractNotFoundException {
//        ContractRequest contract =contractService.getContract("1");
//        assertThat(contract).extracting("content").contains("C1");
//    }
//
//    @Test
//    public void createNewContract_thenReturnTheContract() throws ContractNotFoundException{
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","C2");
//        contractService.createContract(new ContractRequest(jsonObject));
//        ContractRequest contract = contractService.getContract("2");
//        assertThat(contract.content.get("content")).extracting("content").contains("C2");
//    }
//
//    @Test
//    public void updateExistedContract_withExistedId_andNewName_thenReturnTheContract(){
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","C3");
//        ContractRequest contract =contractService.updateContract(jsonObject,"1");
//        assertThat(contract.content.equals("C3")).isTrue();
//    }

//    @Test
//    public void deleteContract(){
//        contractService.deleteContract(repository.findByName("C1").id);
//        assertThat(repository.findByName("C1")).isNull();
//    }

//    @Test
//    public void testUpdateHistory() throws ContractNotFoundException {
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","C2");
//        Contract contract = contractService.createContract(new Contract(jsonObject));
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","C3");
//        contractService.updateContract(jsonObject1,contract.getId());
//        JSONObject jsonObject2 = new JSONObject();
//        jsonObject2.put("content","C4");
//        contractService.updateContract(jsonObject2,contract.getId());
//        JSONArray jsonArray =contractService.trackContractChangesWithJavers(contract.getId());
//        Contract contract1 = contractService.getContractWithJaversCommitId(contract.getId(),"3");
//        System.out.println(contract1.toString());
//        System.out.println(jsonArray);
//    }


}
