package com.bohyeon.studyapp.login;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GithubUser {

    @JsonProperty("login")
    private String username;

    @JsonProperty("avatar_url")
    private String profileUrl;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }
}
