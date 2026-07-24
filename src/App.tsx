import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
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
