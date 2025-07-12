import { useState } from "react";
import { Play, Pause, MoreHorizontal, Heart, Download, Share , Clock } from "lucide-react";

const MyPlaylist1 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState(new Set());

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = (songId) => {
    const newLikedSongs = new Set(likedSongs);
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  // Empty playlist state
  const songs = [];

  return (
    <div className="flex-1 bg-gradient-to-b from-neutral-900 via-neutral-900 to-black text-white overflow-y-auto">
      {/* Header Section */}
      <div className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-transparent opacity-80"></div>
        
        <div className="relative flex items-end gap-6 p-6 pb-8 pt-16">
          {/* Playlist Cover */}
          <div className="w-56 h-56 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center shadow-2xl border border-gray-700">
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-60">🎵</div>
              <div className="text-xs text-gray-400 font-medium">No cover</div>
            </div>
          </div>
          
          {/* Playlist Info */}
          <div className="flex-1 pb-6">
            <p className="text-xs font-bold mb-2 text-white uppercase tracking-wider">Playlist</p>
            <h1 className="text-6xl font-black mb-6 text-white leading-tight">My Playlist #1</h1>
            <p className="text-gray-300 mb-4 text-sm">Your personal music collection</p>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <span className="font-semibold text-white">Created by You</span>
              <span className="mx-1">•</span>
              <span className="font-medium">{songs.length} songs</span>
              {songs.length > 0 && (
                <>
                  <span className="mx-1">•</span>
                  <span className="text-gray-400">about 0 min</span>
                </>
              )}
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
          
          <Heart 
            size={28} 
            className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          />
          
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
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-black/40 backdrop-blur-sm min-h-screen">
        {/* Songs List Header (shown even when empty for consistency) */}
        {songs.length > 0 && (
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
        {songs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <div className="text-center max-w-md">
              <div className="text-7xl mb-8 opacity-60">🎵</div>
              <h2 className="text-2xl font-bold mb-4 text-white">Start building your playlist</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Search for songs and artists to add to your playlist, or browse our recommendations just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-green-500 text-black rounded-full hover:bg-green-400 hover:scale-105 transition-all duration-200 font-bold text-sm">
                  Find songs
                </button>
                <button className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white/10 hover:border-gray-500 transition-all duration-200 font-bold text-sm">
                  Browse all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaylist1;