package com.bohyeon.studyapp.post;

import java.util.List;

public class PostPaginatedResponseDto {

    private List<PostResponseDto> posts;

    private Integer postCount;

    public PostPaginatedResponseDto(List<PostResponseDto> posts, Integer postCount) {
        this.posts = posts;
        this.postCount = postCount;
    }

    public List<PostResponseDto> getPosts() {
        return posts;
    }

    public void setPosts(List<PostResponseDto> posts) {
        this.posts = posts;
    }

    public Integer getPostCount() {
        return postCount;
    }

    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }
}
