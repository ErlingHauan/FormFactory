using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FormsController : ControllerBase
{
  [HttpGet]
  public ActionResult<Form> Get()
  {
    var formData = new Form { Name = "Ola Nordmann", Email = "ola@norge.no" };
    return Ok(formData);
  }

  [HttpPost]
  public IActionResult Post([FromBody] Form formData)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    return Ok(formData);
  }
}
