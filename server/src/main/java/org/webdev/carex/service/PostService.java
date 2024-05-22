package org.webdev.carex.service;

import org.webdev.carex.dto.ResponseDto;
import org.webdev.carex.dto.request.post.PostDeleteRequestDto;
import org.webdev.carex.dto.request.post.PostLikeRequestDto;
import org.webdev.carex.dto.request.post.PostRequestDto;
import org.webdev.carex.dto.response.post.PostLikeResponseDto;
import org.webdev.carex.dto.response.post.PostResponseDto;

import java.util.List;

public interface PostService {
<<<<<<< HEAD
    ResponseDto<PostResponseDto> createPost(PostRequestDto postCreateRequestDto);
=======
    void createPost();
>>>>>>> 76550d94e548d7d620b20f4431376b517fd5e895

    ResponseDto<PostResponseDto> getPost(Long id);

    ResponseDto<List<PostResponseDto>> getAllPost();

    ResponseDto<PostResponseDto> editPost(Long id, PostRequestDto postEditRequestDto);

    ResponseDto<String> deletePost(Long id, PostDeleteRequestDto postDeleteRequestDto);

    ResponseDto<PostLikeResponseDto> likePost(PostLikeRequestDto postLikeRequestDto);

    ResponseDto<PostLikeResponseDto> unlikePost(PostLikeRequestDto postUnlikeRequestDto);

    ResponseDto<Boolean> isLiked(PostLikeRequestDto postLikeRequestDto);
}
