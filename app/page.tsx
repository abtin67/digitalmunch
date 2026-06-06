// app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // به محض اینکه کاربر وارد سایت شد، هدایتش کن به زبان فارسی (یا هر زبان پیش‌فرض)
  redirect('/fa');
}