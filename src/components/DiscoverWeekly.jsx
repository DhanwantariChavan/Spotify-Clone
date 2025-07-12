import { useState } from "react";
import { Play, Pause, MoreHorizontal, Heart, Download, Share, Clock, Info } from "lucide-react";

const DiscoverWeekly = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [currentSong, setCurrentSong] = useState(null);

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

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  // Mock data for Discover Weekly
  const songs = [
    { id: 1, title: "Midnight Dreams", artist: "Echo Valley", album: "Neon Nights", duration: "3:42", cover: "🎵", dateAdded: "6 days ago" },
    { id: 2, title: "Electric Pulse", artist: "Synth Wave", album: "Digital Horizons", duration: "4:15", cover: "🎶", dateAdded: "6 days ago" },
    { id: 3, title: "Cosmic Journey", artist: "Stellar Sounds", album: "Space Odyssey", duration: "5:23", cover: "🌟", dateAdded: "6 days ago" },
    { id: 4, title: "Ocean Breeze", artist: "Calm Waters", album: "Tranquil Moments", duration: "3:58", cover: "🌊", dateAdded: "6 days ago" },
    { id: 5, title: "Urban Lights", artist: "City Vibes", album: "Metropolitan", duration: "4:02", cover: "🏙️", dateAdded: "6 days ago" },
    { id: 6, title: "Forest Whispers", artist: "Nature's Song", album: "Earthbound", duration: "4:37", cover: "🌲", dateAdded: "6 days ago" },
    { id: 7, title: "Neon Glow", artist: "Retro Future", album: "Synthwave Dreams", duration: "3:29", cover: "✨", dateAdded: "6 days ago" },
    { id: 8, title: "Mountain Peak", artist: "Alpine Echo", album: "High Altitude", duration: "4:44", cover: "⛰️", dateAdded: "6 days ago" },
    { id: 9, title: "Desert Mirage", artist: "Sand Dunes", album: "Oasis", duration: "5:12", cover: "🏜️", dateAdded: "6 days ago" },
    { id: 10, title: "Starlight Serenade", artist: "Celestial Choir", album: "Cosmic Love", duration: "3:55", cover: "⭐", dateAdded: "6 days ago" }
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-neutral-900 via-neutral-900 to-black text-white overflow-y-auto">
      {/* Header Section */}
      <div className="relative">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800 via-indigo-900 to-transparent opacity-90"></div>
        
        <div className="relative flex items-end gap-6 p-6 pb-8 pt-16">
          {/* Playlist Cover */}
          <div className="w-56 h-56 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex flex-col items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="text-5xl mb-2">🎧</div>
              <div className="text-xs text-white font-bold uppercase tracking-wider">Discover Weekly</div>
            </div>
          </div>
          
          {/* Playlist Info */}
          <div className="flex-1 pb-6">
            <p className="text-xs font-bold mb-2 text-white uppercase tracking-wider">Playlist</p>
            <h1 className="text-6xl font-black mb-6 text-white leading-tight">Discover Weekly</h1>
            <p className="text-gray-200 mb-4 text-sm leading-relaxed">Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates every Monday.</p>
            <div className="flex items-center gap-1 text-sm text-gray-200">
              <span className="font-semibold text-white">Made for You</span>
              <span className="mx-1">•</span>
              <span className="font-medium">{songs.length} songs</span>
              <span className="mx-1">•</span>
              <span className="text-green-400 font-semibold">Updated weekly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mx-6 mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-start gap-3 backdrop-blur-sm">
        <Info size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <span className="text-blue-300 font-semibold">New discoveries every Monday!</span>
          <p className="text-gray-300 mt-1 leading-relaxed">Based on your listening habits and music loved by users with similar taste.</p>
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
      <div className="bg-black/40 backdrop-blur-sm">
        {/* Songs List Header */}
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

        {/* Songs List */}
        <div className="px-6">
          {songs.map((song, index) => (
            <div 
              key={song.id}
              className="flex items-center gap-4 py-2 hover:bg-white/10 rounded-lg group cursor-pointer transition-all duration-200"
              onClick={() => playSong(song)}
            >
              <div className="w-8 text-center text-gray-400 group-hover:text-white text-sm relative">
                <span className="group-hover:opacity-0 transition-opacity duration-200">{index + 1}</span>
                <Play 
                  size={14} 
                  className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 fill-white"
                />
              </div>
              
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-lg flex-shrink-0">
                  {song.cover}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`font-medium hover:underline truncate ${currentSong?.id === song.id ? 'text-green-400' : 'text-white'}`}>
                    {song.title}
                  </div>
                  <div className="text-sm text-gray-400 hover:text-white hover:underline cursor-pointer truncate">
                    {song.artist}
                  </div>
                </div>
              </div>
              
              <div className="w-32 text-gray-400 text-sm hover:text-white hover:underline cursor-pointer truncate hidden md:block">
                {song.album}
              </div>
              
              <div className="w-24 text-gray-400 text-sm hidden lg:block">
                {song.dateAdded}
              </div>
              
              <div className="w-16 flex items-center justify-center gap-2">
                <Heart 
                  size={16} 
                  className={`cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                    likedSongs.has(song.id) ? 'text-green-500 fill-green-500 opacity-100' : 'text-gray-400 hover:text-white hover:scale-110'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song.id);
                  }}
                />
                <span className="text-gray-400 text-sm ml-2">{song.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer padding */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default DiscoverWeekly;