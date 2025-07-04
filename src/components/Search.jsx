import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    songs: [],
    artists: [],
    albums: [],
    playlists: []
  });
  const [recentSearches, setRecentSearches] = useState([
    "Pop hits", "Rock classics", "Jazz masters", "Hip hop beats"
  ]);

  // Sample data for search results
  const sampleSongs = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
    { id: 2, title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop" },
    { id: 3, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" },
    { id: 4, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" }
  ];

  const sampleArtists = [
    { id: 1, name: "The Weeknd", followers: "89M followers", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" },
    { id: 2, name: "Harry Styles", followers: "65M followers", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
    { id: 3, name: "Dua Lipa", followers: "78M followers", image: "https://images.unsplash.com/photo-1494790108755-2616c9c4470e?w=300&h=300&fit=crop" },
    { id: 4, name: "Olivia Rodrigo", followers: "45M followers", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" }
  ];

  const browseCategories = [
    { id: 1, name: "Pop", color: "from-pink-500 to-purple-600", image: "🎵" },
    { id: 2, name: "Hip-Hop", color: "from-orange-500 to-red-600", image: "🎤" },
    { id: 3, name: "Rock", color: "from-gray-500 to-black", image: "🎸" },
    { id: 4, name: "Jazz", color: "from-blue-500 to-purple-600", image: "🎷" },
    { id: 5, name: "Electronic", color: "from-green-500 to-teal-600", image: "🎧" },
    { id: 6, name: "Country", color: "from-yellow-500 to-orange-600", image: "🤠" },
    { id: 7, name: "R&B", color: "from-purple-500 to-pink-600", image: "💜" },
    { id: 8, name: "Classical", color: "from-indigo-500 to-blue-600", image: "🎼" },
    { id: 9, name: "Reggae", color: "from-green-500 to-yellow-600", image: "🏝️" },
    { id: 10, name: "Folk", color: "from-amber-500 to-orange-600", image: "🌿" }
  ];

  // Simulate search functionality
  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredSongs = sampleSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredArtists = sampleArtists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults({
        songs: filteredSongs,
        artists: filteredArtists,
        albums: [],
        playlists: []
      });
    } else {
      setSearchResults({ songs: [], artists: [], albums: [], playlists: [] });
    }
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults({ songs: [], artists: [], albums: [], playlists: [] });
  };
  const SongResult = ({ song }) => (
    <div className="flex items-center gap-4 p-2 hover:bg-[#1a1a1a] rounded group cursor-pointer">
      <img src={song.image} alt={song.title} className="w-12 h-12 rounded object-cover" />
      <div className="flex-1">
        <h3 className="text-white font-medium">{song.title}</h3>
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>
      <span className="text-gray-400 text-sm">{song.duration}</span>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </button>
    </div>
  );

  SongResult.propTypes = {
    song: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string,
      duration: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  };

  const ArtistResult = ({ artist }) => (
    <div className="flex items-center gap-4 p-2 hover:bg-[#1a1a1a] rounded group cursor-pointer">
      <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1">
        <h3 className="text-white font-medium">{artist.name}</h3>
        <p className="text-gray-400 text-sm">Artist • {artist.followers}</p>
      </div>
      <button className="px-4 py-1 border border-gray-400 text-gray-400 rounded-full text-sm hover:border-white hover:text-white transition-colors">
        Follow
      </button>
    </div>
  );

  ArtistResult.propTypes = {
    artist: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      followers: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  };

  return (
    <div className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-[#1a1a1a]/90 to-transparent backdrop-blur-md z-10 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Search</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-white text-black rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-600 hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="px-6 pb-32">
        {/* Search Results */}
        {searchTerm ? (
          <div className="space-y-8">
            {/* Top Result */}
            {(searchResults.songs.length > 0 || searchResults.artists.length > 0) && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Top result</h2>
                <div className="bg-[#181818] rounded-lg p-6 hover:bg-[#282828] transition-colors cursor-pointer max-w-md">
                  {searchResults.artists.length > 0 ? (
                    <div className="flex items-center gap-4">
                      <img 
                        src={searchResults.artists[0].image} 
                        alt={searchResults.artists[0].name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-3xl font-bold mb-2">{searchResults.artists[0].name}</h3>
                        <p className="text-gray-400">Artist</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <img 
                        src={searchResults.songs[0].image} 
                        alt={searchResults.songs[0].title}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div>
                        <h3 className="text-3xl font-bold mb-1">{searchResults.songs[0].title}</h3>
                        <p className="text-gray-400">Song • {searchResults.songs[0].artist}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Songs */}
            {searchResults.songs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Songs</h2>
                <div className="space-y-2">
                  {searchResults.songs.slice(0, 4).map(song => (
                    <SongResult key={song.id} song={song} />
                  ))}
                </div>
              </section>
            )}

            {/* Artists */}
            {searchResults.artists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Artists</h2>
                <div className="space-y-2">
                  {searchResults.artists.slice(0, 4).map(artist => (
                    <ArtistResult key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {searchResults.songs.length === 0 && searchResults.artists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No results found for &quot;{searchTerm}&quot;</p>
                <p className="text-gray-500 text-sm mt-2">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
              </div>
            )}
          </div>
        ) : (
          /* Browse Content */
          <div className="space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Recent searches</h2>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div 
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="flex items-center gap-4 p-2 hover:bg-[#1a1a1a] rounded cursor-pointer"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                      </svg>
                      <span className="text-white">{search}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Browse All */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Browse all</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {browseCategories.map(category => (
                  <div 
                    key={category.id}
                    className={`bg-gradient-to-br ${category.color} rounded-lg p-4 h-32 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden`}
                  >
                    <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
                    <div className="absolute bottom-2 right-2 text-3xl opacity-80">
                      {category.image}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;