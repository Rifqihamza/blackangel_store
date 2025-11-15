"use client";

import { useState, useRef, useEffect } from "react";
import { BellIcon } from "lucide-react";

interface Notification {
    id: number;
    title: string;
    description: string;
    date: string;
}

const mockNotifications: Notification[] = [
    { id: 1, title: "Order shipped", description: "Your order #1234 has been shipped.", date: "2h ago" },
    { id: 2, title: "New message", description: "You received a new message from John.", date: "5h ago" },
    { id: 3, title: "Promotion", description: "Get 20% off on your next purchase.", date: "1d ago" },
    { id: 4, title: "Reminder", description: "Don't forget your meeting at 3 PM.", date: "2d ago" },
];

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Tutup dropdown saat klik di luar
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Tombol Bell */}
            <button
                onClick={() => setOpen(!open)}
                className="btn btn-ghost btn-circle relative"
            >
                <BellIcon size={20} />
                {mockNotifications.length > 0 && (
                    <span className="absolute top-0 -right-1 w-4 h-4 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
                        {mockNotifications.length}
                    </span>
                )}
            </button>

            {/* Dropdown List */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-base-100 shadow-lg rounded-box max-h-64 overflow-y-auto z-50">
                    {mockNotifications.length === 0 ? (
                        <div className="p-4 text-gray-500 text-center">No notifications</div>
                    ) : (
                        mockNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                            >
                                <p className="font-semibold text-gray-800">{notif.title}</p>
                                <p className="text-gray-600 text-sm">{notif.description}</p>
                                <span className="text-gray-400 text-xs">{notif.date}</span>
                            </div>
                        ))
                    )}
                    <div className="p-2 text-center border-t border-gray-100">
                        <button className="btn btn-link btn-sm w-full">View all</button>
                    </div>
                </div>
            )}
        </div>
    );
}
