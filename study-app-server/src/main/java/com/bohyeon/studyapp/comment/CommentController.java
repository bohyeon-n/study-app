package com.bohyeon.studyapp.comment;

import com.bohyeon.studyapp.exception.UserForbiddenException;
import com.bohyeon.studyapp.login.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class CommentController {

    private final CommentService commentService;

    private final LoginService loginService;

    public CommentController(CommentService commentService, LoginService loginService) {
        this.commentService = commentService;
        this.loginService = loginService;
    }

    @PostMapping("/comments")
    public ResponseEntity<Comment> addComment(HttpServletRequest request, @RequestBody CommentRequest commentRequest) {
        Long userId = (Long) request.getAttribute("userId");

        return new ResponseEntity<>(commentService.addComment(commentRequest, userId), HttpStatus.OK);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<String> deleteComment(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");

        try {
            commentService.delete(id, userId);
        } catch (Exception ignored) {

        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<Comment> updateComment(HttpServletRequest request, @PathVariable Long id, @RequestBody CommentRequest commentRequest) throws UserForbiddenException {
        Long userId = (Long) request.getAttribute("userId");

        return new ResponseEntity<>(commentService.update(id, commentRequest, userId), HttpStatus.OK);
    }
}
