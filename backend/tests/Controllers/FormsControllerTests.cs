using FormAPI.Controllers;
using FormAPI.Mappers;
using FormAPI.Models;
using FormAPI.Repositories;
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
        var mockComponents = new List<Component>
        {
            new Component { Name = "question1", Label = "Question 1", Required = true, Order = 0, Type = "textfield" },
            new Component
            {
                Name = "question2", Label = "Question 2", Required = false, Order = 1, Type = "radio",
                RadioChoices = ["Yes", "No"]
            }
        };
        
        var mockForms = new List<FormEntity>
        {
            new FormEntity { Id = Guid.NewGuid(), User = "user1@example.com", Title = "Form1", Status = "Published", Components = mockComponents},
            new FormEntity { Id = Guid.NewGuid(), User = "user2@example.com", Title = "Form2", Status = "Draft", Components = mockComponents}
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
        var mockComponents = new List<Component>
        {
            new Component { Name = "question1", Label = "Question 1", Required = true, Order = 0, Type = "textfield" },
            new Component
            {
                Name = "question2", Label = "Question 2", Required = false, Order = 1, Type = "radio",
                RadioChoices = ["Yes", "No"]
            }
        };
        
        var mockGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        var mockForms = new List<FormEntity>
        {
            new FormEntity { Id = mockGuid, User = "user1@example.com", Title = "Form1", Status = "Published", Components = mockComponents},
        };
        
        _mockRepo.Setup(repo => repo.Get(mockGuid)).ReturnsAsync(mockForms.First(u => u.Id == mockGuid));

        // Act
        var result = await _controller.Get(mockGuid);

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
        var mockGuid = new Guid("8bd8e16b-e1ec-4834-9c76-863b56995291");
        _mockRepo.Setup(repo => repo.Get(mockGuid)).ReturnsAsync((FormEntity?)null);

        // Act
        var result = await _controller.Get(mockGuid);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result.Result);
    }
}