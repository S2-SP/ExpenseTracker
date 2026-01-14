namespace ExpenseTracker.Api.Models
{
    public class Expense
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; } = "";
        public DateTime Date { get; set; }
        public string Description { get; set; } = "";
        public bool IsTravel { get; set; }
    }
}