using FormAPI.Controllers;
using FormAPI.Mappers;
using FormAPI.Models;
using FormAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace FormAPI.Tests.Controllers;

public class UsersControllerTests
{
    private readonly Mock<IUserRepository> _mockRepo;
    private readonly UsersController _controller;

    public UsersControllerTests()
    {
        _mockRepo = new Mock<IUserRepository>();
        _controller = new UsersController(_mockRepo.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsAllUsers()
    {
        // Arrange
        var mockUsers = new List<UserEntity>
        {
            new UserEntity { Id = 1, Email = "user1@example.com", Password = "password1", Organization = "Org1" },
            new UserEntity { Id = 2, Email = "user2@example.com", Password = "password2", Organization = "Org2" }
        };
        _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(mockUsers);

        // Act
        var result = await _controller.GetAll();

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedUsers = Assert.IsType<List<UserDto>>(actionResult.Value);
        Assert.Equal(2, returnedUsers.Count);
    }

    [Fact]
    public async Task Get_ReturnsFoundUser()
    {
        //Arrange
        var mockUsers = new List<UserEntity>
        {
            new UserEntity { Id = 1, Email = "user1@example.com", Password = "password1", Organization = "Org1" },
        };
        _mockRepo.Setup(repo => repo.GetSingleByEmail("user1@example.com")).ReturnsAsync(mockUsers.First(u => u.Id == 1));

        // Act
        var result = await _controller.GetSingle("user1@example.com");

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var user = Assert.IsType<UserDto>(actionResult.Value);
        Assert.Equal(1, user.Id);
        Assert.Equal("user1@example.com", user.Email);
    }

    [Fact]
    public async Task Get_UserNotFound_ReturnsNotFound()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.GetSingleByEmail("user1@example.com")).ReturnsAsync((UserEntity?)null);

        // Act
        var result = await _controller.GetSingle("user1@example.com");

        // Assert
        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task Create_ReturnsCreatedUser()
    {
        // Arrange
        var newUserDto = new UserDto(1, "user1@example.com", "password1", "Org1");
        _mockRepo.Setup(repo => repo.Create(It.IsAny<UserEntity>())).ReturnsAsync((UserEntity e) => e);

        var httpContext = new DefaultHttpContext();
        var sessionMock = new Mock<ISession>();
        httpContext.Session = sessionMock.Object;

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = httpContext
        };

        // Act
        var result = await _controller.Create(newUserDto);

        // Assert
        var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedDto = Assert.IsType<UserDto>(actionResult.Value);
        Assert.Equal(1, returnedDto.Id);
        Assert.Equal("user1@example.com", returnedDto.Email);
    }

    [Fact]
    public async Task Update_ReturnsUpdatedUser()
    {
        // Arrange 
        var updatedUserDto = new UserDto(1, "user1@example.com", "password1", "Org1");
        _mockRepo.Setup(repo => repo.Update(It.IsAny<UserEntity>())).ReturnsAsync((UserEntity e) => e);

        // Act
        var result = await _controller.Update(updatedUserDto);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.IsType<UserDto>(actionResult.Value);
    }

    [Fact]
    public async Task Login_ReturnsOk()
    {
        // Arrange
        var dto = new UserDto(0, "user1@example.com", "password1", null);
        var entity = new UserEntity();
        UserMappers.DtoToEntity(dto, entity);
        _mockRepo.Setup(repo => repo.ConfirmEmailAndPassword(It.IsAny<UserEntity>())).ReturnsAsync(entity);

        var httpContext = new DefaultHttpContext();
        var sessionMock = new Mock<ISession>();
        httpContext.Session = sessionMock.Object;

        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = httpContext
        };

        // Act
        var result = await _controller.Login(dto);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.IsType<UserDto>(actionResult.Value);
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized()
    {
        // Arrange
        var dto = new UserDto(0, "user1@example.com", "password1", null);
        _mockRepo.Setup(repo => repo.ConfirmEmailAndPassword(It.IsAny<UserEntity>())).ReturnsAsync((UserEntity?)null);

        // Act
        var result = await _controller.Login(dto);

        // Assert
        var actionResult = Assert.IsType<UnauthorizedObjectResult>(result.Result);
        Assert.IsType<string>(actionResult.Value);
    }

    [Fact]
    public async Task Delete_ReturnsOk()
    {
        // Arrange
        var userToBeDeleted = new UserEntity
        { Id = 1, Email = "user1@example.com", Password = "password1", Organization = "Org1" };
        _mockRepo.Setup(repo => repo.GetSingleById(userToBeDeleted.Id)).ReturnsAsync(userToBeDeleted);
        _mockRepo.Setup(repo => repo.Delete(userToBeDeleted.Id));

        // Act
        var result = await _controller.Delete(userToBeDeleted.Id);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task Delete_ReturnsNotFound()
    {
        // Arrange
        var userId = 1;
        _mockRepo.Setup(repo => repo.GetSingleById(userId)).ReturnsAsync((UserEntity?)null);
        _mockRepo.Setup(repo => repo.Delete(userId));

        // Act
        var result = await _controller.Delete(userId);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }
}