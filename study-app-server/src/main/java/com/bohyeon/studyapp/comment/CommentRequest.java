package com.bohyeon.studyapp.comment;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CommentRequest {

    private String content;

    @JsonProperty("post_id")
    private Long postId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
