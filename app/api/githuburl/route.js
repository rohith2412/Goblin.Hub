import connectdb from "@/database/connectdb";
import GithubURL from "@/models/githuburlMode";

export async function POST(req) {
    try {
        const { user, githubURL } = await req.json();
        
        
        await connectdb();

        const url = await GithubURL.create({
            user,
            githubURL
        });
        return new Response(JSON.stringify(url), {status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", {status: 500});
    }
}