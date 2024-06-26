package org.webdev.carex.utils;

import jakarta.mail.MessagingException;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.webdev.carex.constant.AppConstants;
import org.webdev.carex.entity.User;
import org.webdev.carex.entity.VerifyCode;
import org.webdev.carex.repository.VerifyCodeRepository;
import org.webdev.carex.service.EmailService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static org.webdev.carex.constant.AppConstants.VERIFY_CODE_LENGTH;

@UtilityClass
public class AuthUtils {
    private static final Logger log = LoggerFactory.getLogger(AuthUtils.class);

    public static String generateVerifyCode() {
        String codeBase = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        for (int i = 0; i < VERIFY_CODE_LENGTH; i++) {
            int index = (int) (codeBase.length() * Math.random());
            codeBuilder.append(codeBase.charAt(index));
        }
        return codeBuilder.toString();
    }

    public static void SendVerifyCodeHandle(User user, EmailService emailService,
                                            VerifyCodeRepository verifyCodeRepository) {
        Date expired = DateUtils.addMinutes(new Date(),
                AppConstants.VERIFY_CODE_EXPIRATION);
        LocalDateTime expiredAt = LocalDateTime.ofInstant(expired.toInstant(),
                ZoneId.systemDefault());

        var verifyCode = VerifyCode.builder()
                .user(user)
                .code(generateVerifyCode())
                .expiredAt(expiredAt)
                .build();
        verifyCodeRepository.save(verifyCode);

        // send mail in a new thread
        new Thread(() -> {
            try {
                emailService.sendVerifyCode(user.getEmail(), verifyCode.getCode());
            } catch (MessagingException ignored) {
                log.error(ignored.getMessage());
                log.error("Failed to send verify code email to {}", user.getEmail());
            }
        }).start();
    }
}
