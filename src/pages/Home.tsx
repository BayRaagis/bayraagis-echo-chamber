
import BandIntro from "@/components/home/BandIntro";
import BandStats from "@/components/home/BandStats";
import Layout from "@/components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BandIntro showFollowSection={false} />
          <div className="my-12">
            <BandStats />
          </div>
          <div className="mt-8 text-center">
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
        </div>
      </div>
    </Layout>
  );
};

export default Home;
