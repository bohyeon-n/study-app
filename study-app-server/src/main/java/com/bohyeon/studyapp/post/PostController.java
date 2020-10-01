package com.bohyeon.studyapp.post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public ResponseEntity<PostPaginatedResponseDto> posts(@RequestParam Integer pageNo, @RequestParam Integer pageSize) {

        PostPaginatedResponseDto posts = postService.findPaginated(pageNo, pageSize);
        return new ResponseEntity<>(posts, HttpStatus.OK);

    }

    @GetMapping("/posts/search")
    public ResponseEntity<List<PostResponseDto>> searchPosts(@RequestParam String query) {
        List<PostResponseDto> posts = postService.findByTitleWorld(query);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostDetailResponse> post(@PathVariable Long id) {
        return new ResponseEntity<>(postService.getPost(id), HttpStatus.OK);
    }

    @PostMapping("/posts")
    public ResponseEntity<PostResponseDto> addPost(HttpServletRequest request, @RequestBody PostRequestDto requestBody) {
        Long userId = (Long) request.getAttribute("userId");

        PostResponseDto newPost = postService.addPost(requestBody, userId);
        return new ResponseEntity<>(newPost, HttpStatus.OK);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<String> deletePost(HttpServletRequest request, @PathVariable Long id) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            postService.deletePost(id, userId);
        } catch (Exception ignored) {
        }

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<PostResponseDto> updatePost(HttpServletRequest request, @PathVariable Long id, @RequestBody PostRequestDto postRequestDto) {
        Long userId = (Long) request.getAttribute("userId");
        PostResponseDto updatedPost = new PostResponseDto();
        try {
            updatedPost = postService.updatePost(id, postRequestDto, userId);


        } catch (Exception ignored) {
        }
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }
}
