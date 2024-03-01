using System.Net;
using System.Text;
using FormAPI.Controllers;
using FormAPI.Models;
using FormAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Moq;
using Newtonsoft.Json;
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
}