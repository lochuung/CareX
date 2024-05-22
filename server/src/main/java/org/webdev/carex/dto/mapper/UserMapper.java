package org.webdev.carex.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.webdev.carex.dto.user.HealthyInfoDto;
import org.webdev.carex.dto.user.UserResponse;
import org.webdev.carex.entity.HealthyInfo;
import org.webdev.carex.entity.User;

@Mapper
public interface UserMapper
{
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    UserResponse toDto(User user);

    User toEntity(UserResponse userResponse);

    HealthyInfo toEntity(HealthyInfoDto healthyInfoDto);

    HealthyInfoDto toDto(HealthyInfo healthyInfo);
}
