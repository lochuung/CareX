package org.webdev.carex.controller.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.post.PostLikeRequestDto;
import org.webdev.carex.dto.request.post.PostRequestDto;
import org.webdev.carex.dto.response.post.PostLikeResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;
import org.webdev.carex.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(originPatterns = "*")
public class PostController {
    //Service
    private final PostService postService;
    //------POST API------//
    //Get post
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto<PostResponseDto>> getPost(@PathVariable Long id) {
        return ResponseEntity.ok().body(postService.getPost(id));
    }
    //Get all post
    @GetMapping
    public ResponseEntity<ResponseDto<List<PostResponseDto>>> getAllPosts() {
        return ResponseEntity.ok().body(postService.getAllPost());
    }
    //Create post
    @PostMapping("/create")
    public ResponseEntity<ResponseDto<PostResponseDto>> createPost(@RequestBody PostRequestDto postRequestDto, Authentication authentication) {
        return ResponseEntity.ok().body(postService.createNewPost(postRequestDto, authentication.getName()));
    }
    //Edit post
    @PutMapping("/{id}/edit")
    public ResponseEntity<ResponseDto<PostResponseDto>> editPost(@PathVariable Long id,@RequestBody PostRequestDto postRequestDto, Authentication authentication) {
        return ResponseEntity.ok().body(postService.editPost(id,postRequestDto, authentication.getName()));
    }
    //Delete post
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<ResponseDto<String>> deletePost(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok().body(postService.deletePost(id, authentication.getName()));
    }
    //Check is like?
    @GetMapping("/{id}/isLiked")
    public ResponseEntity<ResponseDto<Boolean>> isLiked(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok().body(postService.isLiked(id, authentication.getName()));
    }
    //Like post
    @PostMapping("/like")
    public ResponseEntity<ResponseDto<PostLikeResponseDto>> likePost(@RequestBody PostLikeRequestDto postLikeRequestDto, Authentication authentication) {
        return ResponseEntity.ok().body(postService.likePost(postLikeRequestDto, authentication.getName()));
    }
    //Unlike post
    @PostMapping("/unlike")
    public ResponseEntity<ResponseDto<PostLikeResponseDto>> unlikePost(@RequestBody PostLikeRequestDto postUnlikeRequestDto, Authentication authentication) {
        return ResponseEntity.ok().body(postService.unlikePost(postUnlikeRequestDto, authentication.getName()));
    }
}