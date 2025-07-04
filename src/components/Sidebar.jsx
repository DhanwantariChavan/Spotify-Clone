import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { ChevronRight, ChevronDown, Home, Search, Music, Plus } from "lucide-react";

const Sidebar = () => {
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);
  const navigate = useNavigate(); // Use React Router's navigate hook

  const toggleLibrary = () => {
    setIsLibraryExpanded(!isLibraryExpanded);
  };

  const handleNavigation = (path) => {
    navigate(path); // Actually navigate to the path
  };

  return (
    <div className="w-[25%] bg-black text-white h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="p-4 border-b border-gray-800">
        <div 
          onClick={() => handleNavigation('/')} 
          className="flex items-center gap-3 pl-4 cursor-pointer hover:bg-[#1a1a1a] rounded transition-colors py-2"
        >
          <Home size={20} />
          <span className="font-semibold">Home</span>
        </div>
        
        <div 
          onClick={() => handleNavigation('/search')} 
          className="flex items-center gap-3 pl-4 cursor-pointer hover:bg-[#1a1a1a] rounded transition-colors py-2"
        >
          <Search size={20} />
          <span className="font-semibold">Search</span>
        </div>
      </div>

      {/* Your Library Section */}
      <div className="flex-1 p-4">
        <div 
          onClick={toggleLibrary}
          className="flex items-center gap-3 pl-4 cursor-pointer hover:bg-[#1a1a1a] rounded transition-colors py-2 mb-4"
        >
          {isLibraryExpanded ? (
            <ChevronDown size={20} className="text-gray-400 transition-transform" />
          ) : (
            <ChevronRight size={20} className="text-gray-400 transition-transform" />
          )}
          <Music size={20} />
          <span className="font-semibold">Your Library</span>
          <Plus 
            size={16} 
            className="ml-auto mr-2 text-gray-400 hover:text-white transition-colors cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation('/create-playlist');
            }}
          />
        </div>

        {/* Expanded Library Content with smooth animation */}
        <div 
          className={`ml-8 space-y-2 transition-all duration-300 overflow-hidden ${
            isLibraryExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="text-sm text-gray-400 mb-3">Recently Created</div>
          <div className="space-y-1">
            <div 
              onClick={() => handleNavigation('/playlist/1')}
              className="p-2 rounded hover:bg-[#1a1a1a] cursor-pointer transition-colors"
            >
              <div className="font-medium">My Playlist #1</div>
              <div className="text-xs text-gray-400">Playlist • 0 songs</div>
            </div>
            <div 
              onClick={() => handleNavigation('/playlist/2')}
              className="p-2 rounded hover:bg-[#1a1a1a] cursor-pointer transition-colors"
            >
              <div className="font-medium">Liked Songs</div>
              <div className="text-xs text-gray-400">Playlist • 0 songs</div>
            </div>
            <div 
              onClick={() => handleNavigation('/playlist/3')}
              className="p-2 rounded hover:bg-[#1a1a1a] cursor-pointer transition-colors"
            >
              <div className="font-medium">Discover Weekly</div>
              <div className="text-xs text-gray-400">Playlist • 30 songs</div>
            </div>
          </div>
        </div>

        {/* Create Playlist Card */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 mt-6">
          <div className="font-semibold mb-1">Create Your first playlist</div>
          <div className="text-sm text-gray-400 mb-3">It's easy we will help you</div>
          <button 
            onClick={() => handleNavigation("/create-playlist")}
            className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition font-semibold text-sm"
          >
            Create Playlist
          </button>
        </div>

        {/* Browse Podcasts Card */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
          <div className="font-semibold mb-1">Let's find some podcasts to follow</div>
          <div className="text-sm text-gray-400 mb-3">We'll keep you updated on new episodes</div>
          <button 
            onClick={() => handleNavigation("/browse-podcasts")}
            className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition font-semibold text-sm"
          >
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;