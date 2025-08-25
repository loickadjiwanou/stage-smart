import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Statistics from "@/pages/Statistics";
import Placeholder from "@/pages/Placeholder";
import {
  Users,
  Calendar,
  Award,
  BarChart3,
  Bell
} from "lucide-react";

export default function AppLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "settings":
        return <Settings />;
      case "statistiques":
        return <Statistics />;
      case "stagiaires":
        return (
          <Placeholder
            title="Gestion des Stagiaires"
            description="Module complet pour la gestion des profils stagiaires, départements et tuteurs"
            icon={Users}
            features={[
              "Création et modification des fiches stagiaires",
              "Association département et tuteur",
              "Import de documents (CV, contrats)",
              "Historique des modifications",
              "Recherche et filtres avancés"
            ]}
          />
        );
      case "suivi":
        return (
          <Placeholder
            title="Suivi de Stage"
            description="Suivi complet des missions, projets et évolution des stagiaires"
            icon={Calendar}
            features={[
              "Définition des périodes de stage",
              "Suivi des projets et missions",
              "Gestion des renouvellements",
              "Calendrier des échéances",
              "Rapports de progression"
            ]}
          />
        );
      case "evaluations":
        return (
          <Placeholder
            title="Évaluations"
            description="Système d'évaluation 360° avec feedback complet"
            icon={Award}
            features={[
              "Évaluations tuteur (soft/hard skills)",
              "Auto-évaluation stagiaire",
              "Feedback 360° (collègues, managers)",
              "Grilles d'évaluation personnalisées",
              "Historique et comparaisons"
            ]}
          />
        );
      case "analyses":
        return (
          <Placeholder
            title="Analyses et KPIs"
            description="Tableaux de bord analytiques pour optimiser la gestion RH"
            icon={BarChart3}
            features={[
              "Indicateurs de performance (KPIs)",
              "Graphiques de répartition",
              "Score de recommandation embauche",
              "Analyses prédictives",
              "Rapports exportables"
            ]}
          />
        );
      case "notifications":
        return (
          <Placeholder
            title="Notifications et Alertes"
            description="Système d'alertes automatisées pour ne rien manquer"
            icon={Bell}
            features={[
              "Alertes fin de contrat",
              "Rappels évaluations",
              "Notifications renouvellement",
              "Emails automatiques RH",
              "Paramétrage personnalisé"
            ]}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>
    </div>
  );
}