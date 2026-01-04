import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import UsageChart from "@/components/UsageChart";
import FrequentSignsList from "@/components/FrequentSignsList";
import { Users, CheckCircle, Clock } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">System Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Sessions"
            value="1,234"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Successful Translations"
            value="1,100"
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Average Session Time"
            value="5:30 min"
            icon={Clock}
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <UsageChart />
          <FrequentSignsList />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
