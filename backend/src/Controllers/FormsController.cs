using Microsoft.AspNetCore.Mvc;
using FormAPI.Models;

namespace FormAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FormsController : ControllerBase
{
    [HttpGet]
    public ActionResult<FormDto> Get()
    {
        var component = new Component() {Name = "name", Required = true, Label = "What is your name?", Order = 0, Type = "textfield"};
        var form = new FormDto() { Title = "Survey", User = "user1@example.com", Status = "draft", Components = [component]};
        return Ok(form);
    }

    [HttpPost]
    public IActionResult Post([FromBody] FormDto formData)
    {
        return Ok(formData);
    }
}