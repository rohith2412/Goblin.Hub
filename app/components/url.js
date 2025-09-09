"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function URL() {
    const {data: session} = useSession();
    const [url, seturl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session) {
            alert("Please log in to submit your URL.");
            return;
        }
        try {
            const response = await fetch('/api/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    user: session.user.email,
                    leetcodeURL: url,
                }),
            })
            if(!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Success:', data);
            alert("URL submitted successfully!");
        } catch (error) {
            console.error('Error:', error);
            alert("There was an error submitting your URL.");
        }
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <input type="url" placeholder="your leetcode url please" value={url} onChange={(e) => seturl(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}