
import { Link } from "react-router-dom";

interface BandIntroProps {
  showFollowSection?: boolean;
}

const BandIntro = ({ showFollowSection = true }: BandIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">BayRaagis</h1>
      <p className="text-xl text-center text-muted-foreground mb-8">
        Fusion Music from the Heart of the Bay
      </p>
      
      <div className="prose prose-lg max-w-none mb-8">
        <p>
          BayRaagis is a vibrant fusion music collective based in the Bay Area, California. 
          We believe that the magic of music is realized when we thoughtfully blend different 
          genres together. With our base in Indian classical music, we are eager and enthusiastic 
          about blending our roots with other genres such as Jazz, pop etc.
        </p>
        <p>
          Since our inception in August 2024, we have hosted a rotating cast of talented performers 
          (vocalists and instrumentalists), each adding their own flair to our shows. Our mission is 
          to connect with our audience, and show them music that they may or may not already know 
          from a different perspective. Interested to learn more? Check out our Artists Directory, 
          past performances, upcoming events and more. To get latest updates about us, follow us in Instagram.
        </p>
      </div>
      
      {showFollowSection && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Follow us</h2>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.instagram.com/bayraagis/" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary/80 underline"
            >
              Instagram
            </a>
            <a 
              href="https://www.youtube.com/@Bayraagis" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline"
            >
              YouTube
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BandIntro;
