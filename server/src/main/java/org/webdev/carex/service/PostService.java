package org.webdev.carex.service;

import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.post.PostDeleteRequestDto;
import org.webdev.carex.dto.request.post.PostLikeRequestDto;
import org.webdev.carex.dto.request.post.PostRequestDto;
import org.webdev.carex.dto.response.post.PostLikeResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;

import java.util.List;

public interface PostService {
    ResponseDto<PostResponseDto> createPost(PostRequestDto postCreateRequestDto);

    ResponseDto<PostResponseDto> getPost(Long id);

    ResponseDto<List<PostResponseDto>> getAllPost();

    ResponseDto<PostResponseDto> editPost(Long id, PostRequestDto postEditRequestDto);

    ResponseDto<String> deletePost(Long id, PostDeleteRequestDto postDeleteRequestDto);

    ResponseDto<PostLikeResponseDto> likePost(PostLikeRequestDto postLikeRequestDto);

    ResponseDto<PostLikeResponseDto> unlikePost(PostLikeRequestDto postUnlikeRequestDto);

    ResponseDto<Boolean> isLiked(PostLikeRequestDto postLikeRequestDto);
}
