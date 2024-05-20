package org.webdev.carex.controller.api;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.post.PostDeleteRequestDto;
import org.webdev.carex.dto.request.post.PostLikeRequestDto;
import org.webdev.carex.dto.request.post.PostRequestDto;
import org.webdev.carex.dto.request.workshop.WorkshopRequestDto;
import org.webdev.carex.dto.response.post.PostLikeResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;
import org.webdev.carex.dto.response.workshop.WorkshopResponseDto;
import org.webdev.carex.service.PostService;
import org.webdev.carex.service.WorkshopService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
@Api(value = "USER APIs")
public class UserController {
    //Service
    private final PostService postService;
    private final WorkshopService workshopService;
    //------POST API------//
    //Create post
    @PostMapping("/post/create")
    public ResponseEntity<ResponseDto<PostResponseDto>> createPost(@RequestBody PostRequestDto postCreateRequestDto) {
        return ResponseEntity.ok().body(postService.createPost(postCreateRequestDto));
    }
    //Edit post
    @PutMapping("/post/{id}/edit")
    public ResponseEntity<ResponseDto<PostResponseDto>> editPost(@PathVariable Long id, @RequestBody PostRequestDto postEditRequestDto) {
        return ResponseEntity.ok().body(postService.editPost(id, postEditRequestDto));
    }
    //Delete post
    @DeleteMapping("/post/{id}/delete")
    public ResponseEntity<ResponseDto<String>> deletePost(@PathVariable Long id, @RequestBody PostDeleteRequestDto postDeleteRequestDto) {
        return ResponseEntity.ok().body(postService.deletePost(id, postDeleteRequestDto));
    }
    //Check is like?
    @PostMapping("/post/isLiked")
    public ResponseEntity<ResponseDto<Boolean>> isLiked(@RequestBody PostLikeRequestDto postLikeRequestDto) {
        return ResponseEntity.ok().body(postService.isLiked(postLikeRequestDto));
    }
    //Like post
    @PostMapping("/post/like")
    public ResponseEntity<ResponseDto<PostLikeResponseDto>> likePost(@RequestBody PostLikeRequestDto postLikeRequestDto) {
        return ResponseEntity.ok().body(postService.likePost(postLikeRequestDto));
    }
    //Unlike post
    @PostMapping("/post/unlike")
    public ResponseEntity<ResponseDto<PostLikeResponseDto>> unlikePost(@RequestBody PostLikeRequestDto postUnlikeRequestDto) {
        return ResponseEntity.ok().body(postService.unlikePost(postUnlikeRequestDto));
    }
    //-----WORKSHOP API-----//
    //Get all workshop
    @GetMapping("/workshop/all")
    public ResponseEntity<ResponseDto<List<WorkshopResponseDto>>> getAllWorkshop(){
        return ResponseEntity.ok().body(workshopService.getAllWorkshop());
    }
    //Get workshop by id
    @GetMapping("/workshop/{id}")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> getWorkshopById(@PathVariable Long id){
        return ResponseEntity.ok().body(workshopService.getWorkshopById(id));
    }
    //Create workshop
    @PostMapping("/workshop/create")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> createWorkshop(@RequestBody WorkshopRequestDto workshopCreateRequestDto){
        return ResponseEntity.ok().body(workshopService.createWorkshop(workshopCreateRequestDto));
    }
    //Edit workshop
    /*@PutMapping("/workshop/{id}/edit")
    public ResponseEntity<ResponseDto<WorkshopResponseDto>> editWorkshop(@PathVariable Long id, @RequestBody WorkshopRequestDto workshopEditRequestDto){
        return ResponseEntity.ok().body(workshopService.editWorkshop(workshopEditRequestDto, id));
    }*/
}
