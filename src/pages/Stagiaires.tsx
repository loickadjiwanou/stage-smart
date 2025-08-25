import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  Building2,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

// Mock data pour les stagiaires
const mockStagiaires = [
  {
    id: 1,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@email.com",
    telephone: "01.23.45.67.89",
    departement: "IT",
    tuteur: "Jean Dupont",
    dateDebut: "2024-01-15",
    dateFin: "2024-07-15",
    statut: "actif",
    periode: "6 mois",
    adresse: "Paris, France"
  },
  {
    id: 2,
    nom: "Dubois",
    prenom: "Thomas",
    email: "thomas.dubois@email.com",
    telephone: "01.34.56.78.90",
    departement: "Marketing",
    tuteur: "Marie Leroy",
    dateDebut: "2024-02-01",
    dateFin: "2024-05-01",
    statut: "actif",
    periode: "3 mois",
    adresse: "Lyon, France"
  },
  {
    id: 3,
    nom: "Lambert",
    prenom: "Emma",
    email: "emma.lambert@email.com",
    telephone: "01.45.67.89.01",
    departement: "RH",
    tuteur: "Pierre Martin",
    dateDebut: "2023-10-01",
    dateFin: "2024-04-01",
    statut: "terminé",
    periode: "6 mois",
    adresse: "Marseille, France"
  }
];

const departements = ["IT", "Marketing", "RH", "Finance", "Commercial"];

export default function Stagiaires() {
  const [stagiaires, setStagiaires] = useState(mockStagiaires);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartement, setSelectedDepartement] = useState("all");
  const [selectedStatut, setSelectedStatut] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newStagiaire, setNewStagiaire] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    departement: "",
    tuteur: "",
    dateDebut: "",
    dateFin: "",
    periode: "",
    adresse: ""
  });

  const filteredStagiaires = stagiaires.filter(stagiaire => {
    const matchesSearch = `${stagiaire.prenom} ${stagiaire.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stagiaire.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartement = selectedDepartement === "all" || stagiaire.departement === selectedDepartement;
    const matchesStatut = selectedStatut === "all" || stagiaire.statut === selectedStatut;
    
    return matchesSearch && matchesDepartement && matchesStatut;
  });

  const handleAddStagiaire = () => {
    const newId = Math.max(...stagiaires.map(s => s.id)) + 1;
    const nouveauStagiaire = {
      ...newStagiaire,
      id: newId,
      statut: "actif"
    };
    
    setStagiaires([...stagiaires, nouveauStagiaire]);
    setNewStagiaire({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      departement: "",
      tuteur: "",
      dateDebut: "",
      dateFin: "",
      periode: "",
      adresse: ""
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Stagiaire ajouté",
      description: `${newStagiaire.prenom} ${newStagiaire.nom} a été ajouté avec succès`,
    });
  };

  const handleDeleteStagiaire = (id: number) => {
    setStagiaires(stagiaires.filter(s => s.id !== id));
    toast({
      title: "Stagiaire supprimé",
      description: "Le stagiaire a été supprimé avec succès",
      variant: "destructive"
    });
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "actif":
        return <Badge className="bg-success/10 text-success">Actif</Badge>;
      case "terminé":
        return <Badge variant="secondary">Terminé</Badge>;
      case "suspendu":
        return <Badge className="bg-warning/10 text-warning">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Stagiaires</h1>
          <p className="text-muted-foreground">
            Gérez les profils et informations de vos stagiaires
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-white hover:bg-gradient-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Stagiaire
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau stagiaire</DialogTitle>
              <DialogDescription>
                Renseignez les informations du nouveau stagiaire
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    value={newStagiaire.prenom}
                    onChange={(e) => setNewStagiaire({...newStagiaire, prenom: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    value={newStagiaire.nom}
                    onChange={(e) => setNewStagiaire({...newStagiaire, nom: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStagiaire.email}
                    onChange={(e) => setNewStagiaire({...newStagiaire, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={newStagiaire.telephone}
                    onChange={(e) => setNewStagiaire({...newStagiaire, telephone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departement">Département</Label>
                  <Select value={newStagiaire.departement} onValueChange={(value) => setNewStagiaire({...newStagiaire, departement: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      {departements.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tuteur">Tuteur</Label>
                  <Input
                    id="tuteur"
                    value={newStagiaire.tuteur}
                    onChange={(e) => setNewStagiaire({...newStagiaire, tuteur: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateDebut">Date de début</Label>
                  <Input
                    id="dateDebut"
                    type="date"
                    value={newStagiaire.dateDebut}
                    onChange={(e) => setNewStagiaire({...newStagiaire, dateDebut: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFin">Date de fin</Label>
                  <Input
                    id="dateFin"
                    type="date"
                    value={newStagiaire.dateFin}
                    onChange={(e) => setNewStagiaire({...newStagiaire, dateFin: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periode">Période</Label>
                  <Select value={newStagiaire.periode} onValueChange={(value) => setNewStagiaire({...newStagiaire, periode: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 mois">3 mois</SelectItem>
                      <SelectItem value="6 mois">6 mois</SelectItem>
                      <SelectItem value="12 mois">12 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Textarea
                  id="adresse"
                  value={newStagiaire.adresse}
                  onChange={(e) => setNewStagiaire({...newStagiaire, adresse: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddStagiaire}>
                Ajouter le stagiaire
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtres et Recherche</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un stagiaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDepartement} onValueChange={setSelectedDepartement}>
              <SelectTrigger>
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                {departements.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatut} onValueChange={setSelectedStatut}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="terminé">Terminé</SelectItem>
                <SelectItem value="suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedDepartement("all");
              setSelectedStatut("all");
            }}>
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des stagiaires */}
      <Card>
        <CardHeader>
          <CardTitle>
            Liste des Stagiaires ({filteredStagiaires.length})
          </CardTitle>
          <CardDescription>
            Gérez et consultez les informations de tous vos stagiaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stagiaire</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Tuteur</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStagiaires.map((stagiaire) => (
                <TableRow key={stagiaire.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{stagiaire.prenom} {stagiaire.nom}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {stagiaire.adresse}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                        {stagiaire.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                        {stagiaire.telephone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      {stagiaire.departement}
                    </div>
                  </TableCell>
                  <TableCell>{stagiaire.tuteur}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                        {stagiaire.dateDebut} - {stagiaire.dateFin}
                      </div>
                      <Badge variant="outline">{stagiaire.periode}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatutBadge(stagiaire.statut)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteStagiaire(stagiaire.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}