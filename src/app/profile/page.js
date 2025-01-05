// src/app/profile/page.js

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return; // Avoid redirecting while loading
        if (!session) {
            redirect("/signin");  // Redirect to sign-in if not authenticated
        }
    }, [session, status]);

    if (status === "loading") {
        return <div>Loading...</div>;  // Show loading state while session is being fetched
    }

    return (
        <div>
            <h2>Welcome, {session?.user?.name}</h2>
            <p>Email: {session?.user?.email}</p>
            <img src={session?.user?.image} alt="Profile Picture" />
        </div>
    );
}
