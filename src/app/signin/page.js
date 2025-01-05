// src/app/signin/page.js

'use client'; // This ensures that this component runs only on the client-side

import { signIn } from "next-auth/react";

export default function SignIn() {
    const handleGoogleLogin = () => {
        signIn("google");  // Trigger the Google authentication flow
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Sign in to Your Account</h2>
            <button
                onClick={handleGoogleLogin}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#4285F4",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Sign in with Google
            </button>
        </div>
    );
}
