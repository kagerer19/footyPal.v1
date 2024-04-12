export interface User {
    userid: number;
    username: string;
    email: string; // Managed by Supabase Auth, no password needed.
    favouredlocation: number;
    favouredposition: string; // Could be ENUM if we have a fixed set of positions.
    ishometeam: boolean;
  }
  