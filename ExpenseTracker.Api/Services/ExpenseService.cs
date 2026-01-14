using ExpenseTracker.Api.Models;

namespace ExpenseTracker.Api.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly List<Expense> _expenses = new();

        public Task<IEnumerable<Expense>> GetAllExpensesAsync()
        {
            return Task.FromResult(_expenses.AsEnumerable());
        }

        public Task<Expense?> GetExpenseByIdAsync(Guid id)
        {
            var expense = _expenses.FirstOrDefault(e => e.Id == id);
            return Task.FromResult(expense);
        }

        public Task<Expense> CreateExpenseAsync(Expense expense)
        {
            expense.Id = Guid.NewGuid();
            _expenses.Add(expense);
            return Task.FromResult(expense);
        }

        public Task<Expense?> UpdateExpenseAsync(Guid id, Expense expense)
        {
            var existingExpense = _expenses.FirstOrDefault(e => e.Id == id);
            if (existingExpense == null)
            {
                return Task.FromResult<Expense?>(null);
            }

            existingExpense.Amount = expense.Amount;
            existingExpense.Category = expense.Category;
            existingExpense.Date = expense.Date;
            existingExpense.Description = expense.Description;
            existingExpense.IsTravel = expense.IsTravel;

            return Task.FromResult(existingExpense);
        }

        public Task<bool> DeleteExpenseAsync(Guid id)
        {
            var expense = _expenses.FirstOrDefault(e => e.Id == id);
            if (expense == null)
            {
                return Task.FromResult(false);
            }

            _expenses.Remove(expense);
            return Task.FromResult(true);
        }
    }
}