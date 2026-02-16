export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface QuizState {
  step: number;
  location: string;
  usage: string;
  cleaning: string;
  userName: string;
  userEmail: string;
}