import connectdb from "@/database/connectdb";
import URL from "@/models/urlModel";

export async function POST(req) {
    try {
        const { user, leetcodeURL } = await req.json();
        
        
        await connectdb();

        const url = await URL.create({
            user,
            leetcodeURL
        });
        return new Response(JSON.stringify(url), {status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", {status: 500});
    }
}