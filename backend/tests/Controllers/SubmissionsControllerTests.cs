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

    [Fact]
    public async Task GetSingle_ReturnsSingleSubmission()
    {
        // Arrange
        var submissionId = new Guid("00000000-0000-0000-0000-000000000000");
        var mockSubmissions = new List<SubmissionEntity>
        {
            new SubmissionEntity
            {
                Id = submissionId,
                FormId = Guid.NewGuid(),
                Submitted = DateTime.Now,
            },

            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = Guid.NewGuid(),
                Submitted = DateTime.Now,
            }
        };

        _mockRepo.Setup(repo => repo.GetSingle(submissionId))
            .ReturnsAsync(mockSubmissions.First(entity => entity.Id == submissionId));

        // Act
        var result = await _controller.GetSingle(submissionId);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var resultEntity = Assert.IsType<SubmissionDto>(actionResult.Value);
        Assert.Equal(submissionId, resultEntity.Id);
    }

    [Fact]
    public async Task GetFormSubmissions_GetsAllSubmissionsForSpecificForm()
    {
        // Arrange
        var submissionId = new Guid("00000000-0000-0000-0000-000000000000");
        var formId = new Guid("11111111-1111-1111-1111-111111111111");

        var mockSubmissions = new List<SubmissionEntity>
        {
            new SubmissionEntity
            {
                Id = submissionId,
                FormId = formId,
                Submitted = DateTime.Now,
            },

            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = Guid.NewGuid(),
                Submitted = DateTime.Now,
            }
        };

        _mockRepo.Setup(repo => repo.GetFormSubmissions(formId))
            .ReturnsAsync(mockSubmissions.Where(entity => entity.FormId == formId).ToList);

        // Act
        var result = await _controller.GetFormSubmissions(formId);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var resultList = Assert.IsType<List<SubmissionDto>>(actionResult.Value);
        Assert.Single(resultList);

        var resultEntity = resultList[0];
        Assert.Equal(submissionId, resultEntity.Id);
    }

    [Fact]
    public async Task Delete_DeletesSubmission_ReturnsOk()
    {
        // Arrange
        var submissionId = new Guid("00000000-0000-0000-0000-000000000000");
        var mockSubmissions = new List<SubmissionEntity>
        {
            new SubmissionEntity
            {
                Id = submissionId,
                FormId = Guid.NewGuid(),
                Submitted = DateTime.Now,
            },

            new SubmissionEntity
            {
                Id = Guid.NewGuid(),
                FormId = Guid.NewGuid(),
                Submitted = DateTime.Now,
            }
        };

        _mockRepo.Setup(repo => repo.Delete(submissionId))
            .ReturnsAsync(mockSubmissions.First(entity => entity.Id == submissionId));

        // Act
        var result = await _controller.Delete(submissionId);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var resultEntity = Assert.IsType<SubmissionDto>(actionResult.Value);
        Assert.Equal(submissionId, resultEntity.Id);
    }
}