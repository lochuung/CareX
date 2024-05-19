package org.webdev.carex.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.webdev.carex.entity.Privilege;
import org.webdev.carex.entity.Role;
import org.webdev.carex.entity.User;
import org.webdev.carex.repository.PrivilegeRepository;
import org.webdev.carex.repository.RoleRepository;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.service.UserService;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;

    @Transactional
    @Override
    public void createData() {
        Privilege readPrivilege = Privilege.builder().name("READ").build();
        Privilege writePrivilege = Privilege.builder().name("WRITE").build();
        Privilege deletePrivilege = Privilege.builder().name("DELETE").build();
        Privilege createWorkshopPrivilege = Privilege.builder().name("CREATE_WORKSHOP").build();

        if (privilegeRepository.count() == 0) {
            privilegeRepository.saveAll(List.of(
                    readPrivilege,
                    writePrivilege,
                    deletePrivilege,
                    createWorkshopPrivilege
            ));
        }
        if (roleRepository.count() == 0) {
            roleRepository.saveAll(List.of(
                    Role.builder()
                            .name("USER")
                            .privileges(List.of(
                                    readPrivilege,
                                    writePrivilege
                            ))
                            .build(),
                    Role.builder()
                            .name("ADMIN")
                            .privileges(List.of(
                                    readPrivilege,
                                    writePrivilege,
                                    deletePrivilege,
                                    createWorkshopPrivilege
                            ))
                            .build()
            ));
        }

        if (userRepository.count() == 0) {
            userRepository.save(User.builder()
                    .email("admin@huuloc.id.vn")
                    .password("{bcrypt}" + new BCryptPasswordEncoder(10)
                            .encode("admin"))
                    .fullName("Admin")
                    .enabled(true)
                    .roles(List.of(roleRepository.findByName("ADMIN")))
                    .build());
        }
    }
}
