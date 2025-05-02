
import Layout from "@/components/layout/Layout";

const ArtistDirectory = () => {
  // This would be populated from a database in a real application
  const artists = [
    {
      id: 1,
      name: "Avinash Kumar",
      bio: "Vocalist specializing in Indian classical and fusion. With over 10 years of experience, Avinash brings rich traditional vocals with modern interpretations.",
      photo: "/placeholder.svg",
      links: {
        instagram: "https://instagram.com/",
        soundcloud: "https://soundcloud.com/",
        spotify: "https://spotify.com/",
        youtube: "https://youtube.com/"
      }
    },
    {
      id: 2,
      name: "Priya Sharma",
      bio: "Talented tabla player who seamlessly blends traditional rhythms with contemporary beats. Known for creating captivating percussion arrangements.",
      photo: "/placeholder.svg",
      links: {
        instagram: "https://instagram.com/",
        soundcloud: "https://soundcloud.com/",
        spotify: "https://spotify.com/",
        youtube: "https://youtube.com/"
      }
    },
    {
      id: 3,
      name: "Dev Patel",
      bio: "Sitar virtuoso with a passion for cross-genre experimentation. Dev's innovative approach brings the sitar into jazz and electronic music spaces.",
      photo: "/placeholder.svg",
      links: {
        instagram: "https://instagram.com/",
        soundcloud: "https://soundcloud.com/",
        spotify: "https://spotify.com/",
        youtube: "https://youtube.com/"
      }
    },
    {
      id: 4,
      name: "Maya Rodriguez",
      bio: "Versatile vocalist who brings Latin influences into fusion music. Her dynamic range and improvisational skills create magical musical moments.",
      photo: "/placeholder.svg",
      links: {
        instagram: "https://instagram.com/",
        soundcloud: "https://soundcloud.com/",
        spotify: "https://spotify.com/",
        youtube: "https://youtube.com/"
      }
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Artist Directory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map(artist => (
            <div key={artist.id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={artist.photo} 
                alt={artist.name} 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
                <p className="text-muted-foreground mb-4">{artist.bio}</p>
                <div className="flex space-x-4">
                  <a href={artist.links.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                    Instagram
                  </a>
                  <a href={artist.links.soundcloud} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                    SoundCloud
                  </a>
                  <a href={artist.links.spotify} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                    Spotify
                  </a>
                  <a href={artist.links.youtube} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                    YouTube
                  </a>
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
