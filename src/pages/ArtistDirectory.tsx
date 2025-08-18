
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ArtistDirectory = () => {
  // Import this from a spreadsheet
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/11los_LeBQHrewPU6DNXGuxxcK56dTxDMHdHrlw1i12E/export?format=csv"
      );
      const arrayBuffer = await response.arrayBuffer();
      const binaryString = new Uint8Array(arrayBuffer).reduce((acc, byte) => acc + String.fromCharCode(byte), "");
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const filteredArtists = data
        .filter((row: any) => row.approved === "yes")
        .map((row: any, index: number) => ({
          id: index + 1,
          name: row.name,
          bio: row.bio,
          photo: "/placeholder.svg",
          links: {
            instagram: row.instagram ? "http://instagram.com/" + row.instagram : null,
            youtube: row.youtube ? "http://youtube.com/@" + row.youtube : null,
            kalasocial: row.kalasocial ? "https://kala.social/@" + row.kalasocial : null,
            soundcloud: row.soundcloud ? "https://soundcloud.com/" + row.soundcloud : null,
            spotify: row.spotify ? "https://open.spotify.com/artist/" + row.spotify : null,
          },
        }));
      setArtists(filteredArtists);
    };
    fetchArtists();
  }, []);

  // log the artists to console for debugging
  useEffect(() => {
    console.log("Artists:", artists);
  }, [artists]);

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Artist Directory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map(artist => (
            <div key={artist.id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                // src={artist.photo}
                src={`${import.meta.env.BASE_URL}assets/dummy-singer.png`}
                alt={artist.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
                <p className="text-muted-foreground mb-4">{artist.bio}</p>
                <div className="flex space-x-5">
                  {artist.links.instagram && (
                    <a href={artist.links.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                      Instagram
                    </a>
                  )}
                  {artist.links.youtube && (
                    <a href={artist.links.youtube} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                      YouTube
                    </a>
                  )}
                  { artist.links.soundcloud && (
                    <a href={artist.links.soundcloud} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                      SoundCloud
                    </a>
                  )}
                  {artist.links.spotify && (
                    <a href={artist.links.spotify} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                      Spotify
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ArtistDirectory;
