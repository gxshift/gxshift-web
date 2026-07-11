export type Role = 'USER' | 'ADMIN' | 'BOOSTER';
export type OrderStatus = 'PENDING_PAYMENT' | 'IN_QUEUE' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface Profile {
  id: string; // UUID from Supabase Auth
  email: string;
  fullName: string;
  role: Role;
  whatsappNumber?: string;
  createdAt: Date;
}

export interface Game {
  id: string;
  name: string; // e.g., "Mobile Legends"
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  gameId: string;
  orderStatus: OrderStatus;
  
  // Order specifics
  currentRank: string; // e.g., "Epic V"
  targetRank: string;  // e.g., "Mythic"
  priceDetail: number;
  
  // Account identifiers (Public for worker)
  gameAccountId: string;
  gameServerId: string;
  gameUsername: string; // Email/Login Moonton
  
  // SENSITIVE RELATION: 
  // Relasi ke tabel terpisah, tidak ikut ditarik saat fetch List Order
  credentialVaultId: string; 
  
  paymentId?: string; // Relation to Payment table
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProgress {
  id: string;
  orderId: string;
  currentStarOrPoint: number;
  screenshotUrl?: string;
  notes?: string;
  updatedBy: string; // Booster/Admin ID
  updatedAt: Date;
}

// TABEL TERPISAH: Dilindungi dengan Row Level Security (RLS) sangat ketat
export interface SensitiveCredentialVault {
  id: string; // Referenced by Order.credentialVaultId
  encryptedData: string; // Password dienkripsi, hanya server/Edge yang bisa dekripsi pakai private key
  iv: string; // Initialization vector jika pakai AES
}

export interface Payment {
  id: string; // Xendit Invoice ID
  orderId: string;
  amount: number;
  status: 'UNPAID' | 'PAID' | 'EXPIRED';
  checkoutUrl: string;
  webhookReceivedAt?: Date;
}