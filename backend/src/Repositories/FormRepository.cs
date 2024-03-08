using FormAPI.Models;
using FormAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace FormAPI.Repositories;

public interface IFormRepository
{
    Task<List<FormEntity>> GetAll();
    Task<FormEntity> Create(FormEntity form);
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

    public async Task<FormEntity> Create(FormEntity form)
    {
        _context.Forms.Add(form);
        await _context.SaveChangesAsync();
        return form;
    }
}