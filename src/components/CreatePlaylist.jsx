import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCoverImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log({
      name: playlistName,
      description,
      isPrivate,
      coverImage
    });
    
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-b from-[#1e3264] to-[#121212] min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-[#1e3264]/80 to-transparent backdrop-blur-md p-6 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Create playlist</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-32">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cover Image Section */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-[#282828] rounded-lg flex items-center justify-center relative group cursor-pointer shadow-2xl">
                {coverImage ? (
                  <img 
                    src={coverImage} 
                    alt="Playlist cover" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    <p className="text-gray-400 font-medium">Choose photo</p>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/>
                    </svg>
                    <p className="text-sm font-medium">Choose photo</p>
                  </div>
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 space-y-6">
              {/* Playlist Name */}
              <div>
                <input
                  type="text"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  placeholder="My Playlist #1"
                  className="w-full bg-transparent text-4xl lg:text-6xl font-bold placeholder-gray-500 border-none outline-none resize-none leading-tight"
                  maxLength={100}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add an optional description"
                  className="w-full bg-transparent text-lg placeholder-gray-500 border-none outline-none resize-none h-20 leading-relaxed"
                  rows="3"
                  maxLength={300}
                />
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                <span className="text-sm text-gray-300">Make private</span>
              </div>

              {/* Creator Info */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <span>By</span>
                <span className="font-semibold text-white">Your Name</span>
                <span>•</span>
                <span>0 songs</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-800 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors font-medium"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!playlistName.trim() || isLoading}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              playlistName.trim() && !isLoading
                ? 'bg-green-500 text-black hover:bg-green-400 hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Creating...
              </div>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;