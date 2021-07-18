package com.in28minutes.microservices.currecncyexchangeservice;

import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.github.resilience4j.retry.annotation.Retry;

@RestController
public class CircuitBreakerController {

	
	@GetMapping("/sample-api")
	@Retry(name = "default")
	public String sampleApi() {
		
		ResponseEntity<String> forEntity = new RestTemplate().getForEntity("http://localhost:8080/some-dummy", String.class);
		return forEntity.getBody();
	}
}
