package org.webdev.carex.service;

import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.post.PostLikeRequestDto;
import org.webdev.carex.dto.request.post.PostRequestDto;
import org.webdev.carex.dto.response.post.PostLikeResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;

import java.util.List;

public interface PostService {
    void createPost();

    ResponseDto<PostResponseDto> getPost(Long id);

    ResponseDto<List<PostResponseDto>> getAllPost();

    ResponseDto<PostResponseDto> editPost(Long id, PostRequestDto postRequestDto, String email);

    ResponseDto<String> deletePost(Long id, String email);

    ResponseDto<PostLikeResponseDto> likePost(PostLikeRequestDto postLikeRequestDto, String email);

    ResponseDto<PostLikeResponseDto> unlikePost(PostLikeRequestDto postUnlikeRequestDto, String email);

    ResponseDto<Boolean> isLiked(Long id, String email);

    ResponseDto<PostResponseDto> createNewPost(PostRequestDto postRequestDto, String email);
}
