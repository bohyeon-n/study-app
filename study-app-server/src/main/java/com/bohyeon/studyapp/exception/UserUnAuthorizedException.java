package com.bohyeon.studyapp.exception;

public class UserUnAuthorizedException extends Exception {

    public UserUnAuthorizedException() {
        super("로그인한 사용자만 이용할 수 있는 서비스입니다.");
    }
}
