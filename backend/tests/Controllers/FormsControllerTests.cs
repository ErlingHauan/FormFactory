using FormAPI.Controllers;
using FormAPI.Models;
using FormAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace FormAPI.Tests.Controllers;

public class FormsControllerTests
{
    private readonly Mock<IFormRepository> _mockRepo;
    private readonly FormsController _controller;

    public FormsControllerTests()
    {
        _mockRepo = new Mock<IFormRepository>();
        _controller = new FormsController(_mockRepo.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsAllForms()
    {
        // Arrange
        var mockComponents = new List<FormComponent>
        {
            new FormComponent
                { Name = "question1", Label = "Question 1", Required = true, Order = 0, Type = "textfield" },
            new FormComponent
            {
                Name = "question2", Label = "Question 2", Required = false, Order = 1, Type = "radio",
                RadioChoices = ["Yes", "No"]
            }
        };

        var mockForms = new List<FormEntity>
        {
            new FormEntity
            {
                Id = Guid.NewGuid(), User = "user1@example.com", Title = "Form1", Status = "Published",
                Components = mockComponents
            },
            new FormEntity
            {
                Id = Guid.NewGuid(), User = "user2@example.com", Title = "Form2", Status = "Draft",
                Components = mockComponents
            }
        };
        _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(mockForms);

        // Act
        var result = await _controller.GetAll();

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedForms = Assert.IsType<List<FormDto>>(actionResult.Value);
        Assert.Equal(2, returnedForms.Count);
    }

    [Fact]
    public async Task Get_ReturnsFoundForm()
    {
        // Arrange
        var mockGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        var mockForms = new List<FormEntity>
        {
            new FormEntity
            {
                Id = mockGuid, User = "user1@example.com", Title = "Form1", Status = "Published"
            },
        };

        _mockRepo.Setup(repo => repo.Get(mockGuid)).ReturnsAsync(mockForms.First(u => u.Id == mockGuid));

        // Act
        var result = await _controller.GetSingle(mockGuid);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var form = Assert.IsType<FormDto>(actionResult.Value);
        Assert.Equal(mockGuid, form.Id);
        Assert.Equal("user1@example.com", form.User);
    }

    [Fact]
    public async Task Get_FormNotFound_ReturnsNotFound()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.Get(It.IsAny<Guid>())).ReturnsAsync((FormEntity?)null);

        // Act
        var randomGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        var result = await _controller.GetSingle(randomGuid);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task Create_ReturnsCreatedForm()
    {
        // Arrange
        var mockComponents = new List<FormComponent>
        {
            new FormComponent
                { Name = "question1", Label = "Question 1", Required = true, Order = 0, Type = "textfield" },
            new FormComponent
            {
                Name = "question2", Label = "Question 2", Required = false, Order = 1, Type = "radio",
                RadioChoices = ["Yes", "No"]
            }
        };
        var mockGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        var mockForm = new FormDto
        {
            Id = mockGuid,
            User = "user1@example.com",
            Title = "Form1",
            Status = "Published",
            Components = mockComponents
        };

        _mockRepo.Setup(repo => repo.Create(It.IsAny<FormEntity>())).ReturnsAsync((FormEntity e) => e);

        // Act
        var result = await _controller.Create(mockForm);

        // Assert
        var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedDto = Assert.IsType<FormDto>(actionResult.Value);
        Assert.Equal(mockGuid, returnedDto.Id);
        Assert.Equal("user1@example.com", returnedDto.User);
    }

    [Fact]
    public async Task Update_ReturnsUpdatedForm()
    {
        // Arrange 
        var mockComponents = new List<FormComponent>
        {
            new FormComponent
                { Name = "question1", Label = "Question 1", Required = true, Order = 0, Type = "textfield" },
            new FormComponent
            {
                Name = "question2", Label = "Question 2", Required = false, Order = 1, Type = "radio",
                RadioChoices = ["Yes", "No"]
            }
        };
        var mockGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        var mockForm = new FormDto
        {
            Id = mockGuid,
            User = "user1@example.com",
            Title = "Form1",
            Status = "Published",
            Components = mockComponents
        };

        _mockRepo.Setup(repo => repo.Update(It.IsAny<FormEntity>())).ReturnsAsync((FormEntity e) => e);

        // Act
        var result = await _controller.Update(mockForm);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.IsType<FormDto>(actionResult.Value);
    }

    [Fact]
    public async Task Delete_WhenCalled_ReturnsOkWithFormDto()
    {
        // Arrange
        var mockGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        var mockForm = new FormEntity
        { Id = mockGuid, User = "user1@example.com", Title = "Form1", Status = "Published" };

        _mockRepo.Setup(repo => repo.Delete(It.IsAny<Guid>())).ReturnsAsync(mockForm);

        // Act
        var result = await _controller.Delete(mockForm.Id);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.IsType<FormDto>(actionResult.Value);
    }

    [Fact]
    public async Task Delete_FormNotFound_ReturnsNotFound()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.Get(It.IsAny<Guid>())).ReturnsAsync((FormEntity?)null);

        // Act
        var mockGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        var result = await _controller.Delete(mockGuid);

        // Assert
        var actionResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.IsType<Guid>(actionResult.Value);
    }
}