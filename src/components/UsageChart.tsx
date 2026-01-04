import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

const data = [
  { name: "Mon", sessions: 120 },
  { name: "Tue", sessions: 180 },
  { name: "Wed", sessions: 200 },
  { name: "Thu", sessions: 160 },
  { name: "Fri", sessions: 240 },
  { name: "Sat", sessions: 180 },
  { name: "Sun", sessions: 154 },
];

const UsageChart = () => {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Weekly Usage</h3>
          <p className="text-sm text-muted-foreground">System sessions this week</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 65%, 28%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(220, 65%, 28%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(220, 10%, 45%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(220, 10%, 45%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 15%, 88%)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
                padding: "12px 16px",
              }}
              labelStyle={{
                fontWeight: 600,
                marginBottom: "4px",
              }}
            />
            <Area
              type="monotone"
              dataKey="sessions"
              stroke="hsl(220, 65%, 28%)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorSessions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;
