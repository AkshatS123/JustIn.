import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Hash, MessageCircle, User, X } from 'lucide-react';
import { MapPin } from 'lucide-react';

const Marketplace = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      title: 'black + purple floral dress',
      price: 18.50,
      image: '/products/black-purple-dress.jpg',
      seller: 'emma',
      sellerAvatar: '/avatars/emma.jpg'
    },
    {
      id: 2,
      title: 'women\'s floral spring dress',
      price: 22,
      image: '/products/white-blue-dress.jpg',
      seller: 'hannah',
      sellerAvatar: '/avatars/hannah.jpg'
    },
    {
      id: 3,
      title: 'pretty flowery multi dress',
      price: 25,
      image: '/products/flowery-multi.jpg',
      seller: 'olivia',
      sellerAvatar: '/avatars/olivia.jpg'
    },
    {
      id: 4,
      title: 'colorful flower dress with belt',
      price: 14,
      image: '/products/colorful-flower-dress.jpg',
      seller: 'mia',
      sellerAvatar: '/avatars/mia.jpg'
    },
    {
      id: 5,
      title: 'silk black top',
      price: 16,
      image: '/products/silk-black-top.jpg',
      seller: 'anna',
      sellerAvatar: '/avatars/anna.jpg'
    },
    {
      id: 6,
      title: 'floral pattern summer dress',
      price: 19,
      image: '/products/floral-pattern-dress.jpg',
      seller: 'sophia',
      sellerAvatar: '/avatars/sophia.jpg'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with Logo and Location */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-serif text-gray-900 font-semibold">
            Just In.
          </h1>
          <div className="flex items-center text-purple-600">
            <MapPin className="h-5 w-5 mr-1" />
            <span className="font-medium">NYU</span>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="sticky top-[56px] z-40 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          <div className="relative flex-1 min-w-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text"
              placeholder="women's floral dresses"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              defaultValue="women's floral dresses"
            />
          </div>
          <button className="flex items-center whitespace-nowrap px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md">
            Sort <span className="ml-1">↓</span>
          </button>
        </div>
        <div className="flex mt-2 mb-1">
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-gray-800 text-white mr-2">
            <span>Tag</span>
            <X className="ml-1 h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Results Label */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-medium text-gray-900">Results</h2>
      </div>

      {/* Product Grid */}
      <div className="flex-1 px-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-xs">Product Image</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 truncate w-full" style={{ maxWidth: '130px' }}>
                    {product.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-1">
                <div className="h-6 w-6 rounded-full bg-gray-300 mr-1.5"></div>
                <span className="text-sm text-gray-600">@{product.seller}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          <Link to="/marketplace" className="flex flex-col items-center justify-center w-full py-1">
            <Home className="h-6 w-6 text-gray-900" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/explore" className="flex flex-col items-center justify-center w-full py-1">
            <Hash className="h-6 w-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Explore</span>
          </Link>
          <Link to="/messages" className="flex flex-col items-center justify-center w-full py-1">
            <MessageCircle className="h-6 w-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Messages</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center w-full py-1">
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Marketplace; 