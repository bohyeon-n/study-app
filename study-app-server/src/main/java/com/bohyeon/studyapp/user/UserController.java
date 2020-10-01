package com.bohyeon.studyapp.user;

import com.bohyeon.studyapp.exception.UserUnAuthorizedException;
import com.bohyeon.studyapp.login.LoginService;
import com.bohyeon.studyapp.login.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final LoginService loginService;

    private final UserService userService;

    public UserController(LoginService loginService, UserService userService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    @GetMapping("/my-activity")
    public ResponseEntity<UserActivity> userActivity(@CookieValue("login_token") String loginToken) throws UserUnAuthorizedException {
        UserResponse user = loginService.getLoginUser(loginToken);
        UserActivity userActivity = userService.findByActivityByUserId(user.getId());
        return new ResponseEntity<>(userActivity, HttpStatus.OK);
    }
}
