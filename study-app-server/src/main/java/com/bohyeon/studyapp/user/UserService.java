package com.bohyeon.studyapp.user;

import com.bohyeon.studyapp.comment.Comment;
import com.bohyeon.studyapp.comment.CommentService;
import com.bohyeon.studyapp.post.PostResponseDto;
import com.bohyeon.studyapp.post.PostService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserCrudRepository userCrudRepository;

    private final CommentService commentService;

    private final PostService postService;

    public UserService(UserCrudRepository userCrudRepository, @Lazy CommentService commentService, @Lazy PostService postService) {
        this.userCrudRepository = userCrudRepository;
        this.postService = postService;
        this.commentService = commentService;
    }

    public User findById(Long id) {
        User user = userCrudRepository.findById(id).orElse(null);
        return user;
    }

    public UserActivity findByActivityByUserId(Long id) {
        List<PostResponseDto> posts = postService.findByUserId(id);
        List<Comment> comments = commentService.findByUserId(id);
        UserActivity userActivity = new UserActivity(posts, comments);
        System.out.println(userActivity);
        return userActivity;
    }
}
