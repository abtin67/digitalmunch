
export type AdminRole ='super-admin' | 'editor';

export interface AdminItemStatus{
    isActive:boolean;
    isFeatured:boolean
}

export interface SidebarItem{
    label:string;
    herf:string;
    icone:string;
    roles?: AdminRole[]
}

export type OrderStatus = 'pending'|'preparing'|'ready'| 'delivered' | 'cancelled';

export interface AdminResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
export interface AdminUser {
  id: string;
  username: string;
  role: AdminRole; // 'super-admin' | 'editor'
  isActive: boolean; // برای قطع دسترسی (Ban کردن)
  lastLogin: Date;
}

// برای اکشنِ تغییر پسورد
export interface PasswordChangeRequest {
  adminId: string;
  newPassword: string;
  confirmPassword: string;
}