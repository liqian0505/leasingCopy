package com.cvicse.leasing.controller;

import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.service.ContractService;
import net.minidev.json.JSONUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@WebMvcTest(ContractController.class)
public class ContractControllerTests {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private ContractService contractService;

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void whenPostContract_thenCreateContract() throws Exception{
        Contract contract = new Contract("C1");
        given(contractService.createContract(Mockito.any())).willReturn(contract);
        mvc.perform(post("/api/contracts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.toJson(contract)))
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.name").value("C1"));
        verify(contractService,VerificationModeFactory.times(1)).createContract(Mockito.any());
        reset(contractService);
    }

    @Test
    public void whenGetContracts_thenGetContracts() throws Exception{
        Contract contract1 = new Contract("C1");
        Contract contract2 = new Contract("C2");
        List<Contract> contractList = Arrays.asList(contract1,contract2);
        given(contractService.getAllContract()).willReturn(contractList);

        mvc.perform(get("/api/contracts")
        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(200))
                .andExpect(jsonPath("$[0].name").value("C1"))
                .andExpect(jsonPath("$[1].name").value("C2"));
        verify(contractService,VerificationModeFactory.times(1)).getAllContract();
        reset(contractService);
    }
}
