using FormAPI.Controllers;
using FormAPI.Models;
using FormAPI.Repositories;
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
        //Assert
        var mockUsers = new List<UserEntity>
        {
            new UserEntity { Id = 1, Email = "user1@example.com", Password = "password1", Organization = "Org1" },
        };
        _mockRepo.Setup(repo => repo.Get(1)).ReturnsAsync(mockUsers.First(u => u.Id == 1));

        // Act
        var result = await _controller.Get(1);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var user = Assert.IsType<UserEntity>(actionResult.Value);
        Assert.Equal(1, user.Id);
        Assert.Equal("user1@example.com", user.Email);
    }

    [Fact]
    public async Task Get_UserNotFound_ReturnsNotFound()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.Get(1)).ReturnsAsync((UserEntity)null);

        // Act
        var result = await _controller.Get(1);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task Create_ReturnsCreatedUser()
    {
        // Arrange
        var newUserDto = new UserDto(1, "user1@example.com", "password1", "Org1");
        _mockRepo.Setup(repo => repo.Create(It.IsAny<UserEntity>())).ReturnsAsync((UserEntity e) => e);
        
        // Act
        var result = await _controller.Create(newUserDto);

        // Assert
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedDto = Assert.IsType<UserDto>(createdAtActionResult.Value);
        Assert.Equal(1, returnedDto.Id);
        Assert.Equal("user1@example.com", returnedDto.Email);
    }

    // Write a test that do not create a user if data is missing

    // Write a test that should update a user successfully

    // Write a test that does not find the provided user

    // Write a test that can't update the user due to missing information

    // Write a test that logs in the user successfully

    // Write a test that can't log in the user due to wrong email/password combination

    // Make tests into E2E tests
}