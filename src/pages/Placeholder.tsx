import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Construction,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features?: string[];
}

export default function Placeholder({ title, description, icon: Icon, features = [] }: PlaceholderProps) {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Status Card */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Construction className="h-5 w-5 text-warning" />
            <span>Module en développement</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge className="bg-warning/10 text-warning">
              <Clock className="h-3 w-3 mr-1" />
              En cours
            </Badge>
            <span className="text-sm text-muted-foreground">
              Disponible prochainement
            </span>
          </div>

          {features.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Fonctionnalités prévues :</h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Planifier une notification
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Development Timeline */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Feuille de route</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 rounded-full bg-success"></div>
              <span className="text-sm">Phase 1: Dashboard et navigation - Terminé</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 rounded-full bg-warning"></div>
              <span className="text-sm">Phase 2: {title} - En développement</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 rounded-full bg-muted"></div>
              <span className="text-sm">Phase 3: Fonctionnalités avancées - Prévu</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}