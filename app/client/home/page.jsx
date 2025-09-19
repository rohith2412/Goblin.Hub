import GithubURL from "@/app/components/GithubURL";
import LeetCode from "@/app/components/LeetCode";
import LeetcodeURL from "@/app/components/LeetcodeURL";

export default function Page() {
  return (
    <div className="p-8">
      <LeetCode username="arajAnkit" /> 
      <LeetcodeURL />
      <GithubURL />
    </div>
  );
}
