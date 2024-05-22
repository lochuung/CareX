package org.webdev.carex.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class AppConstants {
    public static final int VERIFY_CODE_LENGTH = 6;
    public static final int VERIFY_CODE_EXPIRATION = 5; // minutes
    public static final String ROLE_USER = "USER";
    public static final String ROLE_ADMIN = "ADMIN";
}
