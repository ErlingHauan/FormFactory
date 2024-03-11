using FormAPI.Controllers;
using FormAPI.Models;
using FormAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace FormAPI.Tests.Controllers;

public class SubmissionsControllerTests
{
    private readonly Mock<ISubmissionRepository> _mockRepo;
    private readonly SubmissionsController _controller;

    public SubmissionsControllerTests()
    {
        _mockRepo = new Mock<ISubmissionRepository>();
        _controller = new SubmissionsController(_mockRepo.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsAllSubmissions()
    {
        // Arrange
        
        // Act
        var result = await _controller.GetAll();
        
        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.IsType<List<SubmissionDto>>(actionResult.Value);
    }
}