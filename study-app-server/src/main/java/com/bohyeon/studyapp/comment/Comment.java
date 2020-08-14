package com.bohyeon.studyapp.comment;

import com.bohyeon.studyapp.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Comment {

    private Long id;

    private User author;

    @JsonIgnore
    @JsonProperty("author_id")
    private Long authorId;

    @JsonProperty("created_time")
    private String createdTime;

    private String content;

    @JsonProperty("post_id")
    private Long PostId;

    @JsonProperty("post_title")
    private String postTitle;

    public Long getPostId() {
        return PostId;
    }

    public void setPostId(Long postId) {
        PostId = postId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public Long getId() {
        return id;
    }

    public User getAuthor() {
        return author;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public String getContent() {
        return content;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
