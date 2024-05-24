package org.webdev.carex.dto.mapper;

import org.mapstruct.Mapper;
import org.webdev.carex.controller.api.HealthyInfoController;
import org.webdev.carex.dto.user.HealthyInfoDto;
import org.webdev.carex.entity.HealthyInfo;

@Mapper
public interface HealthyInfoMapper {
    HealthyInfoMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(HealthyInfoMapper.class);

    HealthyInfo toHealthyInfo(HealthyInfoDto healthyInfoDto);

    HealthyInfoDto toHealthyInfoDto(HealthyInfo healthyInfo);
}
