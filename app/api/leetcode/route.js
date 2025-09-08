export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query userProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              submissionCalendar
            }
          }
        `,
        variables: { username },
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!data.data?.matchedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data.data.matchedUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch LeetCode data" }), {
      status: 500,
    });
  }
}