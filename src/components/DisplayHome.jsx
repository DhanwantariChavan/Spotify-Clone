import  { useState } from 'react';
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";

const DisplayHome = () => {
  const [filteredAlbums, setFilteredAlbums] = useState(albumsData);
  const [filteredSongs, setFilteredSongs] = useState(songsData);

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setFilteredAlbums(albumsData);
      setFilteredSongs(songsData);
    } else {
      setFilteredAlbums(albumsData.filter(album => album.category === category));
      setFilteredSongs(songsData.filter(song => song.category === category));
    }
  };

  return (
    <>
      <Navbar onCategoryChange={handleCategoryChange} />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {filteredAlbums.map((item, index) => (
            <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {filteredSongs.map((item, index) => (
            <SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
