import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  FileText,
  Target,
  TrendingUp,
  Users,
  Award,
  RotateCcw
} from "lucide-react";

// Mock data pour le suivi
const mockSuiviData = [
  {
    id: 1,
    stagiaire: "Sophie Martin",
    departement: "IT",
    tuteur: "Jean Dupont",
    dateDebut: "2024-01-15",
    dateFin: "2024-07-15",
    progression: 65,
    statut: "en_cours",
    missions: [
      { id: 1, titre: "Développement application mobile", statut: "terminé", progression: 100 },
      { id: 2, titre: "Formation React Native", statut: "en_cours", progression: 70 },
      { id: 3, titre: "Tests et documentation", statut: "planifié", progression: 0 }
    ],
    projets: [
      { id: 1, nom: "App E-commerce", statut: "actif", dateEcheance: "2024-05-15" },
      { id: 2, nom: "Refonte site web", statut: "planifié", dateEcheance: "2024-06-30" }
    ]
  },
  {
    id: 2,
    stagiaire: "Thomas Dubois",
    departement: "Marketing",
    tuteur: "Marie Leroy",
    dateDebut: "2024-02-01",
    dateFin: "2024-05-01",
    progression: 85,
    statut: "bientot_fini",
    missions: [
      { id: 1, titre: "Analyse marché concurrentiel", statut: "terminé", progression: 100 },
      { id: 2, titre: "Campagne publicitaire", statut: "terminé", progression: 100 },
      { id: 3, titre: "Rapport final", statut: "en_cours", progression: 60 }
    ],
    projets: [
      { id: 1, nom: "Lancement produit X", statut: "actif", dateEcheance: "2024-04-20" }
    ]
  }
];

const statutOptions = [
  { value: "planifié", label: "Planifié", color: "bg-muted" },
  { value: "en_cours", label: "En cours", color: "bg-primary" },
  { value: "terminé", label: "Terminé", color: "bg-success" },
  { value: "en_retard", label: "En retard", color: "bg-destructive" }
];

export default function Suivi() {
  const [suiviData, setSuiviData] = useState(mockSuiviData);
  const [selectedStagiaire, setSelectedStagiaire] = useState("all");
  const [isNewMissionOpen, setIsNewMissionOpen] = useState(false);
  const [isRenewalOpen, setIsRenewalOpen] = useState(false);
  const { toast } = useToast();

  const [newMission, setNewMission] = useState({
    stagiaireId: "",
    titre: "",
    description: "",
    dateEcheance: "",
    priorite: "normale"
  });

  const filteredSuivi = selectedStagiaire === "all" 
    ? suiviData 
    : suiviData.filter(s => s.id.toString() === selectedStagiaire);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "en_cours":
        return <Badge className="bg-primary/10 text-primary">En cours</Badge>;
      case "bientot_fini":
        return <Badge className="bg-warning/10 text-warning">Bientôt terminé</Badge>;
      case "terminé":
        return <Badge className="bg-success/10 text-success">Terminé</Badge>;
      case "en_retard":
        return <Badge className="bg-destructive/10 text-destructive">En retard</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const getMissionStatutColor = (statut: string) => {
    const option = statutOptions.find(opt => opt.value === statut);
    return option?.color || "bg-muted";
  };

  const handleRenewal = (stagiaireId: number, action: "renouveler" | "cloturer") => {
    setSuiviData(prev => prev.map(s => 
      s.id === stagiaireId 
        ? { ...s, statut: action === "renouveler" ? "en_cours" : "terminé" }
        : s
    ));
    
    toast({
      title: action === "renouveler" ? "Contrat renouvelé" : "Stage clôturé",
      description: `Le stage a été ${action === "renouveler" ? "renouvelé" : "clôturé"} avec succès`,
    });
    setIsRenewalOpen(false);
  };

  const stats = {
    totalStagiaires: suiviData.length,
    enCours: suiviData.filter(s => s.statut === "en_cours").length,
    bientotFinis: suiviData.filter(s => s.statut === "bientot_fini").length,
    progressionMoyenne: Math.round(suiviData.reduce((acc, s) => acc + s.progression, 0) / suiviData.length)
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Suivi des Stages</h1>
          <p className="text-muted-foreground">
            Suivez la progression et les missions de vos stagiaires
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={isNewMissionOpen} onOpenChange={setIsNewMissionOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Mission
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle mission</DialogTitle>
                <DialogDescription>
                  Assignez une nouvelle mission à un stagiaire
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="stagiaire">Stagiaire</Label>
                  <Select value={newMission.stagiaireId} onValueChange={(value) => setNewMission({...newMission, stagiaireId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un stagiaire" />
                    </SelectTrigger>
                    <SelectContent>
                      {suiviData.map(s => (
                        <SelectItem key={s.id} value={s.id.toString()}>{s.stagiaire}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre de la mission</Label>
                  <Input
                    id="titre"
                    value={newMission.titre}
                    onChange={(e) => setNewMission({...newMission, titre: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMission.description}
                    onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateEcheance">Date d'échéance</Label>
                    <Input
                      id="dateEcheance"
                      type="date"
                      value={newMission.dateEcheance}
                      onChange={(e) => setNewMission({...newMission, dateEcheance: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priorite">Priorité</Label>
                    <Select value={newMission.priorite} onValueChange={(value) => setNewMission({...newMission, priorite: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basse">Basse</SelectItem>
                        <SelectItem value="normale">Normale</SelectItem>
                        <SelectItem value="haute">Haute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewMissionOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Mission ajoutée",
                    description: "La nouvelle mission a été assignée avec succès",
                  });
                  setIsNewMissionOpen(false);
                }}>
                  Ajouter la mission
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Select value={selectedStagiaire} onValueChange={setSelectedStagiaire}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les stagiaires</SelectItem>
              {suiviData.map(s => (
                <SelectItem key={s.id} value={s.id.toString()}>{s.stagiaire}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stagiaires</p>
                <p className="text-2xl font-bold">{stats.totalStagiaires}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En cours</p>
                <p className="text-2xl font-bold">{stats.enCours}</p>
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
                <p className="text-sm text-muted-foreground">Bientôt terminés</p>
                <p className="text-2xl font-bold">{stats.bientotFinis}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progression Moyenne</p>
                <p className="text-2xl font-bold">{stats.progressionMoyenne}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suivi détaillé */}
      {filteredSuivi.map((stagiaire) => (
        <Card key={stagiaire.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-3">
                  <span>{stagiaire.stagiaire}</span>
                  {getStatutBadge(stagiaire.statut)}
                </CardTitle>
                <CardDescription>
                  {stagiaire.departement} • Tuteur: {stagiaire.tuteur} • {stagiaire.dateDebut} - {stagiaire.dateFin}
                </CardDescription>
              </div>
              
              <div className="flex space-x-2">
                {stagiaire.statut === "bientot_fini" && (
                  <Dialog open={isRenewalOpen} onOpenChange={setIsRenewalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Renouveler/Clôturer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Gestion de fin de stage</DialogTitle>
                        <DialogDescription>
                          Que souhaitez-vous faire pour le stage de {stagiaire.stagiaire} ?
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Button 
                            variant="outline"
                            onClick={() => handleRenewal(stagiaire.id, "renouveler")}
                            className="h-20 flex flex-col"
                          >
                            <RotateCcw className="h-6 w-6 mb-2" />
                            Renouveler
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleRenewal(stagiaire.id, "cloturer")}
                            className="h-20 flex flex-col"
                          >
                            <CheckCircle className="h-6 w-6 mb-2" />
                            Clôturer
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression globale</span>
                <span>{stagiaire.progression}%</span>
              </div>
              <Progress value={stagiaire.progression} className="h-2" />
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="missions" className="space-y-4">
              <TabsList>
                <TabsTrigger value="missions">Missions</TabsTrigger>
                <TabsTrigger value="projets">Projets</TabsTrigger>
              </TabsList>
              
              <TabsContent value="missions" className="space-y-4">
                {stagiaire.missions.map((mission) => (
                  <div key={mission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getMissionStatutColor(mission.statut)}`} />
                      <div>
                        <h4 className="font-medium">{mission.titre}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={mission.progression} className="w-24 h-2" />
                          <span className="text-xs text-muted-foreground">{mission.progression}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={mission.statut === "terminé" ? "default" : "outline"}>
                      {mission.statut}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="projets" className="space-y-4">
                {stagiaire.projets.map((projet) => (
                  <div key={projet.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-card flex items-center justify-center">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{projet.nom}</h4>
                        <p className="text-sm text-muted-foreground">
                          Échéance: {projet.dateEcheance}
                        </p>
                      </div>
                    </div>
                    <Badge variant={projet.statut === "actif" ? "default" : "outline"}>
                      {projet.statut}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}