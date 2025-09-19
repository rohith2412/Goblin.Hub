"use client";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function LeetCode({ username }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!username) return;

    fetch(`/api/leetcode?username=${username}`)
      .then((res) => res.json())
      .then(setData);
  }, [username]);

  if (!data) return <p className="p-4">Loading LeetCode stats...</p>;

  const totalSolved = data.submitStatsGlobal.acSubmissionNum[0].count;
  const calendar = JSON.parse(data.submissionCalendar);

  return (
    <div className="p-6 border rounded-2xl shadow bg-white">
      <h1 className="text-2xl font-bold">LeetCode Stats</h1>
      <p className="mt-2 text-gray-700">User: {data.username}</p>
      <p className="mt-2 text-lg font-medium">Total Solved: {totalSolved}</p>

      <h2 className="mt-4 font-semibold">Breakdown</h2>
      <ul className="list-disc pl-6 text-gray-800">
        {data.submitStatsGlobal.acSubmissionNum.map((d) => (
          <li key={d.difficulty}>
            {d.difficulty}: {d.count} solved ({d.submissions} submissions)
          </li>
        ))}
      </ul>

      <h2 className="mt-6 font-semibold">Activity Heatmap</h2>
      <div className="mt-2">
        <CalendarHeatmap
          startDate={new Date("2025-01-01")}
          endDate={new Date()}
          values={Object.entries(calendar).map(([timestamp, count]) => ({
            date: new Date(parseInt(timestamp) * 1000).toISOString().slice(0, 10),
            count,
          }))}
          classForValue={(value) => {
            if (!value) return "color-empty";
            return `color-scale-${Math.min(value.count, 4)}`;
          }}
        />
      </div>
    </div>
  );
}
