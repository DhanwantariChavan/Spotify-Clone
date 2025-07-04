import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Navbar = ({ onCategoryChange, currentCategory = 'All' }) => {
  const navigate = useNavigate();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(currentCategory);

  // Update active category when prop changes
  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  // Premium button handler
  const handleExplorePremium = () => {
    setShowPremiumModal(true);
  };

  // Install App button handler
  const handleInstallApp = () => {
    // Check if PWA is installable
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        window.deferredPrompt = null;
      });
    } else {
      // Show install instructions modal
      setShowInstallModal(true);
    }
  };

  // Category filter handler
const handleCategoryChange = (category) => {
  setActiveCategory(category);
  
  // Call parent component's filter function
  if (onCategoryChange) {
    onCategoryChange(category);
  }
  
  // Update URL with category
  const searchParams = new URLSearchParams(window.location.search);
  if (category === 'All') {
    searchParams.delete('category');
  } else {
    searchParams.set('category', category.toLowerCase());
  }
  
  const newSearch = searchParams.toString();
  const newPath = window.location.pathname + (newSearch ? `?${newSearch}` : '');
  window.history.pushState({}, '', newPath);
};


  const closePremiumModal = () => {
    setShowPremiumModal(false);
  };

  const closeInstallModal = () => {
    setShowInstallModal(false);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors"
            src={assets.arrow_left}
            alt="Go back"
            onClick={() => navigate(-1)}
          />
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors"
            src={assets.arrow_right}
            alt="Go forward"
            onClick={() => navigate(+1)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200 transition-colors font-semibold"
            onClick={handleExplorePremium}
          >
            Explore Premium
          </button>
          <button
            className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-gray-800 transition-colors border border-gray-600"
            onClick={handleInstallApp}
          >
            Install App
          </button>
          <div className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">
            DC
          </div>
        </div>
      </div>
      
      {/* Category Filter Buttons */}
      <div className="flex items-center gap-2 mt-4">
        {['All', 'Music', 'Podcasts'].map((category) => (
          <button
            key={category}
            className={`px-4 py-1 rounded-2xl transition-all duration-200 font-medium text-sm ${
              activeCategory === category
                ? 'bg-white text-black shadow-lg transform scale-105'
                : 'bg-[#242424] hover:bg-[#2a2a2a] text-white hover:scale-102'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#121212] p-6 rounded-lg max-w-md w-full mx-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Spotify Premium</h2>
              <button
                onClick={closePremiumModal}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Get Premium Free for 1 month</h3>
                <p className="text-sm opacity-90">Then ₹119/month. Cancel anytime.</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm">Ad-free music listening</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm">Download to listen offline</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm">Play songs in any order</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm">High audio quality</span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 bg-green-500 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition-colors"
                  onClick={() => {
                    console.log('Redirecting to premium signup...');
                    // navigate('/premium/signup');
                    closePremiumModal();
                  }}
                >
                  Get Premium
                </button>
                <button
                  className="px-6 py-3 border border-gray-600 rounded-full hover:bg-gray-800 transition-colors"
                  onClick={closePremiumModal}
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Install App Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#121212] p-6 rounded-lg max-w-md w-full mx-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Install Spotify</h2>
              <button
                onClick={closeInstallModal}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Get the Spotify App</h3>
                <p className="text-sm text-gray-400">
                  Install the app for a better experience with offline listening and more features.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">How to install:</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>• Click the menu button (⋮) in your browser</p>
                  <p>• Select "Install Spotify" or "Add to Home Screen"</p>
                  <p>• Follow the prompts to complete installation</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 bg-green-500 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition-colors"
                  onClick={() => {
                    // Open app store or play store
                    window.open('https://open.spotify.com/download', '_blank');
                    closeInstallModal();
                  }}
                >
                  Download App
                </button>
                <button
                  className="px-6 py-3 border border-gray-600 rounded-full hover:bg-gray-800 transition-colors"
                  onClick={closeInstallModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;