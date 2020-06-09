package com.easyledger.api;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EasyledgerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasyledgerApplication.class, args);
	}

}
