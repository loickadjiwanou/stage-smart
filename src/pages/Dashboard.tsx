import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import KPICard from "@/components/Dashboard/KPICard";
import StatsChart from "@/components/Dashboard/StatsChart";
import {
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  FileText,
  Award,
  Clock,
  MapPin,
  Building2
} from "lucide-react";

// Mock data pour la démonstration
const kpiData = [
  {
    title: "Stagiaires Actifs",
    value: 24,
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "Ce mois-ci"
  },
  {
    title: "Fins de Contrat",
    value: 6,
    change: "Dans 30 jours",
    changeType: "neutral" as const,
    icon: Calendar,
    description: "Renouvellements à prévoir"
  },
  {
    title: "Taux de Conversion",
    value: "78%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Stage → CDI/CDD"
  },
  {
    title: "Alertes",
    value: 3,
    change: "Urgent",
    changeType: "negative" as const,
    icon: AlertTriangle,
    description: "Actions requises"
  }
];

const departmentData = [
  { name: "IT", value: 8 },
  { name: "Marketing", value: 6 },
  { name: "RH", value: 4 },
  { name: "Finance", value: 3 },
  { name: "Commercial", value: 3 }
];

const monthlyData = [
  { name: "Jan", value: 12 },
  { name: "Fév", value: 15 },
  { name: "Mar", value: 18 },
  { name: "Avr", value: 22 },
  { name: "Mai", value: 24 },
  { name: "Jun", value: 24 }
];

const recentStagiaires = [
  {
    id: 1,
    name: "Marie Dubois",
    department: "IT",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    status: "active",
    tutor: "Jean Martin"
  },
  {
    id: 2,
    name: "Pierre Leroy",
    department: "Marketing",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    status: "ending",
    tutor: "Sophie Bernard"
  },
  {
    id: 3,
    name: "Emma Garcia",
    department: "RH",
    startDate: "2024-03-10",
    endDate: "2024-09-10",
    status: "active",
    tutor: "Michel Rousseau"
  },
  {
    id: 4,
    name: "Lucas Thomas",
    department: "Finance",
    startDate: "2024-01-20",
    endDate: "2024-07-20",
    status: "ending",
    tutor: "Anne Moreau"
  }
];

export default function Dashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-success/10 text-success">Actif</Badge>;
      case "ending":
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Fin proche</Badge>;
      case "ended":
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Terminé</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard RH</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de la gestion des stagiaires
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button className="bg-gradient-primary shadow-primary">
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un stagiaire
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            description={kpi.description}
            gradient={index === 0}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <StatsChart
          title="Répartition par Département"
          type="pie"
          data={departmentData}
          height={300}
        />
        <StatsChart
          title="Évolution des Recrutements"
          type="line"
          data={monthlyData}
          height={300}
        />
      </div>

      {/* Recent Stagiaires Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Stagiaires Récents</span>
            <Button variant="outline" size="sm">
              Voir tout
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentStagiaires.map((stagiaire) => (
              <div key={stagiaire.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-card hover:bg-card-hover transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{stagiaire.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        {stagiaire.department}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {stagiaire.startDate} - {stagiaire.endDate}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {stagiaire.tutor}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(stagiaire.status)}
                  <Button variant="ghost" size="sm">
                    <Award className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Évaluations en attente</h3>
                <p className="text-sm opacity-90">5 évaluations à compléter</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Performances excellentes</h3>
                <p className="text-sm opacity-90">3 stagiaires à recommander</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div>
                <h3 className="font-semibold text-warning">Renouvellements urgents</h3>
                <p className="text-sm text-muted-foreground">2 contrats expirent bientôt</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}