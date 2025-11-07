import NavbarComponent from "@/components/NavbarComponent/NavbarComponent";
import FooterComponent from "@/components/FooterComponent/FooterComponent";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main >
            <NavbarComponent />
            <div>
                {children}
            </div>
            <FooterComponent />
        </main>
    );
}
