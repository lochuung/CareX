package org.webdev.carex.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;
import org.webdev.carex.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    @Autowired
    private PostService postService;

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
}
