using FormAPI.Models;

namespace FormAPI.Repositories;

public interface ISubmissionRepository
{
    Task<List<SubmissionEntity>> GetAll();
}

public class SubmissionRepository
{
    
}