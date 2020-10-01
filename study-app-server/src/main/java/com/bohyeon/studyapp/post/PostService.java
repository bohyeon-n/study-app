package com.bohyeon.studyapp.post;

import com.bohyeon.studyapp.comment.CommentService;
import com.bohyeon.studyapp.exception.UserForbiddenException;
import com.bohyeon.studyapp.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostDao postDao;

    private final UserService userService;

    private final CommentService commentService;


    public PostService(PostDao postDao, UserService userService, CommentService commentService) {
        this.postDao = postDao;
        this.userService = userService;
        this.commentService = commentService;
    }

    public List<PostResponseDto> getAllPosts() {
        return postDao.findAll().stream().peek(post -> post.setAuthor(userService.findById(post.getAuthorId()))).collect(Collectors.toList());
    }

    public PostDetailResponse getPost(Long id) {
        postDao.increaseViewCount(id);
        PostDetailResponse post = postDao.findById(id);
        post.setAuthor(userService.findById(post.getAuthorId()));
        post.setComments(commentService.findByPostId(post.getId()));
        return post;
    }

    public PostResponseDto addPost(PostRequestDto requestBody, Long userId) {
        Long postId = postDao.addPost(requestBody, userId);
        return new PostResponseDto(getPost(postId));
    }

    public void deletePost(Long id, Long requestUserId) throws UserForbiddenException {
        if (!requestUserId.equals(postDao.findById(id).getAuthorId())) {
            throw new UserForbiddenException();
        }

        commentService.deleteByPostId(id);
        postDao.deletePost(id);
    }

    public PostResponseDto updatePost(Long id, PostRequestDto postRequestDto, Long requestUserId) throws UserForbiddenException {
        Long authorId = postDao.findById(id).getAuthorId();
        if (!requestUserId.equals(authorId)) {
            throw new UserForbiddenException();
        }

        postDao.updatePost(id, postRequestDto);
        PostDetailResponse newPost = postDao.findById(id);
        newPost.setAuthor(userService.findById(authorId));
        PostResponseDto newPostResponse = new PostResponseDto(newPost);
        return newPostResponse;
    }

    public List<PostResponseDto> findByUserId(Long id) {
        return postDao.findByUserId(id);
    }

    public List<PostResponseDto> findByTitleWorld(String query) {
        return postDao.findByTitleWorld(query)
                .stream().peek(post -> post.setAuthor(userService.findById(post.getAuthorId()))).collect(Collectors.toList());
    }

    public PostPaginatedResponseDto findPaginated(int pageNo, int pageSize) {
        List<PostResponseDto> posts = postDao.findPaginated(pageNo, pageSize)
                .stream()
                .peek(post -> post.setAuthor(userService.findById(post.getAuthorId()))).collect(Collectors.toList());
        Integer postCount = postDao.findPostCount();

        return new PostPaginatedResponseDto(posts, postCount);
    }
}
