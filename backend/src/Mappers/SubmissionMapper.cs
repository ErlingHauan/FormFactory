using System.Security.Cryptography.X509Certificates;
using FormAPI.Models;

namespace FormAPI.Mappers;

public class SubmissionMappers
{
    public static SubmissionEntity ToEntity(SubmissionDto dto)
    {
        var entity = new SubmissionEntity
        {
            Id = dto.Id,
            Submitted = dto.Submitted,
            Components = dto.Components
        };

        return entity;
    }

    public static SubmissionDto ToDto(SubmissionEntity entity)
    {
        var dto = new SubmissionDto
        {
            Id = entity.Id,
            Submitted = entity.Submitted,
            Components = entity.Components
        };

        return dto;
    }
}