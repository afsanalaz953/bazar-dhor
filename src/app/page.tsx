import AllProductsSection from "@/components/AllProductsSection";
import Banner from "@/components/Banner";
import DamBaraSection from "@/components/DamBaraSection";
import DamKomaSection from "@/components/DamKomaSection";


export default function Home() {
  return (
    <div className=" bg-[#F0F5F0] ">
      
      <Banner />
      <DamBaraSection />
      <DamKomaSection />
      <AllProductsSection />
    </div>
  );
}
