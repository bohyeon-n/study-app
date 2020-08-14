package com.bohyeon.studyapp.exception;

public class UserForbiddenException extends Exception{

    public UserForbiddenException() {
        super("접근 권한이 없습니다.");
    }
}
