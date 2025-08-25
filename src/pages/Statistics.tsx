import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StatsChart from "@/components/Dashboard/StatsChart";
import KPICard from "@/components/Dashboard/KPICard";
import {
  TrendingUp,
  Users,
  Calendar,
  Award,
  Building2,
  FileText,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Target,
  Clock,
  Star
} from "lucide-react";

// Mock data pour les statistiques détaillées
const departmentPerformance = [
  { name: "IT", stagiaires: 8, embauches: 6, tauxReussite: 75, evaluation: 4.2 },
  { name: "Marketing", stagiaires: 6, embauches: 4, tauxReussite: 67, evaluation: 3.8 },
  { name: "RH", stagiaires: 4, embauches: 3, tauxReussite: 75, evaluation: 4.0 },
  { name: "Finance", stagiaires: 3, embauches: 2, tauxReussite: 67, evaluation: 3.9 },
  { name: "Commercial", stagiaires: 3, embauches: 2, tauxReussite: 67, evaluation: 3.7 }
];

const monthlyConversions = [
  { name: "Jan", embauches: 3, stagiaires: 5, taux: 60 },
  { name: "Fév", embauches: 4, stagiaires: 6, taux: 67 },
  { name: "Mar", embauches: 5, stagiaires: 7, taux: 71 },
  { name: "Avr", embauches: 6, stagiaires: 8, taux: 75 },
  { name: "Mai", embauches: 7, stagiaires: 9, taux: 78 },
  { name: "Jun", embauches: 6, stagiaires: 8, taux: 75 }
];

const skillsAnalysis = [
  { name: "JavaScript", value: 85 },
  { name: "Communication", value: 78 },
  { name: "Gestion projet", value: 72 },
  { name: "Design", value: 68 },
  { name: "Marketing digital", value: 65 },
  { name: "Analyse données", value: 62 }
];

const internDuration = [
  { name: "3 mois", value: 8 },
  { name: "6 mois", value: 12 },
  { name: "12 mois", value: 4 }
];

const contractTypes = [
  { name: "Stage conventionné", value: 18 },
  { name: "Stage découverte", value: 4 },
  { name: "Stage ingénieur", value: 2 }
];

export default function Statistics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const kpiStats = [
    {
      title: "Performance Globale",
      value: "74%",
      change: "+8%",
      changeType: "positive" as const,
      icon: Target,
      description: "Taux de réussite moyen"
    },
    {
      title: "Durée Moyenne",
      value: "5.2 mois",
      change: "+0.3",
      changeType: "positive" as const,
      icon: Clock,
      description: "Durée des stages"
    },
    {
      title: "Note Moyenne",
      value: "3.9/5",
      change: "+0.2",
      changeType: "positive" as const,
      icon: Star,
      description: "Évaluations tuteurs"
    },
    {
      title: "Départements Actifs",
      value: 5,
      change: "Stable",
      changeType: "neutral" as const,
      icon: Building2,
      description: "Services participants"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistiques Détaillées</h1>
          <p className="text-muted-foreground">
            Analyses complètes et indicateurs de performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 mois</SelectItem>
              <SelectItem value="6months">6 mois</SelectItem>
              <SelectItem value="1year">1 an</SelectItem>
              <SelectItem value="all">Tout</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiStats.map((kpi, index) => (
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

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="departments">Départements</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <StatsChart
              title="Évolution du Taux de Conversion"
              type="line"
              data={monthlyConversions}
              dataKey="taux"
              height={300}
            />
            <StatsChart
              title="Répartition par Durée de Stage"
              type="pie"
              data={internDuration}
              height={300}
            />
          </div>

          {/* Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Performance par Département</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-card">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dept.stagiaires} stagiaires • {dept.embauches} embauches
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-success/10 text-success">
                        {dept.tauxReussite}% réussite
                      </Badge>
                      <Badge variant="secondary">
                        ⭐ {dept.evaluation}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <StatsChart
              title="Embauches vs Stagiaires"
              type="bar"
              data={monthlyConversions}
              dataKey="embauches"
              height={300}
            />
            <StatsChart
              title="Types de Contrats"
              type="pie"
              data={contractTypes}
              height={300}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendances Clés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                  <h3 className="font-semibold">Amélioration Continue</h3>
                  <p className="text-sm text-muted-foreground">+15% de réussite en 6 mois</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Croissance</h3>
                  <p className="text-sm text-muted-foreground">+20% de stagiaires cette année</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Award className="h-8 w-8 text-warning mx-auto mb-2" />
                  <h3 className="font-semibold">Excellence</h3>
                  <p className="text-sm text-muted-foreground">3 départements &gt; 75% réussite</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid gap-6">
            <StatsChart
              title="Répartition des Stagiaires par Département"
              type="bar"
              data={departmentPerformance}
              dataKey="stagiaires"
              nameKey="name"
              height={300}
            />
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {departmentPerformance
                      .sort((a, b) => b.tauxReussite - a.tauxReussite)
                      .slice(0, 3)
                      .map((dept, index) => (
                        <div key={dept.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-warning text-warning-foreground' :
                              index === 1 ? 'bg-muted text-muted-foreground' :
                              'bg-accent text-accent-foreground'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="font-medium">{dept.name}</span>
                          </div>
                          <Badge className="bg-success/10 text-success">
                            {dept.tauxReussite}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Évaluations Moyennes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {departmentPerformance
                      .sort((a, b) => b.evaluation - a.evaluation)
                      .map((dept) => (
                        <div key={dept.name} className="flex items-center justify-between">
                          <span className="font-medium">{dept.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < Math.floor(dept.evaluation) 
                                      ? 'text-warning fill-warning' 
                                      : 'text-muted'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {dept.evaluation}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <StatsChart
              title="Compétences les Plus Développées"
              type="bar"
              data={skillsAnalysis}
              height={350}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Analyse des Compétences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsAnalysis.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border rounded-lg bg-success/5">
                  <Award className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium text-success">Excellente maîtrise technique</h4>
                    <p className="text-sm text-muted-foreground">JavaScript est la compétence la mieux maîtrisée (85%)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border rounded-lg bg-warning/5">
                  <TrendingUp className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning">Potentiel d'amélioration</h4>
                    <p className="text-sm text-muted-foreground">L&apos;analyse de données pourrait être renforcée (62%)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}