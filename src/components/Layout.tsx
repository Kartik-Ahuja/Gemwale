import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-burgundy-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
