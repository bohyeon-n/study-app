package com.bohyeon.studyapp.comment;

import com.bohyeon.studyapp.exception.UserForbiddenException;
import com.bohyeon.studyapp.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserService userService;

    public CommentService(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    public List<Comment> findByPostId(Long id) {
        return commentRepository.findByPostId(id)
                .stream()
                .peek(comment -> comment.setAuthor(userService.findById(comment.getAuthorId()))
                ).collect(Collectors.toList());
    }

    public Comment addComment(CommentRequest commentRequest, Long userId) {
        Long newCommentId = commentRepository.add(commentRequest, userId);
        Comment newComment = commentRepository.findById(newCommentId);
        newComment.setAuthor(userService.findById(newComment.getAuthorId()));
        return newComment;
    }

    public void deleteByPostId(Long id) {
        commentRepository.deleteByPostId(id);
    }


    public Comment update(Long id, CommentRequest commentRequest, Long userId) throws UserForbiddenException {
        if (!userId.equals(commentRepository.findById(id).getAuthorId())) {
            throw new UserForbiddenException();
        }

        commentRepository.update(id, commentRequest);
        return commentRepository.findById(id);
    }

    public void delete(Long id, Long userId) throws UserForbiddenException {
        if (!userId.equals(commentRepository.findById(id).getAuthorId())) {
            throw new UserForbiddenException();
        }

        commentRepository.delete(id);
    }

    public List<Comment> findByUserId(Long id) {
        return commentRepository.findByUserId(id);
    }
}
