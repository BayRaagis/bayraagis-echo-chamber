
import Layout from "@/components/layout/Layout";

const Donate = () => {
  const phone = "+16692209239";
  const displayPhone = "+1 (669) 220-9239";

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 flex flex-col items-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-10 text-center">Donate</h1>

        <div className="bg-white rounded-2xl shadow-md p-10 max-w-lg w-full text-center space-y-6">
          <p className="text-lg text-gray-800">
            Please Zelle your show ticket<br></br>or the amount you wish to donate at:
          </p>

          <div className="text-3xl font-semibold text-foreground">
            <a href={`tel:${phone}`} className="hover:underline">{displayPhone}</a>
          </div>

          <a
            href={`zelle://send?phone=${encodeURIComponent(phone)}`}
            className="inline-block border border-input bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Open in Zelle App
          </a>

          <p className="text-sm text-gray-500">
            (The button above opens the Zelle app on mobile. On desktop, search for the number above within your bank's Zelle feature.)
          </p>
        </div>

        <p className="mt-16 max-w-xl text-center text-sm text-gray-500 italic">
          Your donations cover costs for venues and sound equipment, enabling us to bring more music to you.
          Note: Any payment to our artists is strictly based on work authorization.
        </p>
      </div>
    </Layout>
  );
};

export default Donate;
