"use client";

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export function ScoreChart({ value }: { value: number }) {
  return (
    <div className="h-28">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value, fill: "#67e8f9" }]} startAngle={90} endAngle={-270}>
          <RadialBar dataKey="value" cornerRadius={12} background={{ fill: "rgba(255,255,255,0.08)" }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
