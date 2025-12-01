
import Navbar from "@/components/store/Navbar";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pb-3">
    <Navbar />  
     {children}
    </main>
  );
}