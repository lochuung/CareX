package org.webdev.carex;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CareXApplication {

	public static void main(String[] args) {

		SpringApplication.run(CareXApplication.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			// migrate data code here
		};
	}
}
