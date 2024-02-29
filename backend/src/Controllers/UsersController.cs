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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var entityList = await _userRepository.GetAll();
        var dtoList = entityList.Select(UserMappers.EntityToDto).ToList();
        return Ok(dtoList);
    }

    [HttpGet("{userId:int}")]
    public async Task<ActionResult<UserDto>> Get(int userId)
    {
        var userEntity = await _userRepository.Get(userId);
        if (userEntity == null)
        {
            return NotFound($"User {userId} was not found.");
        }

        var userDto = UserMappers.EntityToDto(userEntity);
        return Ok(userEntity);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Create([FromBody] UserDto dto)
    {
        var entity = new UserEntity();
        UserMappers.DtoToEntity(dto, entity);
        var createdEntity = await _userRepository.Add(entity);
        var createdDto = UserMappers.EntityToDto(createdEntity);
        
        return CreatedAtAction(nameof(Get), new { userId = createdDto.Id }, createdDto);
    }

    [HttpPut]
    public async Task<ActionResult<UserDto>> Update([FromBody] UserDto dto)
    {
        var entity = new UserEntity();
        UserMappers.DtoToEntity(dto, entity);
        var updatedUser = await _userRepository.Update(entity);
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
    public async Task<ActionResult> Login([FromBody] UserEntity entity)
    {
        if (await _userRepository.ConfirmEmailAndPassword(entity) == null)
        {
            return Unauthorized("Email/password combination was not found.");
        }

        return Ok();
    }
}