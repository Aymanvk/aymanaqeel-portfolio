export interface Post {
  id: string; // UUID
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string; // UUID
  post_id: string; // UUID
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  ip_hash: string;
  perspective_score: number | null;
  created_at: string;
}

export interface BannedIP {
  id: string; // UUID
  ip_hash: string;
  reason: string | null;
  banned_at: string;
}

// Additional types specified for the project components
export interface Project {
  id: string;
  title: string;
  description: string;
  story?: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imagePath: string;
  accentColor: string; // e.g. '#C8956C'
}

export interface Skill {
  name: string;
  category: 'FRONTEND' | 'BACKEND' | 'TOOLS' | 'AI/ML';
  iconStr?: string; // Optional simple display string
  context: string; // E.g., "Used in AIRES · 2 projects"
}
