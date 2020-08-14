package com.bohyeon.studyapp.post;

import com.bohyeon.studyapp.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PostResponseDto {

    private Long id;

    @JsonIgnore
    @JsonProperty("author_id")
    private Long authorId;

    private User author;

    private String title;

    @JsonProperty("created_time")
    private String createdTime;

    private String location;

    private String category;

    @JsonProperty("comment_count")
    private Long commentCount;

    @JsonProperty("view_count")
    private Long viewCount;

    public PostResponseDto() {
    }

    public PostResponseDto(PostDetailResponse postDetailResponse) {
        this.id = postDetailResponse.getId();
        this.author = postDetailResponse.getAuthor();
        this.title = postDetailResponse.getTitle();
        this.createdTime = postDetailResponse.getCreatedTime();
        this.location = postDetailResponse.getLocation();
        this.category = postDetailResponse.getCategory();
        try {
            this.commentCount = (long) postDetailResponse.getComments().size();
        }catch(Exception e) {
            this.commentCount = 0L;
        }
        this.viewCount = postDetailResponse.getViewCount();
    }

    public PostResponseDto(Long id, Long authorId, User author, String title, String createdTime, String location, String category, Long commentCount, Long viewCount) {
        this.id = id;
        this.authorId = authorId;
        this.author = author;
        this.title = title;
        this.createdTime = createdTime;
        this.location = location;
        this.category = category;
        this.commentCount = commentCount;
        this.viewCount = viewCount;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public String getLocation() {
        return location;
    }

    public String getCategory() {
        return category;
    }

    public Long getCommentCount() {
        return commentCount;
    }

    public Long getViewCount() {
        return viewCount;
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

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setCommentCount(Long commentCount) {
        this.commentCount = commentCount;
    }

    public void setViewCount(Long viewCount) {
        this.viewCount = viewCount;
    }
}
