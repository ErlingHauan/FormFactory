using FormAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FormAPI.Controllers;
 
[ApiController]
[Route("/api/submissions/")]
public class SubmissionsController : ControllerBase
{
   private readonly ISubmissionRepository _submissionRepository;

   public SubmissionsController(ISubmissionRepository submissionRepository)
   {
      _submissionRepository = submissionRepository;
   }
}