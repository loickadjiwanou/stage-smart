import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  BellRing,
  Clock,
  AlertTriangle,
  CheckCircle,
  Mail,
  Calendar,
  Users,
  FileText,
  Settings,
  Trash2,
  Mail as MarkAsUnread,
  Archive
} from "lucide-react";

// Mock data pour les notifications
const mockNotifications = [
  {
    id: 1,
    type: "fin_contrat",
    titre: "Fin de contrat approchante",
    message: "Le stage de Sophie Martin se termine dans 7 jours (22/04/2024)",
    date: "2024-04-15T09:00:00",
    statut: "non_lu",
    priorite: "haute",
    stagiaire: "Sophie Martin",
    action_requise: true
  },
  {
    id: 2,
    type: "evaluation_retard",
    titre: "Évaluation en retard",
    message: "L'évaluation de Thomas Dubois est en retard de 3 jours",
    date: "2024-04-14T14:30:00",
    statut: "lu",
    priorite: "moyenne",
    stagiaire: "Thomas Dubois",
    action_requise: true
  },
  {
    id: 3,
    type: "nouveau_stagiaire",
    titre: "Nouveau stagiaire",
    message: "Emma Lambert a rejoint l'équipe RH aujourd'hui",
    date: "2024-04-14T08:00:00",
    statut: "lu",
    priorite: "basse",
    stagiaire: "Emma Lambert",
    action_requise: false
  },
  {
    id: 4,
    type: "renouvellement",
    titre: "Proposition de renouvellement",
    message: "Décision à prendre pour le renouvellement de Marc Dubois",
    date: "2024-04-13T16:45:00",
    statut: "non_lu",
    priorite: "haute",
    stagiaire: "Marc Dubois",
    action_requise: true
  },
  {
    id: 5,
    type: "rappel_document",
    titre: "Documents manquants",
    message: "Les documents de stage de Julie Martin sont incomplets",
    date: "2024-04-12T11:20:00",
    statut: "lu",
    priorite: "moyenne",
    stagiaire: "Julie Martin",
    action_requise: true
  }
];

const notificationTypes = {
  fin_contrat: { label: "Fin de contrat", icon: Clock, color: "text-warning" },
  evaluation_retard: { label: "Évaluation en retard", icon: AlertTriangle, color: "text-destructive" },
  nouveau_stagiaire: { label: "Nouveau stagiaire", icon: Users, color: "text-success" },
  renouvellement: { label: "Renouvellement", icon: Calendar, color: "text-primary" },
  rappel_document: { label: "Document manquant", icon: FileText, color: "text-warning" }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedPriorite, setSelectedPriorite] = useState("all");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const { toast } = useToast();

  // Paramètres de notification
  const [notificationSettings, setNotificationSettings] = useState({
    emailFinContrat: true,
    emailEvaluationRetard: true,
    emailNouveauStagiaire: false,
    emailRenouvellement: true,
    pushNotifications: true,
    rappelAvant7Jours: true,
    rappelAvant1Jour: true,
    notificationWeekend: false
  });

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = selectedFilter === "all" || notif.type === selectedFilter;
    const matchesPriorite = selectedPriorite === "all" || notif.priorite === selectedPriorite;
    const matchesRead = !showOnlyUnread || notif.statut === "non_lu";
    
    return matchesFilter && matchesPriorite && matchesRead;
  });

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, statut: "lu" } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, statut: "lu" })));
    toast({
      title: "Notifications marquées comme lues",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès",
    });
  };

  const getPrioriteBadge = (priorite: string) => {
    switch (priorite) {
      case "haute":
        return <Badge className="bg-destructive/10 text-destructive">Haute</Badge>;
      case "moyenne":
        return <Badge className="bg-warning/10 text-warning">Moyenne</Badge>;
      case "basse":
        return <Badge className="bg-muted text-muted-foreground">Basse</Badge>;
      default:
        return <Badge variant="outline">{priorite}</Badge>;
    }
  };

  const getNotificationIcon = (type: string) => {
    const config = notificationTypes[type];
    if (!config) return <Bell className="h-5 w-5" />;
    
    const IconComponent = config.icon;
    return <IconComponent className={`h-5 w-5 ${config.color}`} />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Hier";
    if (days < 7) return `Il y a ${days} jours`;
    
    return date.toLocaleDateString('fr-FR');
  };

  const stats = {
    total: notifications.length,
    nonLues: notifications.filter(n => n.statut === "non_lu").length,
    actionRequise: notifications.filter(n => n.action_requise).length,
    haute: notifications.filter(n => n.priorite === "haute").length
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centre de Notifications</h1>
          <p className="text-muted-foreground">
            Gérez vos alertes et notifications de gestion des stagiaires
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
          
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MarkAsUnread className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Non lues</p>
                <p className="text-2xl font-bold">{stats.nonLues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Action requise</p>
                <p className="text-2xl font-bold">{stats.actionRequise}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <BellRing className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Haute priorité</p>
                <p className="text-2xl font-bold">{stats.haute}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filtres */}
          <Card>
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de notification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {Object.entries(notificationTypes).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedPriorite} onValueChange={setSelectedPriorite}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les priorités</SelectItem>
                    <SelectItem value="haute">Haute</SelectItem>
                    <SelectItem value="moyenne">Moyenne</SelectItem>
                    <SelectItem value="basse">Basse</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="unread-only"
                    checked={showOnlyUnread}
                    onCheckedChange={setShowOnlyUnread}
                  />
                  <Label htmlFor="unread-only">Non lues uniquement</Label>
                </div>
                
                <Button variant="outline" onClick={() => {
                  setSelectedFilter("all");
                  setSelectedPriorite("all");
                  setShowOnlyUnread(false);
                }}>
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des notifications */}
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all ${
                  notification.statut === "non_lu" 
                    ? "border-l-4 border-l-primary bg-gradient-card" 
                    : "hover:bg-muted/30"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium ${
                            notification.statut === "non_lu" ? "font-semibold" : ""
                          }`}>
                            {notification.titre}
                          </h4>
                          {notification.statut === "non_lu" && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{formatDate(notification.date)}</span>
                          <span>•</span>
                          <span>{notification.stagiaire}</span>
                          {notification.action_requise && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                Action requise
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getPrioriteBadge(notification.priorite)}
                      
                      <div className="flex space-x-1">
                        {notification.statut === "non_lu" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Notifications Email</span>
              </CardTitle>
              <CardDescription>
                Configurez vos préférences pour les notifications par email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "emailFinContrat", label: "Fin de contrat (7 jours avant)" },
                { key: "emailEvaluationRetard", label: "Évaluations en retard" },
                { key: "emailNouveauStagiaire", label: "Nouveaux stagiaires" },
                { key: "emailRenouvellement", label: "Renouvellements à décider" }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key}>{label}</Label>
                  <Switch
                    id={key}
                    checked={notificationSettings[key]}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BellRing className="h-5 w-5" />
                <span>Notifications Push</span>
              </CardTitle>
              <CardDescription>
                Paramètres des notifications dans l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "pushNotifications", label: "Activer les notifications push" },
                { key: "rappelAvant7Jours", label: "Rappels 7 jours avant échéance" },
                { key: "rappelAvant1Jour", label: "Rappels 1 jour avant échéance" },
                { key: "notificationWeekend", label: "Notifications le weekend" }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key}>{label}</Label>
                  <Switch
                    id={key}
                    checked={notificationSettings[key]}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fréquence des notifications</CardTitle>
              <CardDescription>
                Choisissez la fréquence de vos notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select defaultValue="immediate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immédiate</SelectItem>
                  <SelectItem value="hourly">Chaque heure</SelectItem>
                  <SelectItem value="daily">Quotidienne</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}