using FormAPI.Mappers;
using Microsoft.AspNetCore.Mvc;
using FormAPI.Models;
using FormAPI.Repositories;

namespace FormAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FormsController : ControllerBase
{
    private readonly IFormRepository _formRepository;
    
    public FormsController(IFormRepository formRepository)
    {
        _formRepository = formRepository;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FormDto>>> GetAll()
    {
        var entityList = await _formRepository.GetAll();
        var dtoList = entityList.Select(FormMappers.ToDto).ToList();
        return Ok(dtoList);
    }
    
    [HttpGet("{formId:guid}")]
    public async Task<ActionResult<FormDto>> Get(Guid formId)
    {
        var entity = await _formRepository.Get(formId);

        if (entity == null)
        {
            return NotFound(formId);
        }
        
        var dto = FormMappers.ToDto(entity);
        return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<FormDto>> Create([FromBody] FormDto formData)
    {
        var entity = FormMappers.ToEntity(formData);
        var resultEntity = await _formRepository.Create(entity);
        var resultDto = FormMappers.ToDto(resultEntity);
        return CreatedAtAction(nameof(Get), new { formId = resultDto.Id }, resultDto);
    }
}