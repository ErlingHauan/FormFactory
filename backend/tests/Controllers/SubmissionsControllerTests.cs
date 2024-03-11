using Castle.Components.DictionaryAdapter;
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
        var mockResponses = new EditableList<SubmissionResponse>
        {
            new SubmissionResponse
            {
                Name = "question1",
                Label = "Question 1",
                Order = 0,
                Response = "Yes."
            }
        };

        var mockSubmissions = new List<SubmissionEntity>
        {
            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = Guid.NewGuid(),
                Submitted = DateTime.Now,
                Responses = mockResponses
            },

            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = Guid.NewGuid(),
                Submitted = DateTime.Now,
                Responses = mockResponses
            }
        };

        _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(mockSubmissions);

        // Act
        var result = await _controller.GetAll();

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var resultList = Assert.IsType<List<SubmissionDto>>(actionResult.Value);
        Assert.Equal(2, resultList.Count);
    }
}