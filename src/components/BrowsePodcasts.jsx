import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BrowsePodcasts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [followedPodcasts, setFollowedPodcasts] = useState(new Set());

  // Sample podcast data
  const categories = ["All", "True Crime", "Comedy", "News", "Technology", "Business", "Health", "Sports", "Education"];
  
  const featuredPodcasts = [
    {
      id: 1,
      title: "The Daily",
      description: "This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop",
      category: "News",
      episodes: 1234,
      isFollowed: false
    },
    {
      id: 2,
      title: "Crime Junkie",
      description: "If you can never get enough true crime... Congratulations, you've found your people.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      category: "True Crime",
      episodes: 456,
      isFollowed: false
    },
    {
      id: 3,
      title: "The Joe Rogan Experience",
      description: "The official podcast of comedian Joe Rogan. Follow The Joe Rogan Experience on Spotify.",
      image: "https://images.unsplash.com/photo-1559157314-56d04ad039cc?w=300&h=300&fit=crop",
      category: "Comedy",
      episodes: 2000,
      isFollowed: false
    },
    {
      id: 4,
      title: "TED Talks Daily",
      description: "Every weekday, TED Talks Daily brings you the latest talks in audio format.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      category: "Education",
      episodes: 789,
      isFollowed: false
    }
  ];

  const trendingPodcasts = [
    {
      id: 5,
      title: "Call Her Daddy",
      description: "A sex, relationships, and lifestyle podcast that doesn't hold back.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c4470e?w=300&h=300&fit=crop",
      category: "Comedy",
      episodes: 345,
      isFollowed: false
    },
    {
      id: 6,
      title: "Serial",
      description: "Serial is a podcast from the creators of This American Life, hosted by Sarah Koenig.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      category: "True Crime",
      episodes: 67,
      isFollowed: false
    },
    {
      id: 7,
      title: "Huberman Lab",
      description: "Neuroscience-based tools for everyday life. Premium subscribers get early access.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop",
      category: "Health",
      episodes: 234,
      isFollowed: false
    },
    {
      id: 8,
      title: "The Tim Ferriss Show",
      description: "Tim Ferriss interviews world-class performers from eclectic areas.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      category: "Business",
      episodes: 678,
      isFollowed: false
    }
  ];

  const handleFollow = (podcastId) => {
    setFollowedPodcasts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(podcastId)) {
        newSet.delete(podcastId);
      } else {
        newSet.add(podcastId);
      }
      return newSet;
    });
  };

  const filteredPodcasts = (podcasts) => {
    return podcasts.filter(podcast => {
      const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || podcast.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };
  const PodcastCard = ({ podcast, size = "large" }) => (
    <div className={`bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-all duration-300 group cursor-pointer ${
      size === "small" ? "min-w-[200px]" : "min-w-[280px]"
    }`}>
      <div className="relative mb-4">
        <img 
          src={podcast.image} 
          alt={podcast.title}
          className={`w-full ${size === "small" ? "h-40" : "h-60"} object-cover rounded-lg shadow-lg`}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <button className="bg-green-500 text-black p-3 rounded-full hover:bg-green-400 transition-all hover:scale-105">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 truncate">{podcast.title}</h3>
      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{podcast.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-xs">{podcast.episodes} episodes</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFollow(podcast.id);
          }}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            followedPodcasts.has(podcast.id)
              ? "bg-green-500 text-black hover:bg-green-400"
              : "bg-transparent border border-gray-400 text-white hover:border-white"
          }`}
        >
          {followedPodcasts.has(podcast.id) ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );

  PodcastCard.propTypes = {
    podcast: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      episodes: PropTypes.number.isRequired,
      isFollowed: PropTypes.bool
    }).isRequired,
    size: PropTypes.oneOf(["large", "small"])
  };

  return (
    <div className="bg-gradient-to-b from-[#1a1a2e] to-[#121212] min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-[#1a1a2e]/90 to-transparent backdrop-blur-md z-10">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <h1 className="text-4xl font-bold">Browse Podcasts</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for podcasts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-green-500 text-black"
                    : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-32">
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Podcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPodcasts(featuredPodcasts).map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {filteredPodcasts(trendingPodcasts).map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} size="small" />
            ))}
          </div>
        </section>

        {/* Popular Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(1).map((category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-bold text-white">{category}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        {followedPodcasts.size > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Shows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...featuredPodcasts, ...trendingPodcasts]
                .filter(podcast => followedPodcasts.has(podcast.id))
                .map((podcast) => (
                  <PodcastCard key={`followed-${podcast.id}`} podcast={podcast} />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BrowsePodcasts;