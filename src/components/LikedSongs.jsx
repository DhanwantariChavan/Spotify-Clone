import { useState } from "react";
import { Play, Pause, MoreHorizontal, Download, Share, Search, Clock, Heart, Filter } from "lucide-react";

const LikedSongs = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Empty liked songs state
  const likedSongs = [];

  return (
    <div className="flex-1 bg-gradient-to-b from-neutral-900 via-neutral-900 to-black text-white overflow-y-auto">
      {/* Header Section */}
      <div className="relative">
        {/* Gradient Background - Spotify's Liked Songs uses this specific purple gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-700 via-purple-800 to-transparent opacity-95"></div>
        
        <div className="relative flex items-end gap-6 p-6 pb-8 pt-16">
          {/* Liked Songs Icon */}
          <div className="w-56 h-56 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-2xl">
            <Heart size={80} fill="white" className="text-white" />
          </div>
          
          {/* Playlist Info */}
          <div className="flex-1 pb-6">
            <p className="text-xs font-bold mb-2 text-white uppercase tracking-wider">Playlist</p>
            <h1 className="text-6xl font-black mb-6 text-white leading-tight">Liked Songs</h1>
            <p className="text-gray-200 mb-4 text-sm leading-relaxed">Your favorite tracks, all in one place</p>
            <div className="flex items-center gap-1 text-sm text-gray-200">
              <span className="font-semibold text-white">Created by You</span>
              <span className="mx-1">•</span>
              <span className="font-medium">{likedSongs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="relative bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-6 p-6 pt-8">
          <button
            onClick={togglePlay}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
          </button>
          
          <Download 
            size={24} 
            className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          />
          
          <Share 
            size={24} 
            className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          />
          
          <MoreHorizontal 
            size={28} 
            className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          />

          {/* Sort and Search Options */}
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                <Search size={16} />
                <span className="hidden sm:inline">Search in playlist</span>
              </button>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="hidden sm:inline">Recently added</span>
                <Filter size={16} />
              </button>
              
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-48">
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">Sort by</div>
                    {[
                      { value: "recent", label: "Recently added" },
                      { value: "title", label: "Title" },
                      { value: "artist", label: "Artist" },
                      { value: "album", label: "Album" },
                      { value: "date", label: "Date added" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortMenu(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-700 transition-colors duration-200 ${
                          sortBy === option.value ? 'text-green-400' : 'text-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-black/40 backdrop-blur-sm min-h-screen">
        {/* Songs List Header (shown even when empty for consistency) */}
        {likedSongs.length > 0 && (
          <div className="px-6 pb-2">
            <div className="flex items-center gap-4 py-3 border-b border-gray-700/50 text-sm text-gray-400 font-medium">
              <div className="w-8 text-center">#</div>
              <div className="flex-1">Title</div>
              <div className="w-32 hidden md:block">Album</div>
              <div className="w-24 hidden lg:block">Date added</div>
              <div className="w-16 text-center">
                <Clock size={16} />
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {likedSongs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <div className="text-center max-w-md">
              <Heart size={64} className="text-gray-600 mb-8 mx-auto" />
              <h2 className="text-2xl font-bold mb-4 text-white">Songs you like will appear here</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Save songs by tapping the heart icon. We'll collect them here for you.
              </p>
              <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-200 font-bold text-sm">
                Find something you like
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;