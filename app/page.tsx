import Catalog from "@/components/catalog";
import Comparison from "@/components/comparison";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <section className="min-h-screen">
      <Header/>
      <Catalog/>
      <Comparison/>
      <Footer/>
    </section>
  );
}
