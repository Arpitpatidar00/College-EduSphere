const postData = [
  // Existing posts
  {
    id: 1,
    user: {
      username: "Frances Guerrero",
      position: "Web Developer at Webestica",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    time: "2 hours ago",
    content:
      "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
    images: [
      "https://img.freepik.com/premium-photo/stunning-anime-girl-drawing-showcasing-beautiful-face-intricate-details_1283595-23849.jpg?w=360",
      "https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg",
      "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-first-01.webp",
      "https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896",
    ],
    likes: 120,
    comments: [
      {
        id: 101,
        user: {
          username: "Alice Johnson",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        text: "Congratulations! That's an amazing achievement! 🎉",
      },
    ],
    shares: 10,
  },
  {
    id: 2,
    user: {
      username: "John Doe",
      position: "Software Engineer at TechCorp",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    time: "5 hours ago",
    content: "Excited to start my new role at TechCorp!",
    images: [
      "https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg",
      "https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896",
    ],
    likes: 85,
    comments: [
      {
        id: 102,
        user: {
          username: "Jane Smith",
          avatar:
            "https://cdn.pixabay.com/photo/2023/09/09/08/00/ai-generated-8242654_960_720.png",
        },
        text: "Best of luck in your new position!",
      },
    ],
    shares: 5,
  },
  // New posts
  {
    id: 3,
    user: {
      username: "Emma Brown",
      position: "Graphic Designer at Creative Studio",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    time: "3 hours ago",
    content:
      "Just finished a new logo design for a client. Feeling accomplished!",
    images: [
      "https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896",
      "https://cdn.pixabay.com/photo/2023/09/09/08/00/ai-generated-8242654_960_720.png",
    ],
    likes: 95,
    comments: [],
    shares: 8,
  },
  {
    id: 4,
    user: {
      username: "Liam Smith",
      position: "Marketing Specialist at MarketMinds",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    time: "6 hours ago",
    content: "Attended a great marketing webinar today. Learned a lot!",
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/026/829/465/small/beautiful-girl-with-autumn-leavephoto.jpg",
      "https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg",
    ],
    likes: 75,
    comments: [],
    shares: 3,
  },
  {
    id: 5,
    user: {
      username: "Liam Smith",
      position: "Marketing Specialist at MarketMinds",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    time: "6 hours ago",
    content: "Attended a great marketing webinar today. Learned a lot!",
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/046/286/162/small/woman-standing-brick-wall-sunbeam-photo.jpg",
      "https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg",
      "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-first-01.webp",
    ],
    likes: 75,
    comments: [],
    shares: 3,
  },
  {
    id: 6,
    user: {
      username: "Liam Smith",
      position: "Marketing Specialist at MarketMinds",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    time: "6 hours ago",
    content: "Attended a great marketing webinar today. Learned a lot!",
    images: [
      "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-first-01.webp",
      "https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg",
    ],
    likes: 75,
    comments: [],
    shares: 3,
  },
  {
    id: 7,
    user: {
      username: "Liam Smith",
      position: "Marketing Specialist at MarketMinds",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    time: "6 hours ago",
    content: "Attended a great marketing webinar today. Learned a lot!",
    images: [
      "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp",
    ],
    likes: 75,
    comments: [],
    shares: 3,
  },
];

export default postData;
