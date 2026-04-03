import { useState, useMemo, useEffect } from "react";
import { Building2, TrendingUp, Star, BarChart3, LayoutGrid, List } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import ClientCard from "@/components/ClientCard";
import ClientCardList from "@/components/ClientCardList";
import { ClientCardSkeleton, ClientCardListSkeleton } from "@/components/ClientCardSkeleton";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import { Button } from "@/components/ui/button";

const industries = [
  { value: "all", label: "All Industries" },
  { value: "DevOps", label: "DevOps" },
  { value: "Analytics", label: "Analytics" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "FinTech", label: "FinTech" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Healthcare", label: "Healthcare" },
];

const sortOptions = [
  { value: "score", label: "Score" },
  { value: "name", label: "Name" },
  { value: "latest", label: "Latest" },
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [sort, setSort] = useState("score");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    // Use environment variable or fallback to production URL
    const apiUrl = import.meta.env.VITE_API_URL || "https://saas-intelligence.onrender.com";
    console.log("🔗 Using API URL:", apiUrl);
    
    // Add cache-busting timestamp
    const timestamp = new Date().getTime();
    const url = `${apiUrl}/api/clients?t=${timestamp}`;
    
    console.log("🌐 Fetching from:", url);
    
    fetch(url)
      .then(res => {
        console.log("📡 Response status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("📊 API Response:", data);
        console.log("📈 Clients count:", data.data?.length || 0);
        setClients(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ API Error:", err);
        setLoading(false);
      });
  }, []);

  // 🔥 FILTER + SORT
  const filtered = useMemo(() => {
    let result = clients.filter((c) => {
      const matchSearch =
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.overview_short?.toLowerCase().includes(search.toLowerCase());

      const matchIndustry = industry === "all" || c.industry === industry;

      return matchSearch && matchIndustry;
    });

    result.sort((a, b) => {
      if (sort === "score") return b.score - a.score;
      if (sort === "name") return a.name?.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [search, industry, sort, clients]);

  // 🔥 DYNAMIC STATS
  const avgScore = useMemo(() => {
    return clients.length > 0 ? Math.round(clients.reduce((sum, c) => sum + (c.score || 0), 0) / clients.length) : 0;
  }, [clients]);

  const highPotential = useMemo(() => {
    return clients.filter((c) => (c.score || 0) >= 80).length;
  }, [clients]);

  const uniqueIndustries = useMemo(() => {
    return new Set(clients.map((c) => c.industry)).size;
  }, [clients]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Advisory Board Intelligence
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Evaluate, compare, and decide on SaaS portfolio companies.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Building2} value={clients.length} label="Total Clients" />
          <StatsCard icon={BarChart3} value={uniqueIndustries} label="Industries Covered" />
          <StatsCard icon={Star} value={highPotential} label="High Potential" />
          <StatsCard icon={TrendingUp} value={avgScore} label="Avg Score" />
        </div>

        {/* Filters */}
        <div className="glass-panel rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchBar value={search} onChange={setSearch} />

          <div className="flex items-center gap-3">
            <FilterDropdown
              value={industry}
              onChange={setIndustry}
              options={industries}
              placeholder="Industry"
            />

            <FilterDropdown
              value={sort}
              onChange={setSort}
              options={sortOptions}
              placeholder="Sort by"
            />

            <div className="flex rounded-lg border border-border overflow-hidden">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>

              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className={view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-3"}>
            {Array.from({ length: 6 }).map((_, i) => (
              view === "grid"
                ? <ClientCardSkeleton key={i} />
                : <ClientCardListSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Building2 className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No clients found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className={view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-3"}>
            {filtered.map((client, i) => (
              <div key={client.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                {view === "grid"
                  ? <ClientCard client={client} />
                  : <ClientCardList client={client} />}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Index;