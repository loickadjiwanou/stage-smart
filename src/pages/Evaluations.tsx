import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  Plus,
  Eye,
  Edit,
  Calendar,
  User,
  Users,
  Target,
  TrendingUp,
  Award,
  MessageSquare,
  CheckCircle,
  Clock
} from "lucide-react";

// Mock data pour les évaluations
const mockEvaluations = [
  {
    id: 1,
    stagiaire: "Sophie Martin",
    departement: "IT",
    tuteur: "Jean Dupont",
    type: "tuteur",
    date: "2024-03-15",
    statut: "terminé",
    noteGlobale: 4.2,
    competences: {
      techniques: 4.5,
      communication: 4.0,
      autonomie: 3.8,
      creativite: 4.2,
      travailEquipe: 4.3
    },
    commentaires: "Excellente progression technique, très investie dans ses missions.",
    recommandationEmbauche: "fortement_recommandé"
  },
  {
    id: 2,
    stagiaire: "Thomas Dubois",
    departement: "Marketing",
    tuteur: "Marie Leroy",
    type: "auto_evaluation",
    date: "2024-03-10",
    statut: "en_attente",
    noteGlobale: 3.8,
    competences: {
      techniques: 3.5,
      communication: 4.2,
      autonomie: 4.0,
      creativite: 3.8,
      travailEquipe: 3.6
    },
    commentaires: "Je pense avoir bien progressé en autonomie et communication.",
    recommandationEmbauche: "recommandé"
  },
  {
    id: 3,
    stagiaire: "Emma Lambert",
    departement: "RH",
    tuteur: "Pierre Martin",
    type: "feedback_360",
    date: "2024-02-28",
    statut: "terminé",
    noteGlobale: 4.0,
    competences: {
      techniques: 3.8,
      communication: 4.5,
      autonomie: 3.7,
      creativite: 3.9,
      travailEquipe: 4.2
    },
    commentaires: "Excellentes compétences relationnelles, très appréciée de l'équipe.",
    recommandationEmbauche: "recommandé"
  }
];

const competencesLabels = {
  techniques: "Compétences techniques",
  communication: "Communication",
  autonomie: "Autonomie",
  creativite: "Créativité",
  travailEquipe: "Travail d'équipe"
};

const typeEvaluationLabels = {
  tuteur: "Évaluation Tuteur",
  auto_evaluation: "Auto-évaluation",
  feedback_360: "Feedback 360°"
};

const recommendationLabels = {
  fortement_recommandé: "Fortement recommandé",
  recommandé: "Recommandé",
  a_surveiller: "À surveiller",
  non_recommandé: "Non recommandé"
};

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState(mockEvaluations);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStagiaire, setSelectedStagiaire] = useState("all");
  const [isNewEvalOpen, setIsNewEvalOpen] = useState(false);
  const [selectedEval, setSelectedEval] = useState(null);
  const { toast } = useToast();

  const [newEvaluation, setNewEvaluation] = useState({
    stagiaireId: "",
    type: "tuteur",
    competences: {
      techniques: [3],
      communication: [3],
      autonomie: [3],
      creativite: [3],
      travailEquipe: [3]
    },
    commentaires: "",
    recommandationEmbauche: "recommandé"
  });

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesType = selectedType === "all" || evaluation.type === selectedType;
    const matchesStagiaire = selectedStagiaire === "all" || evaluation.stagiaire === selectedStagiaire;
    return matchesType && matchesStagiaire;
  });

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "terminé":
        return <Badge className="bg-success/10 text-success">Terminé</Badge>;
      case "en_attente":
        return <Badge className="bg-warning/10 text-warning">En attente</Badge>;
      case "planifié":
        return <Badge variant="outline">Planifié</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      tuteur: "bg-primary/10 text-primary",
      auto_evaluation: "bg-accent/10 text-accent-foreground",
      feedback_360: "bg-secondary/10 text-secondary-foreground"
    };
    return <Badge className={colors[type]}>{typeEvaluationLabels[type]}</Badge>;
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "fortement_recommandé":
        return <Badge className="bg-success/10 text-success">Fortement recommandé</Badge>;
      case "recommandé":
        return <Badge className="bg-primary/10 text-primary">Recommandé</Badge>;
      case "a_surveiller":
        return <Badge className="bg-warning/10 text-warning">À surveiller</Badge>;
      case "non_recommandé":
        return <Badge className="bg-destructive/10 text-destructive">Non recommandé</Badge>;
      default:
        return <Badge variant="outline">{recommendation}</Badge>;
    }
  };

  const renderStars = (note: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= note ? "text-warning fill-warning" : "text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleNewEvaluation = () => {
    const noteGlobale = Object.values(newEvaluation.competences)
      .reduce((acc, val) => acc + val[0], 0) / 5;
    
    const nouvelleEval = {
      id: Math.max(...evaluations.map(e => e.id)) + 1,
      stagiaire: "Nouveau Stagiaire", // À adapter avec vraies données
      departement: "IT",
      tuteur: "Tuteur",
      type: newEvaluation.type,
      date: new Date().toISOString().split('T')[0],
      statut: "terminé",
      noteGlobale: Math.round(noteGlobale * 10) / 10,
      competences: {
        techniques: newEvaluation.competences.techniques[0],
        communication: newEvaluation.competences.communication[0],
        autonomie: newEvaluation.competences.autonomie[0],
        creativite: newEvaluation.competences.creativite[0],
        travailEquipe: newEvaluation.competences.travailEquipe[0]
      },
      commentaires: newEvaluation.commentaires,
      recommandationEmbauche: newEvaluation.recommandationEmbauche
    };
    
    setEvaluations([...evaluations, nouvelleEval]);
    setIsNewEvalOpen(false);
    
    toast({
      title: "Évaluation créée",
      description: "La nouvelle évaluation a été ajoutée avec succès",
    });
  };

  const stats = {
    totalEvaluations: evaluations.length,
    moyenneGlobale: Math.round(evaluations.reduce((acc, e) => acc + e.noteGlobale, 0) / evaluations.length * 10) / 10,
    enAttente: evaluations.filter(e => e.statut === "en_attente").length,
    fortementRecommandes: evaluations.filter(e => e.recommandationEmbauche === "fortement_recommandé").length
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Évaluations</h1>
          <p className="text-muted-foreground">
            Gérez et consultez les évaluations de vos stagiaires
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={isNewEvalOpen} onOpenChange={setIsNewEvalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Évaluation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle évaluation</DialogTitle>
                <DialogDescription>
                  Évaluez les compétences et performances du stagiaire
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type d'évaluation</Label>
                    <Select value={newEvaluation.type} onValueChange={(value) => setNewEvaluation({...newEvaluation, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuteur">Évaluation Tuteur</SelectItem>
                        <SelectItem value="auto_evaluation">Auto-évaluation</SelectItem>
                        <SelectItem value="feedback_360">Feedback 360°</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Recommandation d'embauche</Label>
                    <Select value={newEvaluation.recommandationEmbauche} onValueChange={(value) => setNewEvaluation({...newEvaluation, recommandationEmbauche: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fortement_recommandé">Fortement recommandé</SelectItem>
                        <SelectItem value="recommandé">Recommandé</SelectItem>
                        <SelectItem value="a_surveiller">À surveiller</SelectItem>
                        <SelectItem value="non_recommandé">Non recommandé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Évaluation des compétences (1-5)</Label>
                  {Object.entries(competencesLabels).map(([key, label]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-sm text-muted-foreground">{newEvaluation.competences[key][0]}/5</span>
                      </div>
                      <Slider
                        value={newEvaluation.competences[key]}
                        onValueChange={(value) => setNewEvaluation({
                          ...newEvaluation,
                          competences: {
                            ...newEvaluation.competences,
                            [key]: value
                          }
                        })}
                        max={5}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="commentaires">Commentaires</Label>
                  <Textarea
                    id="commentaires"
                    value={newEvaluation.commentaires}
                    onChange={(e) => setNewEvaluation({...newEvaluation, commentaires: e.target.value})}
                    placeholder="Commentaires détaillés sur la performance..."
                    rows={4}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewEvalOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleNewEvaluation}>
                  Créer l'évaluation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Type d'évaluation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="tuteur">Évaluation Tuteur</SelectItem>
              <SelectItem value="auto_evaluation">Auto-évaluation</SelectItem>
              <SelectItem value="feedback_360">Feedback 360°</SelectItem>
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
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Évaluations</p>
                <p className="text-2xl font-bold">{stats.totalEvaluations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Moyenne Globale</p>
                <p className="text-2xl font-bold">{stats.moyenneGlobale}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Attente</p>
                <p className="text-2xl font-bold">{stats.enAttente}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fortement Recommandés</p>
                <p className="text-2xl font-bold">{stats.fortementRecommandes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des évaluations */}
      <div className="grid gap-6">
        {filteredEvaluations.map((evaluation) => (
          <Card key={evaluation.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-3">
                    <span>{evaluation.stagiaire}</span>
                    {getTypeBadge(evaluation.type)}
                    {getStatutBadge(evaluation.statut)}
                  </CardTitle>
                  <CardDescription>
                    {evaluation.departement} • Tuteur: {evaluation.tuteur} • {evaluation.date}
                  </CardDescription>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{evaluation.noteGlobale}/5</div>
                    {renderStars(evaluation.noteGlobale)}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails de l'évaluation</DialogTitle>
                          <DialogDescription>
                            {evaluation.stagiaire} • {typeEvaluationLabels[evaluation.type]}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div className="grid gap-4">
                            <h4 className="font-medium">Compétences évaluées</h4>
                            {Object.entries(evaluation.competences).map(([key, note]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span>{competencesLabels[key]}</span>
                                <div className="flex items-center space-x-2">
                                  {renderStars(note)}
                                  <span className="text-sm text-muted-foreground">{note}/5</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Commentaires</h4>
                            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                              {evaluation.commentaires}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Recommandation d'embauche</h4>
                            {getRecommendationBadge(evaluation.recommandationEmbauche)}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">COMPÉTENCES</h4>
                  {Object.entries(evaluation.competences).map(([key, note]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm">{competencesLabels[key]}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(note / 5) * 100} className="w-16 h-2" />
                        <span className="text-xs text-muted-foreground">{note}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">RECOMMANDATION</h4>
                  <div className="space-y-2">
                    {getRecommendationBadge(evaluation.recommandationEmbauche)}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {evaluation.commentaires}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}