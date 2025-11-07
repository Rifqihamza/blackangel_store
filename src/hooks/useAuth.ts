"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export function useAuth() {
    const { data: session, status } = useSession()

    // Fungsi untuk memastikan user login sebelum lanjut
    const requireLogin = (redirectUrl?: string) => {
        if (!session) {
            // Redirect ke halaman login
            signIn(undefined, { callbackUrl: redirectUrl || window.location.href })
            return false
        }
        return true
    }

    return {
        session,
        status,
        signIn,
        signOut,
        requireLogin,
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
    }
}
