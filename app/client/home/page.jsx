import LeetCode from "@/app/components/LeetCode";
import URL from "@/app/components/url";

export default function Page() {
  return (
    <div className="p-8">
      <LeetCode username="hi-malik" /> {/* 👈 change username */}
      <URL />
    </div>
  );
}
