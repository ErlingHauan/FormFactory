using Microsoft.AspNetCore.Mvc;
using FormAPI.Models;

namespace FormAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FormsController : ControllerBase
{
    [HttpGet]
    public ActionResult<FormEntity> Get()
    {
        var formData = new FormEntity { Name = "Ola Nordmann", Email = "ola@norge.no" };
        return Ok(formData);
    }

    [HttpPost]
    public IActionResult Post([FromBody] FormEntity formEntityData)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(formEntityData);
    }
}
