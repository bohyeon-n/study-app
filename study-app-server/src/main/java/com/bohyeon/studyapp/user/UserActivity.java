package com.bohyeon.studyapp.user;

import com.bohyeon.studyapp.comment.Comment;
import com.bohyeon.studyapp.post.PostResponseDto;

import java.util.List;
import java.util.StringJoiner;

public class UserActivity {
    private List<PostResponseDto> posts;

    private List<Comment> comments;

    public UserActivity(List<PostResponseDto> posts, List<Comment> comments) {
        this.comments = comments;
        this.posts = posts;
    }

    public List<PostResponseDto> getPosts() {
        return posts;
    }

    public void setPosts(List<PostResponseDto> posts) {
        this.posts = posts;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", UserActivity.class.getSimpleName() + "[", "]")
                .add("posts=" + posts)
                .add("comments=" + comments)
                .toString();
    }
}
