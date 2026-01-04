import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import UsageChart from "@/components/UsageChart";
import FrequentSignsList from "@/components/FrequentSignsList";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-accent/8 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Analytics Overview
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">System Dashboard</h1>
          <p className="text-muted-foreground text-lg">Monitor performance and usage statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
            title="Avg. Session Time"
            value="5:30 min"
            icon={Clock}
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <UsageChart />
          <FrequentSignsList />
        </div>
      </main>

      <FloatingChatButton />
    </div>
  );
};

export default DashboardPage;
