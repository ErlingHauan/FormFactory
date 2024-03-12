using FormAPI.Data;
using FormAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Repositories;

public interface ISubmissionRepository
{
    Task<List<SubmissionEntity>> GetAll();
    Task<List<SubmissionEntity>> GetFormSubmissions(Guid formId);
    Task<SubmissionEntity?> Create(SubmissionEntity entity);
}

public class SubmissionRepository : ISubmissionRepository
{
    private readonly ApiDbContext _context;

    public SubmissionRepository(ApiDbContext context)
    {
        _context = context;
    }

    public async Task<List<SubmissionEntity>> GetAll()
    {
        var submissionList = await _context.Submissions.ToListAsync();
        return submissionList;
    }

    public async Task<List<SubmissionEntity>> GetFormSubmissions(Guid formId)
    {
        var submissionList = await _context.Submissions.Where(submission => formId == submission.FormId).ToListAsync();
        return submissionList;
    }
    
    public async Task<SubmissionEntity?> Create(SubmissionEntity entity)
    {
        _context.Submissions.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
}