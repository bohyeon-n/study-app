package com.bohyeon.studyapp.login;

import com.bohyeon.studyapp.exception.UserUnAuthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class LoginService {

    private final LoginRepository loginRepository;
    @Value("${github_client_id}")
    private String GITHUB_CLIENT_ID;
    @Value("${github_client_secret}")
    private String GITHUB_CLIENT_SECRET;
    @Value("${github_redirect_url}")
    private String GITHUB_REDIRECT_URL;
    @Value("${jwt_secret_key}")
    private String JWT_SECRET_KEY;
    private String GITHUB_REQUEST_URL = "https://github.com/login/oauth";

    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public String getGithubRedirectUrl() {
        return String.format("%s/authorize?scope=read:user&client_id=%s&redirect_uri=%s", GITHUB_REQUEST_URL, GITHUB_CLIENT_ID, GITHUB_REDIRECT_URL);
    }

    public LoginToken getAccessToken(String code) {
        String requestUrl = String.format("%s/access_token?client_id=%s&client_secret=%s&redirect_uri=%s&code=%s", GITHUB_REQUEST_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URL, code);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(requestUrl, null, LoginToken.class);
    }


    public GithubUser getUserData(LoginToken loginToken) {
        String requestUrl = "https://api.github.com/user";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.AUTHORIZATION, String.format("%s %s", loginToken.getTokenType(), loginToken.getAccessToken()));
        HttpEntity entity = new HttpEntity(httpHeaders);
        ResponseEntity responseString = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class);
        System.out.println(responseString);
        ResponseEntity<GithubUser> response = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, GithubUser.class);
        return response.getBody();
    }

    public void join(GithubUser user) {
        loginRepository.save(user);
    }

    public String login(GithubUser user) {
//        Todo
//        예외 처리

        if (loginRepository.findByUsername(user.getUsername()).isEmpty()) {
            join(user);
        }

        return new Jwt(JWT_SECRET_KEY).generateJwt(user.getUsername());
    }

    public UserResponse getLoginUser(String token) throws UserUnAuthorizedException {
        String username = new Jwt(JWT_SECRET_KEY).parseIdFromJwt(token);

        Optional<UserResponse> user = loginRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        }

        throw new UserUnAuthorizedException();
    }

    public boolean isValidUserByJwt(String token) {
        String username = new Jwt(JWT_SECRET_KEY).parseIdFromJwt(token);
        return loginRepository.findByUsername(username).isPresent();
    }
}
