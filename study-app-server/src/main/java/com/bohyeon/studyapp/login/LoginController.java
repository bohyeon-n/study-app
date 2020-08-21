package com.bohyeon.studyapp.login;

import com.bohyeon.studyapp.exception.UserUnAuthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

@RestController
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @Value("${client_url}")
    String clientUrl;

    @GetMapping("/github-login")
    public RedirectView githubLogin() {
        RedirectView redirectView = new RedirectView();
        String url = loginService.getGithubRedirectUrl();
        redirectView.setUrl(url);

        return redirectView;
    }

    @GetMapping("/login")
    public RedirectView login(@PathParam("code") String code, HttpServletResponse httpServletResponse) {
        LoginToken loginToken = loginService.getAccessToken(code);
        GithubUser user = loginService.getUserData(loginToken);
        String token = loginService.login(user);

        Cookie cookie = new Cookie("login_token", token);
        httpServletResponse.addCookie(cookie);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(clientUrl);
        return redirectView;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser(@CookieValue("login_token") String loginToken) throws UserUnAuthorizedException {
        UserResponse user = loginService.getLoginUser(loginToken);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

