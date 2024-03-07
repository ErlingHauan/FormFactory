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
    public async Task<ActionResult<IEnumerable<FormEntity>>> GetAll()
    {
        var entityList = await _formRepository.GetAll();
        return Ok(entityList);
    }

    [HttpPost]
    public IActionResult Post([FromBody] FormDto formData)
    {
        return Ok(formData);
    }
}