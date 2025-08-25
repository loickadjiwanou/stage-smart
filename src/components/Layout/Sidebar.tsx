import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Users,
  UserCheck,
  BookOpen,
  FileText,
  Bell,
  Settings,
  TrendingUp,
  Home,
  PieChart,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigation = [
  { 
    name: "Dashboard", 
    href: "dashboard", 
    icon: Home,
    description: "Vue d'ensemble"
  },
  { 
    name: "Stagiaires", 
    href: "stagiaires", 
    icon: Users,
    description: "Gestion des profils"
  },
  { 
    name: "Suivi", 
    href: "suivi", 
    icon: Calendar,
    description: "Période et missions"
  },
  { 
    name: "Évaluations", 
    href: "evaluations", 
    icon: Award,
    description: "Performance et feedback"
  },
  { 
    name: "Analyses", 
    href: "analyses", 
    icon: BarChart3,
    description: "Rapports et KPIs"
  },
  { 
    name: "Notifications", 
    href: "notifications", 
    icon: Bell,
    description: "Alertes et rappels"
  },
];

const secondaryNavigation = [
  { 
    name: "Statistiques", 
    href: "statistiques", 
    icon: TrendingUp,
    description: "Analyses détaillées"
  },
  { 
    name: "Paramètres", 
    href: "settings", 
    icon: Settings,
    description: "Configuration"
  },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <UserCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">StageTracker</h2>
              <p className="text-xs text-sidebar-foreground/60">Gestion RH</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.href;
            
            return (
              <Button
                key={item.name}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground transition-smooth",
                  isCollapsed ? "px-2" : "px-3",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-primary",
                  !isActive && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                onClick={() => onPageChange(item.href)}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                )}
              </Button>
            );
          })}
        </nav>

        <Separator className="my-4 bg-sidebar-border" />

        <nav className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.href;
            
            return (
              <Button
                key={item.name}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground transition-smooth",
                  isCollapsed ? "px-2" : "px-3",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-primary",
                  !isActive && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                onClick={() => onPageChange(item.href)}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="rounded-lg bg-gradient-primary p-3 text-white">
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span className="text-sm font-medium">Analytics Pro</span>
            </div>
            <p className="mt-1 text-xs opacity-90">
              Analyses avancées disponibles
            </p>
          </div>
        </div>
      )}
    </div>
  );
}