
import BandIntro from "@/components/home/BandIntro";
import Layout from "@/components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BandIntro />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
