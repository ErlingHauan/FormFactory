using FormAPI.Data;
using FormAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Repositories;

public interface ISubmissionRepository
{
    Task<List<SubmissionEntity>> GetAll();
    Task<SubmissionEntity?> GetSingle(Guid submissionId);
    Task<List<SubmissionEntity>> GetFormSubmissions(Guid formId);
    Task<SubmissionEntity?> Create(SubmissionEntity entity);
    Task<SubmissionEntity?> DeleteSingle(Guid submussionId);
    Task<List<SubmissionEntity>?> DeleteAllSubmissionsInForm(Guid formId);
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

    public async Task<SubmissionEntity?> GetSingle(Guid submissionId)
    {
        var entity = await _context.Submissions.FindAsync(submissionId);

        if (entity == null)
        {
            Console.WriteLine($"Submission with ID {submissionId} was not found.");
            return null;
        }

        return entity;
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

    public async Task<SubmissionEntity?> DeleteSingle(Guid submissionId)
    {
        var entity = await _context.Submissions.FindAsync(submissionId);
        if (entity == null)
        {
            Console.WriteLine($"Submission with ID {submissionId} was not found.");
            return null;
        }

        _context.Submissions.Remove(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<List<SubmissionEntity>?> DeleteAllSubmissionsInForm(Guid formId)
    {
        var submissionList = await _context.Submissions.Where(submission => formId == submission.FormId).ToListAsync();

        if (submissionList.Count == 0)
        {
            Console.WriteLine($"Could not find submissions under form ID {formId}.");
            return null;
        }

        _context.Submissions.RemoveRange(submissionList);

        await _context.SaveChangesAsync();
        return submissionList;
    }
}