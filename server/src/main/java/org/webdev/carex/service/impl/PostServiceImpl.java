package org.webdev.carex.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.post.PostLikeRequestDto;
import org.webdev.carex.dto.request.post.PostRequestDto;
import org.webdev.carex.dto.response.post.PostLikeResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;
import org.webdev.carex.entity.Post;
import org.webdev.carex.entity.User;
import org.webdev.carex.exception.BadRequestException;
import org.webdev.carex.repository.PostRepository;
import org.webdev.carex.repository.UserRepository;
import org.webdev.carex.service.PostService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    //Create post
    @Override
    public void createPost() {
        if (!postRepository.findAll().isEmpty()) {
            return;
        }

        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = users.get(0);
        Post post1 = Post.builder()
                        .title("test1")
                        .content("test1")
                        .author(user)
                        .imageUrl("http://link")
                        .build();
        postRepository.save(post1);
        Post post2 = Post.builder()
                .title("test2")
                .content("test2")
                .author(user)
                .imageUrl("http://link")
                .build();
        postRepository.save(post2);
    }

    //Get post by id
    @Override
    public ResponseDto<PostResponseDto> getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));
        PostResponseDto postResponseDto = new PostResponseDto();
        postResponseDto.setTitle(post.getTitle());
        postResponseDto.setContent(post.getContent());
        postResponseDto.setImage(post.getImageUrl());
        postResponseDto.setAuthor(post.getAuthor().getEmail());
        postResponseDto.setId(post.getId());
        postResponseDto.setTotalLike(post.getLikes().size());
        return ResponseDto.success(postResponseDto);
    }

    //Get all post
    @Override
    public ResponseDto<List<PostResponseDto>> getAllPost() {
        List<Post> posts = postRepository.findAll();
        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        for (Post post : posts) {
            PostResponseDto postResponseDto = new PostResponseDto();
            postResponseDto.setTitle(post.getTitle());
            postResponseDto.setContent(post.getContent());
            postResponseDto.setImage(post.getImageUrl());
            postResponseDto.setAuthor(post.getAuthor().getEmail());
            postResponseDto.setId(post.getId());
            postResponseDto.setTotalLike(post.getLikes().size());
            postResponseDtoList.add(postResponseDto);
        }
        return ResponseDto.success(postResponseDtoList);
    }

    @Override
    public ResponseDto<PostResponseDto> createNewPost(PostRequestDto postRequestDto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
        Post post = new Post();
        post.setTitle(postRequestDto.getTitle());
        post.setContent(postRequestDto.getContent());
        post.setAuthor(user);
        post.setImageUrl(postRequestDto.getImageUrl());
        postRepository.save(post);
        PostResponseDto postResponseDto = new PostResponseDto();
        postResponseDto.setId(post.getId());
        postResponseDto.setTitle(post.getTitle());
        postResponseDto.setContent(post.getContent());
        postResponseDto.setImage(post.getImageUrl());
        postResponseDto.setAuthor(post.getAuthor().getEmail());
        return ResponseDto.success(postResponseDto);
    }

    //Edit post
    @Override
    public ResponseDto<PostResponseDto> editPost(Long id,PostRequestDto postRequestDto, String email) {
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));
        User user = post.getAuthor();
        if (user.getEmail().equals(email)) {
            post.setTitle(postRequestDto.getTitle());
            post.setContent(postRequestDto.getContent());
            post.setImageUrl(postRequestDto.getImageUrl());
            postRepository.save(post);
        }
        else {
            throw new RuntimeException("Only author can edit this post");
        }
        PostResponseDto postResponseDto = new PostResponseDto();
        postResponseDto.setId(post.getId());
        postResponseDto.setTitle(post.getTitle());
        postResponseDto.setContent(post.getContent());
        postResponseDto.setImage(post.getImageUrl());
        postResponseDto.setAuthor(post.getAuthor().getEmail());
        postResponseDto.setTotalLike(post.getLikes().size());
        return ResponseDto.success(postResponseDto);
    }

    //Delete post
    @Override
    public ResponseDto<String> deletePost(Long id, String email ) {
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));
        User user = post.getAuthor();
        if (user.getEmail().equals(email)) {
            postRepository.delete(post);
        }
        else {
            throw new RuntimeException("Only author can edit this post");
        }
        return ResponseDto.success("Delete successfully");
    }

    //Like post
    @Override
    public ResponseDto<PostLikeResponseDto> likePost(PostLikeRequestDto postLikeRequestDto, String email) {
        Post post = postRepository.findById(postLikeRequestDto.getPostId()).orElseThrow(()->new RuntimeException("Post not found"));
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("Username not found"));
        List<User> likes = post.getLikes();
        if (likes.contains(user)){
            throw new BadRequestException(HttpStatus.BAD_REQUEST.toString(),"You are already like post");
        }
        likes.add(user);
        post.setLikes(likes);
        postRepository.save(post);
        PostLikeResponseDto postLikeResponseDto = new PostLikeResponseDto();
        postLikeResponseDto.setTotalLike((long) likes.size());
        return ResponseDto.success(postLikeResponseDto);
    }

    //Unlike post
    @Override
    public ResponseDto<PostLikeResponseDto> unlikePost(PostLikeRequestDto postUnlikeRequestDto, String email) {
        Post post = postRepository.findById(postUnlikeRequestDto.getPostId()).orElseThrow(()->new RuntimeException("Post not found"));
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("Username not found"));
        List<User> likes = post.getLikes();
        if (likes.contains(user)) {
            likes.remove(user);
            post.setLikes(likes);
            postRepository.save(post);
            PostLikeResponseDto postUnlikeResponseDto = new PostLikeResponseDto();
            postUnlikeResponseDto.setTotalLike((long) likes.size());
            return ResponseDto.success(postUnlikeResponseDto);
        }
        else {
            throw new BadRequestException(HttpStatus.BAD_REQUEST.toString(), "You doesn't like this post");
        }
    }

    //Check post is liked?
    @Override
    public ResponseDto<Boolean> isLiked(Long id, String email) {
        Post post = postRepository.findById(id).orElseThrow(()->new RuntimeException("Post not found"));
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("Username not found"));
        List<User> likes = post.getLikes();
        for (User like : likes){
            if (like.getEmail().equals(user.getEmail())) {
                return ResponseDto.success(true);
            }
        }
        return ResponseDto.success(false);
    }
}
