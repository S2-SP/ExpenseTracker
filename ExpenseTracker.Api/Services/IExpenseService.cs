using ExpenseTracker.Api.Models;

namespace ExpenseTracker.Api.Services
{
    public interface IExpenseService
    {
        Task<IEnumerable<Expense>> GetAllExpensesAsync();
        Task<Expense?> GetExpenseByIdAsync(Guid id);
        Task<Expense> CreateExpenseAsync(Expense expense);
        Task<Expense?> UpdateExpenseAsync(Guid id, Expense expense);
        Task<bool> DeleteExpenseAsync(Guid id);
        Task<IEnumerable<Expense>> GetTravelExpensesAsync();
        Task<IEnumerable<object>> GetMonthlyExpensesAsync();
    }
}