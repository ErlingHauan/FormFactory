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

    [HttpGet("user")]
    public async Task<ActionResult<IEnumerable<FormDto>>> GetAllFormsByUser()
    {
        var email = HttpContext.Session.GetString("authorizedUser");
        List<FormDto> dtoList;

        if (string.IsNullOrEmpty(email))
        {
            dtoList = [];
        }
        else
        {
            var entityList = await _formRepository.GetAllFormsByUser(email);
            dtoList = entityList.Select(FormMappers.ToDto).ToList();
        }

        return Ok(dtoList);
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

    [HttpDelete("{formId:guid}")]
    public async Task<ActionResult<FormDto>> Delete(Guid formId)
    {
        var resultEntity = await _formRepository.Delete(formId);
        if (resultEntity == null)
        {
            return NotFound(formId);
        }

        var resultDto = FormMappers.ToDto(resultEntity);
        return Ok(resultDto);
    }
}