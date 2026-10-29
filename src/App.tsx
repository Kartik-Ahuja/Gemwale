import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from '@/context/StoreContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { CollectionPage } from '@/pages/CollectionPage';
import { CollectionsIndexPage } from '@/pages/CollectionsIndexPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CustomerDetailsPage } from '@/pages/CustomerDetailsPage';
import { OrderSuccessPage } from '@/pages/OrderSuccessPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { OrderDetailsPage } from '@/pages/OrderDetailsPage';
import { AboutPage } from '@/pages/AboutPage';
import { OurStoryPage } from '@/pages/OurStoryPage';
import { ContactPage } from '@/pages/ContactPage';
import { FaqPage } from '@/pages/FaqPage';
import { ShippingReturnsPage } from '@/pages/ShippingReturnsPage';
import { AdminDashboard } from '@/pages/AdminDashboard';

type FacebookPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

type FacebookPixelWindow = Window & {
  fbq?: FacebookPixel;
  _fbq?: FacebookPixel;
};

const META_PIXEL_ID = '1397407792466971';

function MetaPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/shop') return;

    const pixelWindow = window as FacebookPixelWindow;
    let fbq = pixelWindow.fbq;

    if (!fbq) {
      const pixel = ((...args: unknown[]) => {
        if (pixel.callMethod) pixel.callMethod(...args);
        else pixel.queue.push(args);
      }) as FacebookPixel;

      Object.assign(pixel, {
        queue: [],
        push: (...args: unknown[]) => pixel.queue.push(args),
        loaded: true,
        version: '2.0',
      });

      pixelWindow.fbq = pixel;
      if (!pixelWindow._fbq) pixelWindow._fbq = pixel;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.append(script);

      fbq = pixel;
      fbq('init', META_PIXEL_ID);
    }

    fbq('track', 'PageView', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <MetaPixelTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/collections" element={<CollectionsIndexPage />} />
            <Route path="/collections/:slug" element={<CollectionPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/customer-details" element={<CustomerDetailsPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order-details" element={<OrderDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
