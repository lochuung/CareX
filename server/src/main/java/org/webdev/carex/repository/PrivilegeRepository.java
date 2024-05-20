package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webdev.carex.entity.Privilege;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
}
