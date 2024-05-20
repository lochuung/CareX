package org.webdev.carex;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.webdev.carex.service.UserService;
import org.webdev.carex.service.YogaService;

@SpringBootApplication
public class CareXApplication {

	public static void main(String[] args) {

		SpringApplication.run(CareXApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(UserService userService, YogaService yogaService) {
		return args -> {
			userService.createData();
			yogaService.createData();
		};
	}
}
