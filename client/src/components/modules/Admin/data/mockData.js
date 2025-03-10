const statsData = [
  {
    id: "1",
    title: "Total Registered Colleges",
    value: "120",
    change: 5.2,
    description: "New colleges added this month",
  },
  {
    id: "2",
    title: "Total Students",
    value: "15,678",
    change: 3.8,
    description: "New students joined this week",
  },
  {
    id: "3",
    title: "Active Users Today",
    value: "8,912",
    change: 6.3,
    description: "Compared to yesterday",
  },
  {
    id: "4",
    title: "Posts Created",
    value: "1,243",
    change: 4.1,
    description: "New posts in the last 24 hours",
  },
];

const revenueData = [
  { date: "Mar 1", value: 5000 },
  { date: "Mar 2", value: 8000 },
  { date: "Mar 3", value: 7500 },
  { date: "Mar 4", value: 9000 },
  { date: "Mar 5", value: 8700 },
  { date: "Mar 6", value: 11000 },
  { date: "Mar 7", value: 9500 },
];

const collegeRequests = [
  {
    id: "1",
    college: {
      name: "Harvard University",
      logo: "https://mui.com/static/images/avatar/1.jpg",
    },
    adminName: "Hannah Morgan",
    timestamp: "1:24 PM",
  },
  {
    id: "2",
    college: {
      name: "Stanford University",
      logo: "https://mui.com/static/images/avatar/2.jpg",
    },
    adminName: "Megan Clark",
    timestamp: "12:32 PM",
  },
  {
    id: "3",
    college: {
      name: "MIT",
      logo: "https://mui.com/static/images/avatar/3.jpg",
    },
    adminName: "Brandon Williams",
    timestamp: "Yesterday at 8:57 PM",
  },
  {
    id: "4",
    college: {
      name: "Harvard University",
      logo: "https://mui.com/static/images/avatar/1.jpg",
    },
    adminName: "Hannah Morgan",
    timestamp: "1:24 PM",
  },
  {
    id: "5",
    college: {
      name: "Stanford University",
      logo: "https://mui.com/static/images/avatar/2.jpg",
    },
    adminName: "Megan Clark",
    timestamp: "12:32 PM",
  },
  {
    id: "6",
    college: {
      name: "MIT",
      logo: "https://mui.com/static/images/avatar/3.jpg",
    },
    adminName: "Brandon Williams",
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

export { statsData, revenueData, collegeRequests, tasks };
