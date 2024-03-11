using FormAPI.Models;
using FormAPI.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Repositories;

public interface IFormRepository
{
    Task<List<FormEntity>> GetAll();
    Task<FormEntity?> Get(Guid id);
    Task<FormEntity?> Create(FormEntity form);
    Task<FormEntity?> Update(FormEntity form);
    Task<FormEntity?> Delete(Guid id);
}

public class FormRepository : IFormRepository
{
    private readonly ApiDbContext _context;

    public FormRepository(ApiDbContext context)
    {
        _context = context;
    }

    public async Task<List<FormEntity>> GetAll()
    {
        var formList = await _context.Forms.ToListAsync();
        return formList;
    }

    public async Task<FormEntity?> Get(Guid id)
    {
        var foundEntity = await _context.Forms.FindAsync(id);
        if (foundEntity == null)
        {
            Console.WriteLine($"From with ID {id} was not found.");
            return null;
        }
        return foundEntity;
    }

    public async Task<FormEntity?> Create(FormEntity form)
    {
        _context.Forms.Add(form);
        await _context.SaveChangesAsync();
        return form;
    }

    public async Task<FormEntity?> Update(FormEntity form)
    {
        _context.Forms.Update(form);
        await _context.SaveChangesAsync();
        return form;
    }

    public async Task<FormEntity?> Delete(Guid id)
    {
        var foundForm = await _context.Forms.SingleOrDefaultAsync(f => f.Id == id);
        if (foundForm == null)
        {
            Console.WriteLine($"From with ID {id} was not found.");
            return null;
        }
        _context.Forms.Remove(foundForm);
        await _context.SaveChangesAsync();
        return foundForm;
    }
}