using FormAPI.Models;

namespace FormAPI.Mappers;

public class FormMappers
{
    public static FormDto ToFormDto(FormEntity entity)
    {
        return new FormDto
        {
            Id = entity.Id,
            User = entity.User,
            Organization = entity.Organization,
            Title = entity.Title,
            Description = entity.Description,
            Status = entity.Status,
            Published = entity.Published,
            Expires = entity.Expires,
            Components = entity.Components?.Select(ToComponentDto).ToList()
        };
    }

    private static ComponentDto ToComponentDto(ComponentEntity componentEntity)
    {
        return new ComponentDto
        {
            Id = componentEntity.Id,
            Order = componentEntity.Order,
            Label = componentEntity.Label,
            Type = componentEntity.Type,
            Required = componentEntity.Required,
            MinLength = componentEntity.MinLength,
            MaxLength = componentEntity.MaxLength,
            GreaterThan = componentEntity.GreaterThan,
            LessThan = componentEntity.LessThan,
            RadioChoices = componentEntity.RadioChoices
        };
    }
}