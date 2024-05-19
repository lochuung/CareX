package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
