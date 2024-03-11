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

    [HttpPost]
    public async Task<ActionResult<SubmissionDto>> Post([FromBody] SubmissionDto dto)
    {
        var entity = SubmissionMappers.ToEntity(dto);
        var result = await _submissionRepository.Create(entity);
        return Ok(result);
    }
}