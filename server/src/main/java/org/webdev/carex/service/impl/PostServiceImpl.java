package org.webdev.carex.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.post.PostDeleteRequestDto;
import org.webdev.carex.dto.request.post.PostLikeRequestDto;
import org.webdev.carex.dto.request.post.PostRequestDto;
import org.webdev.carex.dto.response.post.PostLikeResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;
import org.webdev.carex.entity.Post;
import org.webdev.carex.entity.User;
import org.webdev.carex.repository.PostRepository;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.service.PostService;

import java.util.ArrayList;
import java.util.List;

import static org.webdev.carex.constant.ResponseConstant.SUCCESS;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final ObjectMapper objectMapper;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    //Create post
    @Override
    public ResponseDto<PostResponseDto> createPost(PostRequestDto postCreateRequestDto) {
        User user = userRepository.findByUsername(postCreateRequestDto.getUsername()).orElseThrow(()->new RuntimeException("Username not found"));
        Post post = new Post();
        post.setTitle(postCreateRequestDto.getTitle());
        post.setContent(postCreateRequestDto.getContent());
        post.setAuthor(user);
        postRepository.save(post);
        PostResponseDto postCreateResponseDto = objectMapper.convertValue(post, PostResponseDto.class);
        return ResponseDto.<PostResponseDto>builder()
                .data(postCreateResponseDto)
                .statusCode("200")
                .result(SUCCESS)
                .build();
    }

    //Get post by id
    @Override
    public ResponseDto<PostResponseDto> getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));
        PostResponseDto postResponseDto = objectMapper.convertValue(post, PostResponseDto.class);
        return ResponseDto.<PostResponseDto>builder()
                .result(SUCCESS)
                .data(postResponseDto)
                .statusCode("200")
                .build();
    }

    //Get all post
    @Override
    public ResponseDto<List<PostResponseDto>> getAllPost() {
        List<Post> posts = postRepository.findAll();
        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        for (Post post : posts) {
            PostResponseDto postResponseDto = objectMapper.convertValue(post, PostResponseDto.class);
            postResponseDtoList.add(postResponseDto);
        }
        return ResponseDto.<List<PostResponseDto>>builder()
                .statusCode("200")
                .result(SUCCESS)
                .data(postResponseDtoList)
                .build();
    }

    //edit post
    @Override
    public ResponseDto<PostResponseDto> editPost(Long id, PostRequestDto postEditRequestDto) {
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));
        User user = post.getAuthor();
        if (user.getUsername().equals(postEditRequestDto.getUsername())) {
            post.setTitle(postEditRequestDto.getTitle());
            post.setContent(postEditRequestDto.getContent());
            post.setImageUrl(postEditRequestDto.getImageUrl());
            postRepository.save(post);
        }
        else {
            throw new RuntimeException("Only author can edit this post");
        }
        PostResponseDto postResponseDto = objectMapper.convertValue(post, PostResponseDto.class);
        return ResponseDto.<PostResponseDto>builder()
                .data(postResponseDto)
                .statusCode("200")
                .result(SUCCESS)
                .build();
    }

    @Override
    public ResponseDto<String> deletePost(Long id, PostDeleteRequestDto postDeleteRequestDto) {
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));
        User user = post.getAuthor();
        if (user.getUsername().equals(postDeleteRequestDto.getUsername())) {
            postRepository.delete(post);
        }
        else {
            throw new RuntimeException("Only author can edit this post");
        }
        return ResponseDto.<String>builder()
                .statusCode("200")
                .result(SUCCESS)
                .data("Delete successfully")
                .build();
    }

    @Override
    public ResponseDto<PostLikeResponseDto> likePost(PostLikeRequestDto postLikeRequestDto) {
        Post post = postRepository.findById(postLikeRequestDto.getPostId()).orElseThrow(()->new RuntimeException("Post not found"));
        User user = userRepository.findByUsername(postLikeRequestDto.getUsername()).orElseThrow(()->new RuntimeException("Username not found"));
        List<User> likes = post.getLikes();
        likes.add(user);
        post.setLikes(likes);
        postRepository.save(post);
        PostLikeResponseDto postLikeResponseDto = new PostLikeResponseDto();
        postLikeResponseDto.setTotalLike((long) likes.size());
        return ResponseDto.<PostLikeResponseDto>builder()
                .statusCode("200")
                .result(SUCCESS)
                .data(postLikeResponseDto)
                .build();
    }

    @Override
    public ResponseDto<PostLikeResponseDto> unlikePost(PostLikeRequestDto postUnlikeRequestDto) {
        Post post = postRepository.findById(postUnlikeRequestDto.getPostId()).orElseThrow(()->new RuntimeException("Post not found"));
        User user = userRepository.findByUsername(postUnlikeRequestDto.getUsername()).orElseThrow(()->new RuntimeException("Username not found"));
        List<User> likes = post.getLikes();
        likes.remove(user);
        post.setLikes(likes);
        postRepository.save(post);
        PostLikeResponseDto postUnlikeResponseDto = new PostLikeResponseDto();
        postUnlikeResponseDto.setTotalLike((long) likes.size());
        return ResponseDto.<PostLikeResponseDto>builder()
                .statusCode("200")
                .result(SUCCESS)
                .data(postUnlikeResponseDto)
                .build();
    }

    @Override
    public ResponseDto<Boolean> isLiked(PostLikeRequestDto postIslikeRequestDto) {
        Post post = postRepository.findById(postIslikeRequestDto.getPostId()).orElseThrow(()->new RuntimeException("Post not found"));
        User user = userRepository.findByUsername(postIslikeRequestDto.getUsername()).orElseThrow(()->new RuntimeException("Username not found"));
        List<User> likes = post.getLikes();
        boolean isLiked = false;
        for (User like : likes){
            if (like.getUsername().equals(user.getUsername())) {
                isLiked = true;
                break;
            }
        }
        return ResponseDto.<Boolean>builder()
                .statusCode("200")
                .result(SUCCESS)
                .data(isLiked)
                .build();
    }
}
