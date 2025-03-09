const statsData = [
  {
    id: "1",
    title: "Bank Balance",
    value: "$143,624",
    change: 2.5,
    description: "Current balance",
  },
  {
    id: "2",
    title: "Uncategorized",
    value: "12",
    change: -0.8,
    description: "From last month",
  },
  {
    id: "3",
    title: "Active Employees",
    value: "7",
    change: 1.2,
    description: "Out of 12 employees",
  },
  {
    id: "4",
    title: "Card Spending",
    value: "$3,287.49",
    change: -1.5,
    description: "Corporate cards",
  },
];

const revenueData = [
  { date: "Feb 14", value: 15000 },
  { date: "Feb 15", value: 18000 },
  { date: "Feb 16", value: 16000 },
  { date: "Feb 17", value: 20000 },
  { date: "Feb 18", value: 17000 },
  { date: "Feb 19", value: 19000 },
  { date: "Feb 20", value: 16500 },
];

const emails = [
  {
    id: "1",
    sender: {
      name: "Hannah Morgan",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
    },
    subject: "Meeting scheduled",
    timestamp: "1:24 PM",
  },
  {
    id: "2",
    sender: {
      name: "Megan Clark",
      avatar: "https://mui.com/static/images/avatar/2.jpg",
    },
    subject: "Update on marketing campaign",
    timestamp: "12:32 PM",
  },
  {
    id: "3",
    sender: {
      name: "Brandon Williams",
      avatar: "https://mui.com/static/images/avatar/3.jpg",
    },
    subject: "Designly 2.0 is about to launch",
    timestamp: "Yesterday at 8:57 PM",
  },
];

const tasks = [
  {
    id: "1",
    title: "Run payroll",
    dueDate: "Mar 4 at 6:00 pm",
    type: "task",
  },
  {
    id: "2",
    title: "Review time off request",
    dueDate: "Mar 7 at 6:00 pm",
    type: "review",
  },
  {
    id: "3",
    title: "Sign board resolution",
    dueDate: "Mar 12 at 6:00 pm",
    type: "meeting",
  },
];

export { statsData, revenueData, emails, tasks };
