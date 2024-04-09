using FormAPI.Mappers;
using FormAPI.Models;
using FormAPI.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FormAPI.Controllers;

[ApiController]
[Route("/api/submissions/")]
public class SubmissionsController : ControllerBase
{
    private readonly ISubmissionRepository _submissionRepository;

    public SubmissionsController(ISubmissionRepository submissionRepository)
    {
        _submissionRepository = submissionRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SubmissionDto>>> GetAll()
    {
        var entityList = await _submissionRepository.GetAll();
        var dtoList = entityList.Select(SubmissionMappers.ToDto).ToList();
        return Ok(dtoList);
    }

    [HttpGet("{submissionId:guid}")]
    public async Task<ActionResult<SubmissionDto>> GetSingle(Guid submissionId)
    {
        var entity = await _submissionRepository.GetSingle(submissionId);

        if (entity == null)
        {
            return NotFound();
        }

        var dto = SubmissionMappers.ToDto(entity);
        return Ok(dto);
    }

    [HttpGet("form/{formId:guid}")]
    public async Task<ActionResult<IEnumerable<SubmissionDto>>> GetFormSubmissions(Guid formId)
    {
        var entityList = await _submissionRepository.GetFormSubmissions(formId);
        var dtoList = entityList.Select(SubmissionMappers.ToDto).ToList();
        return Ok(dtoList);
    }

    [HttpPost]
    public async Task<ActionResult<SubmissionDto>> Create([FromBody] SubmissionDto dto)
    {
        var entity = SubmissionMappers.ToEntity(dto);
        var result = await _submissionRepository.Create(entity);
        return Ok(result);
    }

    [HttpDelete("{submissionId:guid}")]
    public async Task<ActionResult<SubmissionDto>> DeleteSingle(Guid submissionId)
    {
        var entity = await _submissionRepository.DeleteSingle(submissionId);

        if (entity == null)
        {
            return NotFound();
        }

        var dto = SubmissionMappers.ToDto(entity);
        return Ok(dto);
    }

    [HttpDelete("form/{formId:guid}")]
    public async Task<ActionResult<IEnumerable<SubmissionDto>>> DeleteAllSubmissionsInForm(Guid formId)
    {
        var entityList = await _submissionRepository.DeleteAllSubmissionsInForm(formId);
        if (entityList == null)
        {
            return Ok();
        }

        var dtoList = entityList.Select(SubmissionMappers.ToDto).ToList();
        return Ok(dtoList);
    }
}