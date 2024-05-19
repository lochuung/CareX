package org.webdev.carex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.VerifyCode;

import java.util.Optional;

public interface VerifyCodeRepository extends JpaRepository<VerifyCode, Long>{
    Optional<VerifyCode> findByUserAndCode(User user, String code);
}
