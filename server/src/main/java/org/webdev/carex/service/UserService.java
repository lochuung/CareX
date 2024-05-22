package org.webdev.carex.service;

<<<<<<< HEAD
public interface UserService {
=======
import jakarta.mail.MessagingException;
import org.webdev.carex.dto.user.ChangePasswordDto;
import org.webdev.carex.dto.user.UserRequest;
import org.webdev.carex.dto.user.UserResponse;

import java.util.Map;

public interface UserService {

    UserResponse update(UserRequest userRequest);

    UserResponse updatePassword(String email, ChangePasswordDto changePasswordDto);

    UserResponse findByEmail(String email);

    Map<String, String> enableUser(String email) throws MessagingException;

>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895
    void createData();
}
