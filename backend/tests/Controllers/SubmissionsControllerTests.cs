using FormAPI.Controllers;
using FormAPI.Repositories;
using Moq;

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
}