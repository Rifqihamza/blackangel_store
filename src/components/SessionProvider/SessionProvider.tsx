"use client"

import { SessionProvider, useSession } from "next-auth/react"

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>
}

export function ProtectedContent() {
    const { data: session, status } = useSession()

    if (status === "loading") return <p>Loading session...</p>
    if (!session) return <p>Please login first.</p>

    return <div>Welcome {session.user.email}</div>
}
