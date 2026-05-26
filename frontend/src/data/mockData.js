export const demoUsers = [
  {
    id: 1,
    first_name: "Michael",
    last_name: "Smith",
    email: "michael@itstep.kz",
    group: "P32",
    course: "2",
    direction: "Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    cover: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
    bio: "Student at ITSTEP Academy. Backend Developer | Python | Django | PostgreSQL. Always learning something new.",
    clubs: ["Backend Lab", "Cyber Club"],
    interests: ["Go", "Databases", "AI"],
    role: "director"
  },
  {
    id: 2,
    first_name: "Ethan",
    last_name: "Johnson",
    email: "ethan@itstep.kz",
    group: "W21",
    course: "1",
    direction: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    bio: "I build clean interfaces and love campus events.",
    clubs: ["Design Studio"],
    interests: ["React", "UI", "Music"],
    role: "student"
  },
  {
    id: 3,
    first_name: "Sophia",
    last_name: "Brown",
    email: "sophia@itstep.kz",
    group: "D14",
    course: "3",
    direction: "Teacher / UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    cover: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    bio: "Design systems, research, student clubs.",
    clubs: ["Design Studio", "Media Club"],
    interests: ["Figma", "Branding", "UX"],
    role: "teacher"
  }
];

export const demoPosts = [
  {
    id: 101,
    user_id: 1,
    title: "AI in education",
    content: "Just finished an awesome presentation about AI in education. The discussion after class was even better.",
    created_at: "2026-05-23T10:15:00Z",
    likes: [2, 3],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 102,
    user_id: 2,
    title: "Django ORM",
    content: "Learning Django ORM deeply today. Relations finally started making sense.",
    created_at: "2026-05-22T17:20:00Z",
    likes: [1],
    image: ""
  },
  {
    id: 103,
    user_id: 3,
    title: "Design critique",
    content: "Very inspiring design review in the club room. Small details changed the whole flow.",
    created_at: "2026-05-21T13:40:00Z",
    likes: [1, 2],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80"
  }
];

export const demoComments = [
  { id: 1, post_id: 101, user_id: 2, content: "Great job! The examples were clear.", created_at: "2026-05-23T10:20:00Z" },
  { id: 2, post_id: 101, user_id: 3, content: "Can you share the slides later?", created_at: "2026-05-23T10:24:00Z" },
  { id: 3, post_id: 102, user_id: 1, content: "Try prefetch_related next.", created_at: "2026-05-22T17:30:00Z" }
];

export const demoClubs = [
  { id: 1, name: "Backend Lab", category: "Programming", schedule: "Tue, Thu 16:00", contact: "Mr. Karimov, room 302", members: [1], description: "Go, Python, SQL, API design and team backend practice." },
  { id: 2, name: "Design Studio", category: "Creative", schedule: "Wed 15:30", contact: "Ms. Amina, room 210", members: [2, 3], description: "UX research, Figma, visual systems and product thinking." },
  { id: 3, name: "Cyber Club", category: "Security", schedule: "Fri 17:00", contact: "Admin office", members: [1], description: "CTF tasks, Linux basics, network security and safe practice." },
  { id: 4, name: "Media Club", category: "Community", schedule: "Mon 14:00", contact: "Student council", members: [3], description: "Photo, video, college news and event coverage." }
];

export const demoNews = [
  { id: 1, title: "Open lecture: career in IT", type: "event", date: "2026-05-27", body: "Guests from local IT companies will talk about internships and junior positions." },
  { id: 2, title: "Project deadline", type: "deadline", date: "2026-05-30", body: "Final team project repositories and README files must be ready before defense." },
  { id: 3, title: "New club room schedule", type: "announcement", date: "2026-05-24", body: "Club room 210 is now available every weekday after 15:00." }
];

export const demoMessages = [
  { id: 1, chat_id: "1-2", from: 2, to: 1, text: "Can you check my API request?", created_at: "2026-05-23T09:00:00Z" },
  { id: 2, chat_id: "1-2", from: 1, to: 2, text: "Sure, send the payload.", created_at: "2026-05-23T09:03:00Z" },
  { id: 3, chat_id: "1-3", from: 3, to: 1, text: "The profile page mockup is ready.", created_at: "2026-05-23T11:30:00Z" }
];
