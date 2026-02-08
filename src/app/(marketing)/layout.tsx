import { InfoBar } from "@/components/layout/info-bar";
import { MainHeader } from "@/components/layout/main-header";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <InfoBar />
      <MainHeader />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
