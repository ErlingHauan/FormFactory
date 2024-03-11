using FormAPI.Models;

namespace FormAPI.Mappers;

public class FormMappers
{
    public static FormEntity ToEntity(FormDto dto)
    {
        var entity = new FormEntity
        {
            Id = dto.Id,
            User = dto.User,
            Organization = dto.Organization,
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Published = dto.Published,
            Expires = dto.Expires,
            Components = dto.Components
        };

        return entity;
    }

    public static FormDto ToDto(FormEntity entity)
    {
        var dto = new FormDto
        {
            Id = entity.Id,
            User = entity.User,
            Organization = entity.Organization,
            Title = entity.Title,
            Description = entity.Description,
            Status = entity.Status,
            Published = entity.Published,
            Expires = entity.Expires,
            Components = entity.Components
        };

        return dto;
    }
}