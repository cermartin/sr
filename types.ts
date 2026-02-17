export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  details?: string;
  dimensions?: string;
  variants?: ProductVariant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
}

export interface QuizState {
  step: number;
  location: string;
  usage: string;
  cleaning: string;
  userName: string;
  userEmail: string;
}
