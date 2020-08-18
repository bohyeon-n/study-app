package com.bohyeon.studyapp.post;


import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import java.util.StringJoiner;

public class Post {

    @Id
    private Long id;

    private String title;

    private String location;

    private String category;

    @Column("created_time")
    private String createdTime;

    private String content;

    @Column("view_count")
    private Long viewCount;

    @Column("author_id")
    private Long authorId;


    public Post(Long id, String title, String location, String category, String createdTime, String content, Long viewCount, Long authorId) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.category = category;
        this.createdTime = createdTime;
        this.content = content;
        this.viewCount = viewCount;
        this.authorId = authorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocal() {
        return location;
    }

    public void setLocal(String location) {
        this.location = location;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getViewCount() {
        return viewCount;
    }

    public void setViewCount(Long viewCount) {
        this.viewCount = viewCount;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Post.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("title='" + title + "'")
                .add("location='" + location + "'")
                .add("category='" + category + "'")
                .add("createdTime='" + createdTime + "'")
                .add("content='" + content + "'")
                .add("viewCount=" + viewCount)
                .add("authorId=" + authorId)
                .toString();
    }
}

