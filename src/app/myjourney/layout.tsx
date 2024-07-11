import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "My Journey | Discover Ethan",
    description: "Follow Ethan's exciting journey and adventures.",
}

export default function MyJourneyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}