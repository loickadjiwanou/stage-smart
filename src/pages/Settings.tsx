import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Moon,
  Sun,
  Database,
  Trash2,
  Shield,
  Bell,
  Mail,
  Settings2,
  Users,
  FileText,
  Download,
  Upload,
  AlertTriangle
} from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const { toast } = useToast();

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: "Thème modifié",
      description: `Mode ${!darkMode ? 'sombre' : 'clair'} activé`,
    });
  };

  const handleDeleteAllData = () => {
    toast({
      title: "Suppression des données",
      description: "Toutes les données ont été supprimées avec succès",
      variant: "destructive"
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export en cours",
      description: "Vos données sont en cours d'exportation...",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import réussi",
      description: "Les données ont été importées avec succès",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">
          Configuration globale de l'application
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Apparence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings2 className="h-5 w-5" />
              <span>Apparence</span>
            </CardTitle>
            <CardDescription>
              Personnalisez l'interface de l'application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <Label htmlFor="dark-mode">Mode sombre</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Thème actuel</Label>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {darkMode ? "Mode sombre" : "Mode clair"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Gérez vos préférences de notification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <Label htmlFor="notifications">Notifications système</Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <Label htmlFor="email-alerts">Alertes par email</Label>
              </div>
              <Switch
                id="email-alerts"
                checked={emailAlerts}
                onCheckedChange={setEmailAlerts}
              />
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              <p>• Fins de contrat (7 jours avant)</p>
              <p>• Évaluations en retard</p>
              <p>• Nouveaux stagiaires</p>
            </div>
          </CardContent>
        </Card>

        {/* Gestion des données */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Gestion des données</span>
            </CardTitle>
            <CardDescription>
              Sauvegarde et gestion de vos données
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <Label htmlFor="auto-backup">Sauvegarde automatique</Label>
              </div>
              <Switch
                id="auto-backup"
                checked={autoBackup}
                onCheckedChange={setAutoBackup}
              />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" onClick={handleImportData}>
                <Upload className="mr-2 h-4 w-4" />
                Importer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions dangereuses */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span>Zone dangereuse</span>
            </CardTitle>
            <CardDescription>
              Actions irréversibles - utilisez avec précaution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer toutes les données
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Toutes les données des stagiaires, 
                    évaluations et statistiques seront définitivement supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAllData}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Oui, supprimer tout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Suppression de tous les profils stagiaires</p>
              <p>• Suppression de toutes les évaluations</p>
              <p>• Suppression de l'historique et statistiques</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations système */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Informations système</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Version de l'application</Label>
              <Badge variant="secondary">v1.0.0</Badge>
            </div>
            <div className="space-y-2">
              <Label>Dernière sauvegarde</Label>
              <Badge variant="secondary">Aujourd'hui, 14:30</Badge>
            </div>
            <div className="space-y-2">
              <Label>Statut du système</Label>
              <Badge className="bg-success text-success-foreground">Opérationnel</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}