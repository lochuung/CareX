package org.webdev.carex;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
<<<<<<< HEAD
import org.webdev.carex.service.UserService;
=======
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.webdev.carex.service.PostService;
import org.webdev.carex.service.UserService;
import org.webdev.carex.service.WorkshopService;
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
import org.webdev.carex.service.YogaService;

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
<<<<<<< HEAD
	CommandLineRunner runner(UserService userService, YogaService yogaService) {
		return args -> {
			userService.createData();
			yogaService.createData();
=======
	CommandLineRunner runner(UserService userService, YogaService yogaService, WorkshopService workshopService, PostService postService) {
		return args -> {
			log.info("Creating data...");
			userService.createData();
			yogaService.createData();
			workshopService.createWorkshop();
			postService.createPost();
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
		};
	}
}
