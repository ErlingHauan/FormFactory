using FormAPI.Mappers;
using Microsoft.AspNetCore.Mvc;
using FormAPI.Models;
using FormAPI.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;

namespace FormAPI.Controllers;

[ApiController]
[Route("/api/forms")]
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
        if (resultEntity == null)
        {
            return BadRequest();
        }
            
        var resultDto = FormMappers.ToDto(resultEntity);
        return CreatedAtAction(nameof(Get), new { formId = resultDto.Id }, resultDto);
    }

    [HttpPut]
    public async Task<ActionResult<FormDto>> Update([FromBody] FormDto formData)
    {
        var entity = FormMappers.ToEntity(formData);
        var resultEntity = await _formRepository.Update(entity);
        if (resultEntity == null)
        {
            return NotFound(formData);
        }
        
        var resultDto = FormMappers.ToDto(resultEntity);
        return Ok(resultDto);
    }

    [HttpDelete]
    public async Task<ActionResult<FormDto>> Delete(Guid id)
    {
        var resultEntity = await _formRepository.Delete(id);
        if (resultEntity == null)
        {
            return NotFound(id);
        }
        
        var resultDto = FormMappers.ToDto(resultEntity);
        return Ok(resultDto);
    }
}