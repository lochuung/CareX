package org.webdev.carex;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.webdev.carex.service.*;

@SpringBootApplication
@EnableScheduling
public class CareXApplication {

	private static final Logger log = LoggerFactory.getLogger(CareXApplication.class);

	public static void main(String[] args) {

		SpringApplication.run(CareXApplication.class, args);
	}

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	CommandLineRunner runner(UserService userService, YogaService yogaService,
							 WorkshopService workshopService, PostService postService,
							 HealthyService healthyService) {
		return args -> {
			log.info("Creating data...");
			healthyService.createWeightPlanData();
			userService.createData();
			yogaService.createData();
			workshopService.createWorkshop();
			postService.createPost();
		};
	}
}
