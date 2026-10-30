import { AdminCMS } from '@/components/AdminCMS';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VELA* · Panell d\'Administració & CMS Visual',
  description: 'Panell segur d\'edició de contingut en temps real per a VELA Manresa.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminCMS />;
}
