package com.bohyeon.studyapp.interceptor;

import com.bohyeon.studyapp.exception.UserUnAuthorizedException;
import com.bohyeon.studyapp.login.LoginService;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor extends HandlerInterceptorAdapter {

    private final LoginService loginService;


    public LoginInterceptor(LoginService loginService) {
        this.loginService = loginService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (request.getMethod().equals("GET") || request.getMethod().equals("OPTIONS")) {
            return true;
        }

        Cookie[] cookies = request.getCookies();
        String cookieName = "login_token";
        String jwt = null;

        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                jwt = cookie.getValue();
                break;
            }
        }
        if (jwt == null) {
            throw new UserUnAuthorizedException();
        }

        Long userId = loginService.getLoginUser(jwt).getId();
        System.out.println("interceptor userId" + userId);
        request.setAttribute("userId", userId);

        return true;
    }
}
