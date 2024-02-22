using FormAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FormAPI.Controllers;

[ApiController]
[Route("/api/auth/")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        return Ok(await _userRepository.GetAll());
    }

    [HttpGet("{userId:int}")]
    public async Task<ActionResult<UserDto>> Get(int userId)
    {
        var user = await _userRepository.Get(userId);
        if (user == null)
        {
            return NotFound($"User {userId} was not found.");
        }

        return user;
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Create([FromBody] UserDto dto)
    {
        var newUser = await _userRepository.Add(dto);
        return CreatedAtAction(nameof(Get), new { userId = newUser.Id }, newUser);
    }

    [HttpPut]
    public async Task<ActionResult<UserDto>> Update([FromBody] UserDto dto)
    {
        if (await _userRepository.Get(dto.Id) == null)
        {
            return NotFound($"User with id {dto.Id} was not found.");
        }

        var updatedUser = await _userRepository.Update(dto);
        return Ok(updatedUser);
    }

    [HttpDelete("{userId:int}")]
    public async Task<IActionResult> Delete(int userId)
    {
        if (await _userRepository.Get(userId) == null)
        {
            return NotFound($"User with id {userId} was not found.");
        }

        await _userRepository.Delete(userId);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] UserDto dto)
    {
        if (await _userRepository.Get(dto.Id) == null)
        {
            return Unauthorized("User not found");
        }

        return Ok();
    }
}