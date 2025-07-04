import { useContext, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const { seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong } =
    useContext(PlayerContext);
  
  // State for right side controls
  const [volume, setVolume] = useState(50);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [showMicMenu, setShowMicMenu] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  
  const volumeRef = useRef(null);
  const volumeBarRef = useRef(null);

  // Volume control
  const handleVolumeChange = (e) => {
    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const newVolume = Math.max(0, Math.min(100, percentage));
    setVolume(newVolume);
    // You can also integrate with your audio context here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleQueue = () => {
    setIsQueueOpen(!isQueueOpen);
  };

  const toggleDevices = () => {
    setShowDevices(!showDevices);
  };

  const toggleMic = () => {
    setShowMicMenu(!showMicMenu);
  };

  const toggleNowPlaying = () => {
    setShowNowPlaying(!showNowPlaying);
  };

  const toggleMiniPlayer = () => {
    setIsMinimized(!isMinimized);
  };

  const handleZoom = () => {
    // Toggle fullscreen or zoom functionality
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div
      className={`h-[10%] bg-black flex justify-between items-center text-white px-4 ${
        isMinimized ? 'h-[5%]' : ''
      }`}
    >
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="song_Data" />
        <div>
          <p>{track.name}</p>
          <p className="">{track.desc.slice(0, 43)}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}

          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      
      {/* Enhanced Right Side Controls */}
      <div className="hidden lg:flex items-center gap-2 opacity-75 relative">
        {/* Now Playing */}
        <img 
          className="w-4 cursor-pointer hover:opacity-100 transition-opacity" 
          src={assets.plays_icon} 
          alt="Now Playing"
          onClick={toggleNowPlaying}
          title="Now Playing"
        />
        
        {/* Microphone/Lyrics */}
        <img 
          className="w-4 cursor-pointer hover:opacity-100 transition-opacity" 
          src={assets.mic_icon} 
          alt="Microphone"
          onClick={toggleMic}
          title="Microphone"
        />
        
        {/* Queue */}
        <img 
          className={`w-4 cursor-pointer hover:opacity-100 transition-opacity ${
            isQueueOpen ? 'opacity-100' : ''
          }`}
          src={assets.queue_icon} 
          alt="Queue"
          onClick={toggleQueue}
          title="Queue"
        />
        
        {/* Connect to Device */}
        <img 
          className="w-4 cursor-pointer hover:opacity-100 transition-opacity" 
          src={assets.speaker_icon} 
          alt="Connect to Device"
          onClick={toggleDevices}
          title="Connect to Device"
        />
        
        {/* Volume Control */}
        <img 
          className="w-4 cursor-pointer hover:opacity-100 transition-opacity" 
          src={isMuted ? assets.volume_mute_icon || assets.volume_icon : assets.volume_icon} 
          alt="Volume"
          onClick={toggleMute}
          title="Mute"
        />
        
        {/* Volume Slider */}
        <div 
          ref={volumeRef}
          className="w-20 bg-slate-50 h-1 rounded cursor-pointer relative"
          onClick={handleVolumeChange}
          title={`Volume: ${Math.round(volume)}%`}
        >
          <div 
            ref={volumeBarRef}
            className="h-1 bg-green-800 rounded"
            style={{ width: `${isMuted ? 0 : volume}%` }}
          />
        </div>
        
        {/* Mini Player */}
        <img 
          className={`w-4 cursor-pointer hover:opacity-100 transition-opacity ${
            isMinimized ? 'opacity-100' : ''
          }`}
          src={assets.mini_player_icon} 
          alt="Mini Player"
          onClick={toggleMiniPlayer}
          title="Mini Player"
        />
        
        {/* Fullscreen/Zoom */}
        <img 
          className="w-4 cursor-pointer hover:opacity-100 transition-opacity" 
          src={assets.zoom_icon} 
          alt="Fullscreen"
          onClick={handleZoom}
          title="Fullscreen"
        />
      </div>
    </div>
  );
};

export default Player;