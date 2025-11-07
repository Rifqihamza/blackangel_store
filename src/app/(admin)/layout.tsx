// import Sidebar from "@/components/AdminComponent/Sidebar";
// import AdminHeader from "@/components/AdminComponent/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar kiri */}
            {/* <Sidebar /> */}

            {/* Konten utama */}
            <div className="flex-1 flex flex-col">
                {/* <AdminHeader /> */}
                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
