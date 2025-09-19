import connectdb from "@/database/connectdb";
import LeetcodeURL from "@/models/leetcodeurlModel";

export async function POST(req) {
    try {
        const { user, leetcodeURL } = await req.json();
        
        
        await connectdb();

        const url = await LeetcodeURL.create({
            user,
            leetcodeURL
        });
        return new Response(JSON.stringify(url), {status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", {status: 500});
    }
}