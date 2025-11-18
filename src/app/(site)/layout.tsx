import NavbarComponent from "@/components/Navbar/Navbar";
import FooterComponent from "@/components/Footer/Footer";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <NavbarComponent />
            <div>
                {children}
            </div>
            <FooterComponent />
        </main>
    );
}
