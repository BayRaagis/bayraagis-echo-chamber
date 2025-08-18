
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const extractGoogleDriveFileId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const idFromQuery = parsed.searchParams.get("id");
    if (idFromQuery) return idFromQuery;
    const match = parsed.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

const toGoogleDriveViewUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  const trimmed = String(url).trim();
  if (!trimmed) return null;
  const id = extractGoogleDriveFileId(trimmed);
  if (!id) return null; // not a valid Drive link → use fallback
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
};

const normalizeIndex = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const str = String(value).trim();
  if (!str) return null;
  const num = Number(str);
  return Number.isFinite(num) ? num : null;
};

const parseSocialUsername = (input: unknown): string | null => {
  if (input === null || input === undefined) return null;
  const raw = String(input).trim();
  if (!raw) return null;

  const lastSegment = raw.split("/").filter(Boolean).pop() ?? raw;
  const beforeQuery = lastSegment.split("?")[0];
  const withoutAt = beforeQuery.replace(/^@+/, "").replace(/@/g, "");
  const username = withoutAt.trim();

  return username || null;
};

const ArtistDirectory = () => {
  // Import this from a spreadsheet
  const [artists, setArtists] = useState([]);
  const [portraitById, setPortraitById] = useState<Record<number, boolean>>({});

  const handleImageLoad = (id: number) => (e: any) => {
    const img = e.currentTarget as HTMLImageElement;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    setPortraitById(prev => (prev[id] === isPortrait ? prev : { ...prev, [id]: isPortrait }));
  };

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1r7q8lth1caGEAonznCIswdCYhkXcrea036GQ3JtKahE/export?format=csv"
      );
      const arrayBuffer = await response.arrayBuffer();
      const binaryString = new Uint8Array(arrayBuffer).reduce((acc, byte) => acc + String.fromCharCode(byte), "");
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const filteredArtists = (data as any[])
        .map(row => ({ row, indexVal: normalizeIndex(row["Index"]) }))
        .filter(entry => entry.indexVal !== null)
        .sort((a, b) => (a.indexVal as number) - (b.indexVal as number))
        .map(({ row, indexVal }) => ({
          id: indexVal as number,
          name: row["Full Name"],
          bio: row["Provide a one-line description  (for example, \"Trained in Carnatic music for X years, composes music, currently learning Ghazals, Plays the Jaltarang)"],
          photo: toGoogleDriveViewUrl(row["Upload a Photo!"]),
          links: {
            instagram: (() => {
              const username = parseSocialUsername(row["Instagram (the one you use for posting music and event updates)"]);
              return username ? `https://instagram.com/${username}` : null;
            })(),
            youtube: (() => {
              const username = parseSocialUsername(row["YouTube (if you have a music channel)"]);
              return username ? `https://youtube.com/@${username}` : null;
            })(),
            kalasocial: (() => {
              const username = parseSocialUsername(row["Kala Social"]);
              return username ? `https://kala.social/@${username}` : null;
            })(),
            soundcloud: (() => {
              const username = parseSocialUsername(row["SoundCloud"]);
              return username ? `https://soundcloud.com/${username}` : null;
            })(),
            spotify: (() => {
              const username = parseSocialUsername(row["Spotify (if you have an artist profile)"]);
              return username ? `https://open.spotify.com/artist/${username}` : null;
            })(),
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.map(artist => (
            <div key={artist.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={artist.photo || `${import.meta.env.BASE_URL}assets/dummy-singer.png`}
                  // onLoad={handleImageLoad(artist.id)}
                  onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}assets/dummy-singer.png`; }}
                  alt={artist.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  // className={`absolute inset-0 w-full h-full object-cover ${portraitById[artist.id] ? "object-top" : "object-center"}`}
                  referrerPolicy="no-referrer"
                />
              </div>
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
