using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly List<Expense> _expenses = new();
        private readonly AppDbContext _context;
        public ExpenseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetAllExpensesAsync()
        {
            return await _context.Expenses.ToListAsync();
        }

        public async Task<Expense?> GetExpenseByIdAsync(Guid id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task<Expense> CreateExpenseAsync(Expense expense)
        {
            expense.Id = Guid.NewGuid();
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<Expense?> UpdateExpenseAsync(Guid id, Expense expense)
        {
            var existingExpense = await _context.Expenses.FindAsync(id);
            if (existingExpense == null)
            {
                throw new KeyNotFoundException($"Expense with ID {id} not found.");
            }           

            existingExpense.Amount = expense.Amount;
            existingExpense.Category = expense.Category;
            existingExpense.Date = expense.Date;
            existingExpense.Description = expense.Description;
            existingExpense.IsTravel = expense.IsTravel;
            
            await _context.SaveChangesAsync();
            return existingExpense ;
        }

        public async Task<bool> DeleteExpenseAsync(Guid id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return false;
            }
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<object>> GetMonthlyExpensesAsync()
        {
            return await _context.Expenses
                .GroupBy(e => new { e.Date.Year, e.Date.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Total = g.Sum(x => x.Amount)
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<Expense>> GetTravelExpensesAsync()
        {
            return await _context.Expenses
                .Where(e => e.IsTravel)
                .ToListAsync();
        }

        public async Task<IEnumerable<object>> GetDailyExpensesAsync()
        {
            return await _context.Expenses
                .GroupBy(e => e.Date.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    Total = g.Sum(x => x.Amount)
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<object>> GetAnnualExpensesAsync()
        {
            return await _context.Expenses
                .GroupBy(e => e.Date.Year)
                .Select(g => new
                {
                    Year = g.Key,
                    Total = g.Sum(x => x.Amount)
                })
                .ToListAsync();
        }

    }
}