package com.cvicse.leasing;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.repository.ContractRepository;

//import org.javers.core.Javers;
//import org.javers.core.metamodel.object.CdoSnapshot;
//import org.javers.core.metamodel.object.SnapshotType;
//import org.javers.repository.jql.QueryBuilder;
import com.cvicse.leasing.repository.TemplateRepository;
import org.javers.core.Changes;
import org.javers.core.Javers;
import org.javers.repository.jql.JqlQuery;
import org.javers.repository.jql.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LeasingApplication /*implements CommandLineRunner*/ {
	public static void main(String[] args) {
		SpringApplication.run(LeasingApplication.class, args);
	}

//	@Autowired
//	private TemplateRepository repository;
//
//	@Autowired
//	private ContractRepository contractRepository;
//
//	@Autowired
//	private Javers javers;
//
//	private static final Logger logger = LoggerFactory.getLogger(LeasingApplication.class);
//
//
//	public static void main(String[] args) {
//		SpringApplication.run(LeasingApplication.class, args);
//	}
//
//	@Override
//	public void run(String... args) throws Exception {
//
//		repository.deleteAll();
//
//		JSONObject content = new JSONObject();
//		content.put("content","TemplateRequest 1");
//		JSONObject content1 = new JSONObject();
//		content1.put("content","TemplateRequest 2");
//		repository.save(new TemplateRequest(content));
//		repository.save(new TemplateRequest(content1));
//
//		contractRepository.deleteAll();
//
//		JSONObject contractContent = new JSONObject();
//		contractContent.put("content","ContractRequest 1");
//		JSONObject contractContent1 = new JSONObject();
//		contractContent.put("content","ContractRequest 2");
//		contractRepository.save(new ContractRequest(contractContent));
//		contractRepository.save(new ContractRequest(contractContent1));
//		ContractRequest c = contractRepository.findByContent(contractContent);
//		JSONObject c1= new JSONObject();
//		 c1.put("content","ABC");
//		 c.content = c1;
//		contractRepository.save(c);
//		JSONObject c2= new JSONObject();
//		c2.put("content","DEF");
//		c.content = c2;
//		contractRepository.save(c);
//
//
//		System.out.println(contractRepository.findByContent(c2).id);
//		JqlQuery jqlQuery=QueryBuilder.byInstance(c).build();
//		Changes changes = javers.findChanges(jqlQuery);
//		System.out.println(changes.prettyPrint());
//		QueryBuilder queryBuilder = QueryBuilder.byInstance(c).withSnapshotType(SnapshotType.INITIAL);
//
//		List<CdoSnapshot> changes = javers.findSnapshots(queryBuilder.build());
//
//		logger.info("Found the initial version: ");
//		for (CdoSnapshot change : changes) {
//			logger.info("ContractRequest snapshot: {}", change);
//		}

}
