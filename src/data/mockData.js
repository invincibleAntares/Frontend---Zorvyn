export const CATEGORIES = [
  "Food & Dining",
  "Shopping",
  "Transport",
  "Entertainment",
  "Health",
  "Housing",
  "Utilities",
  "Salary",
  "Freelance",
  "Investment",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#f97316",
  Shopping: "#8b5cf6",
  Transport: "#06b6d4",
  Entertainment: "#ec4899",
  Health: "#10b981",
  Housing: "#f59e0b",
  Utilities: "#6366f1",
  Salary: "#22c55e",
  Freelance: "#14b8a6",
  Investment: "#3b82f6",
};

export const transactions = [
  // April 2026
  { id: "t001", date: "2026-04-01", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: "t002", date: "2026-04-02", description: "Grocery Store", amount: 87.5, type: "expense", category: "Food & Dining" },
  { id: "t003", date: "2026-04-03", description: "Netflix Subscription", amount: 15.99, type: "expense", category: "Entertainment" },
  { id: "t004", date: "2026-04-04", description: "Uber Ride", amount: 22.4, type: "expense", category: "Transport" },
  { id: "t005", date: "2026-04-05", description: "Freelance Project - Web Dev", amount: 1200, type: "income", category: "Freelance" },
  { id: "t006", date: "2026-04-06", description: "Electricity Bill", amount: 94, type: "expense", category: "Utilities" },
  { id: "t007", date: "2026-04-07", description: "Restaurant Dinner", amount: 62, type: "expense", category: "Food & Dining" },
  { id: "t008", date: "2026-04-08", description: "Amazon Shopping", amount: 134.9, type: "expense", category: "Shopping" },
  { id: "t009", date: "2026-04-09", description: "Gym Membership", amount: 40, type: "expense", category: "Health" },
  { id: "t010", date: "2026-04-10", description: "Apartment Rent", amount: 1400, type: "expense", category: "Housing" },
  { id: "t011", date: "2026-04-11", description: "Dividend Income", amount: 320, type: "income", category: "Investment" },
  { id: "t012", date: "2026-04-12", description: "Coffee Shop", amount: 18.5, type: "expense", category: "Food & Dining" },
  { id: "t013", date: "2026-04-14", description: "Bus Pass", amount: 35, type: "expense", category: "Transport" },
  { id: "t014", date: "2026-04-15", description: "Doctor Visit", amount: 75, type: "expense", category: "Health" },
  { id: "t015", date: "2026-04-17", description: "Spotify Premium", amount: 9.99, type: "expense", category: "Entertainment" },

  // March 2026
  { id: "t016", date: "2026-03-01", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: "t017", date: "2026-03-03", description: "Grocery Store", amount: 104, type: "expense", category: "Food & Dining" },
  { id: "t018", date: "2026-03-05", description: "Freelance Project - Logo", amount: 850, type: "income", category: "Freelance" },
  { id: "t019", date: "2026-03-07", description: "Online Course", amount: 49.99, type: "expense", category: "Shopping" },
  { id: "t020", date: "2026-03-10", description: "Apartment Rent", amount: 1400, type: "expense", category: "Housing" },
  { id: "t021", date: "2026-03-12", description: "Electricity Bill", amount: 88, type: "expense", category: "Utilities" },
  { id: "t022", date: "2026-03-14", description: "Restaurant Lunch", amount: 34, type: "expense", category: "Food & Dining" },
  { id: "t023", date: "2026-03-16", description: "Fuel", amount: 55, type: "expense", category: "Transport" },
  { id: "t024", date: "2026-03-18", description: "Netflix Subscription", amount: 15.99, type: "expense", category: "Entertainment" },
  { id: "t025", date: "2026-03-22", description: "Gym Membership", amount: 40, type: "expense", category: "Health" },
  { id: "t026", date: "2026-03-25", description: "Dividend Income", amount: 290, type: "income", category: "Investment" },
  { id: "t027", date: "2026-03-28", description: "Clothing Store", amount: 178, type: "expense", category: "Shopping" },

  // February 2026
  { id: "t028", date: "2026-02-01", description: "Monthly Salary", amount: 5200, type: "income", category: "Salary" },
  { id: "t029", date: "2026-02-03", description: "Grocery Store", amount: 96, type: "expense", category: "Food & Dining" },
  { id: "t030", date: "2026-02-06", description: "Freelance Project - App", amount: 2100, type: "income", category: "Freelance" },
  { id: "t031", date: "2026-02-08", description: "Apartment Rent", amount: 1400, type: "expense", category: "Housing" },
  { id: "t032", date: "2026-02-10", description: "Electricity Bill", amount: 110, type: "expense", category: "Utilities" },
  { id: "t033", date: "2026-02-12", description: "Valentine's Dinner", amount: 125, type: "expense", category: "Food & Dining" },
  { id: "t034", date: "2026-02-15", description: "Gym Membership", amount: 40, type: "expense", category: "Health" },
  { id: "t035", date: "2026-02-17", description: "Concert Tickets", amount: 90, type: "expense", category: "Entertainment" },
  { id: "t036", date: "2026-02-20", description: "Amazon Shopping", amount: 210, type: "expense", category: "Shopping" },
  { id: "t037", date: "2026-02-25", description: "Dividend Income", amount: 310, type: "income", category: "Investment" },

  // January 2026
  { id: "t038", date: "2026-01-01", description: "Monthly Salary", amount: 5000, type: "income", category: "Salary" },
  { id: "t039", date: "2026-01-04", description: "Grocery Store", amount: 112, type: "expense", category: "Food & Dining" },
  { id: "t040", date: "2026-01-06", description: "New Year Shopping", amount: 250, type: "expense", category: "Shopping" },
  { id: "t041", date: "2026-01-08", description: "Apartment Rent", amount: 1400, type: "expense", category: "Housing" },
  { id: "t042", date: "2026-01-10", description: "Electricity Bill", amount: 120, type: "expense", category: "Utilities" },
  { id: "t043", date: "2026-01-15", description: "Freelance Project", amount: 600, type: "income", category: "Freelance" },
  { id: "t044", date: "2026-01-18", description: "Doctor Visit", amount: 85, type: "expense", category: "Health" },
  { id: "t045", date: "2026-01-22", description: "Restaurant Dinner", amount: 55, type: "expense", category: "Food & Dining" },
  { id: "t046", date: "2026-01-26", description: "Dividend Income", amount: 270, type: "income", category: "Investment" },

  // December 2025
  { id: "t047", date: "2025-12-01", description: "Monthly Salary", amount: 5000, type: "income", category: "Salary" },
  { id: "t048", date: "2025-12-05", description: "Holiday Shopping", amount: 380, type: "expense", category: "Shopping" },
  { id: "t049", date: "2025-12-08", description: "Apartment Rent", amount: 1400, type: "expense", category: "Housing" },
  { id: "t050", date: "2025-12-10", description: "Electricity Bill", amount: 130, type: "expense", category: "Utilities" },
  { id: "t051", date: "2025-12-15", description: "Christmas Dinner", amount: 145, type: "expense", category: "Food & Dining" },
  { id: "t052", date: "2025-12-18", description: "Freelance Bonus", amount: 500, type: "income", category: "Freelance" },
  { id: "t053", date: "2025-12-22", description: "Concert Tickets", amount: 80, type: "expense", category: "Entertainment" },
  { id: "t054", date: "2025-12-28", description: "Dividend Income", amount: 300, type: "income", category: "Investment" },

  // November 2025
  { id: "t055", date: "2025-11-01", description: "Monthly Salary", amount: 5000, type: "income", category: "Salary" },
  { id: "t056", date: "2025-11-04", description: "Grocery Store", amount: 92, type: "expense", category: "Food & Dining" },
  { id: "t057", date: "2025-11-07", description: "Apartment Rent", amount: 1400, type: "expense", category: "Housing" },
  { id: "t058", date: "2025-11-09", description: "Freelance Project", amount: 950, type: "income", category: "Freelance" },
  { id: "t059", date: "2025-11-12", description: "Electricity Bill", amount: 98, type: "expense", category: "Utilities" },
  { id: "t060", date: "2025-11-18", description: "Gym Membership", amount: 40, type: "expense", category: "Health" },
];

export const monthlyHistory = [
  { month: "Nov 25", income: 5950, expenses: 1630, balance: 4320 },
  { month: "Dec 25", income: 5800, expenses: 2135, balance: 3665 },
  { month: "Jan 26", income: 5870, expenses: 2022, balance: 3848 },
  { month: "Feb 26", income: 7610, expenses: 2071, balance: 5539 },
  { month: "Mar 26", income: 6340, expenses: 1965, balance: 4375 },
  { month: "Apr 26", income: 6720, expenses: 1897, balance: 4823 },
];

export const balanceTrend = [
  { month: "Nov 25", balance: 18200 },
  { month: "Dec 25", balance: 21865 },
  { month: "Jan 26", balance: 25713 },
  { month: "Feb 26", balance: 31252 },
  { month: "Mar 26", balance: 35627 },
  { month: "Apr 26", balance: 40450 },
];
