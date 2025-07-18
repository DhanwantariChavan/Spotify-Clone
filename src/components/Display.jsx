import { Route, Routes, useLocation } from "react-router-dom"
import DisplayHome from "./DisplayHome"
import DisplayAlbum from "./DisplayAlbum"
import { useEffect, useRef } from "react"
import { albumsData } from "../assets/assets"
import CreatePlaylist from "./CreatePlaylist"
import BrowsePodcasts from "./BrowsePodcasts"
import Search from "./Search"
import MyPlaylist1 from "./MyPlaylist1"
import LikedSongs from "./LikedSongs"
import DiscoverWeekly from "./DiscoverWeekly"

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)].bgColor;


  useEffect(()=>{
    if(isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    }
    else{
      displayRef.current.style.background = "#121212";
    }
  })
  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <Routes>
            <Route path="/" element={<DisplayHome/>}/>
            <Route path="/album/:id" element={<DisplayAlbum/>}/>
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="/browse-podcasts" element={<BrowsePodcasts />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playlist/1" element={<MyPlaylist1/>}></Route>
            <Route path="/playlist/2" element={<LikedSongs/>}></Route>
            <Route path="/playlist/3" element={<DiscoverWeekly/>}></Route>
        </Routes>
    </div>
  )
}

export default Display