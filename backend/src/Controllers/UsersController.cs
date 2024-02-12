using FormAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace FormAPI.Controllers;

[ApiController]
[Route("/api/auth/")]
public class UsersController : ControllerBase
{
    /* Todo: connect login to a database */
    [HttpPost("login")]
    public IActionResult Login([FromBody] UserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
        {
            return Unauthorized("E-mail or password cannot be empty");
        }
        return Ok();
    }

    /* Todo: connect signup to a database */
    [HttpPost("signup")]
    public IActionResult Signup([FromBody] UserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
        {
            return Unauthorized("E-mail or password cannot be empty");
        }
        return Ok();
    }
}