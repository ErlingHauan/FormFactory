using FormAPI.Models;
using FormAPI.Repositories;
using FormAPI.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace FormAPI.Controllers;

[ApiController]
[Route("/api/users/")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    /// <summary>
    /// Gets all users in the database.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var entityList = await _userRepository.GetAll();
        var dtoList = entityList.Select(UserMappers.EntityToDto).ToList();
        return Ok(dtoList);
    }

    /// <summary>
    /// Gets a single user. Uses the session data or an optional userEmail paramater.
    /// </summary>
    [HttpGet("/api/user")]
    public async Task<ActionResult<UserDto>> GetSingle(string? userEmail)
    {
        if (userEmail == null)
        {
            userEmail = HttpContext.Session.GetString("authorizedUser");
        }

        var userEntity = await _userRepository.GetSingleByEmail(userEmail);
        if (userEntity == null)
        {
            return NotFound($"User {userEmail} was not found.");
        }

        var userDto = UserMappers.EntityToDto(userEntity);
        return Ok(userDto);
    }

    /// <summary>
    /// Registers a new user.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<UserDto>> Create([FromBody] UserDto dto)
    {
        var entity = new UserEntity();
        UserMappers.DtoToEntity(dto, entity);
        var createdEntity = await _userRepository.Create(entity);
        var createdDto = UserMappers.EntityToDto(createdEntity);

        HttpContext.Session.SetString("authorizedUser", dto.Email);
        return CreatedAtAction(nameof(GetSingle), new { userId = createdDto.Id }, createdDto);
    }

    /// <summary>
    /// Updates a user. Not used.
    /// </summary>
    [HttpPut]
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task<ActionResult<UserDto>> Update([FromBody] UserDto dto)
    {
        var entity = new UserEntity();
        UserMappers.DtoToEntity(dto, entity);
        var updatedEntity = await _userRepository.Update(entity);
        var updatedDto = UserMappers.EntityToDto(updatedEntity);

        return Ok(updatedDto);
    }

    /// <summary>
    /// Deletes a single user.
    /// </summary>
    [HttpDelete("{userId:int}")]
    public async Task<IActionResult> Delete(int userId)
    {
        if (await _userRepository.GetSingleById(userId) == null)
        {
            return NotFound($"User with id {userId} was not found.");
        }

        await _userRepository.Delete(userId);
        return Ok();
    }

    /// <summary>
    /// Logs in a user.
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] UserDto dto)
    {
        var entity = new UserEntity();
        UserMappers.DtoToEntity(dto, entity);

        var returnedUserEntity = await _userRepository.ConfirmEmailAndPassword(entity);
        if (returnedUserEntity == null)
        {
            return Unauthorized("Email/password combination was not found.");
        }

        var returnedUserDto = UserMappers.EntityToDto(returnedUserEntity); 
        
        // store username in session state (server) and cookie (browser)
        HttpContext.Session.SetString("authorizedUser", dto.Email);
        return Ok(returnedUserDto);
    }

    /// <summary>
    /// Invalidates the session data.
    /// </summary>
    [HttpPost("logout")]
    public ActionResult Logout()
    {
        var email = HttpContext.Session.GetString("authorizedUser");
        Console.WriteLine($"Signing out user: {email}");

        HttpContext.Session.Remove("authorizedUser");

        if (HttpContext.Request.Cookies.ContainsKey(".AspNetCore.Session"))
        {
            Response.Cookies.Delete(".AspNetCore.Session");
        }

        return Ok();
    }
}