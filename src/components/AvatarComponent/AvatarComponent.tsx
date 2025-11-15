import Image from "next/image"
import { useSession } from "next-auth/react"
export default function AvatarDaisy() {
    const { data: session } = useSession()
    if (session?.user?.image) {
        return (
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <Image
                        src={session.user.image}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="object-cover rounded-full"
                    />
                </div>
            </div>
        )
    }
    return (
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="text-lg">
                    {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
                </span>
            </div>
        </div>
    )
}
