package org.webdev.carex;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.webdev.carex.service.UserService;
import org.webdev.carex.service.WorkshopService;
import org.webdev.carex.service.YogaService;

@SpringBootApplication
@EnableScheduling
public class CareXApplication {

	public static void main(String[] args) {

		SpringApplication.run(CareXApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(UserService userService, YogaService yogaService, WorkshopService workshopService) {
		return args -> {
			userService.createData();
			yogaService.createData();
			workshopService.createWorkshop();
		};
	}
}
