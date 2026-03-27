import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { mockPlantillas } from "../data/mockData";
import { PlantillaCobranza, FRECUENCIAS } from "../types";
import { Plus, Pencil, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export function Plantillas() {
  const [plantillas, setPlantillas] = useState<PlantillaCobranza[]>(mockPlantillas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlantilla, setEditingPlantilla] = useState<PlantillaCobranza | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<PlantillaCobranza>>({
    nombre: "",
    tipoServicio: "",
    frecuencia: "mensual",
    monto: 0,
    diasAnticipacion: 7,
    mensaje: "",
    activo: true,
  });

  const handleOpenDialog = (plantilla?: PlantillaCobranza) => {
    if (plantilla) {
      setEditingPlantilla(plantilla);
      setFormData(plantilla);
    } else {
      setEditingPlantilla(null);
      setFormData({
        nombre: "",
        tipoServicio: "",
        frecuencia: "mensual",
        monto: 0,
        diasAnticipacion: 7,
        mensaje: "",
        activo: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPlantilla(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPlantilla) {
      setPlantillas(
        plantillas.map((p) =>
          p.id === editingPlantilla.id ? { ...editingPlantilla, ...formData } : p
        )
      );
      toast.success("Plantilla actualizada correctamente");
    } else {
      const newPlantilla: PlantillaCobranza = {
        id: Date.now().toString(),
        ...formData as Omit<PlantillaCobranza, "id">,
      };
      setPlantillas([...plantillas, newPlantilla]);
      toast.success("Plantilla creada correctamente");
    }

    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de eliminar esta plantilla?")) {
      setPlantillas(plantillas.filter((p) => p.id !== id));
      toast.success("Plantilla eliminada correctamente");
    }
  };

  const handleDuplicate = (plantilla: PlantillaCobranza) => {
    const newPlantilla: PlantillaCobranza = {
      ...plantilla,
      id: Date.now().toString(),
      nombre: `${plantilla.nombre} (Copia)`,
    };
    setPlantillas([...plantillas, newPlantilla]);
    toast.success("Plantilla duplicada correctamente");
  };

  const handleToggleActivo = (id: string) => {
    setPlantillas(
      plantillas.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p))
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Plantillas de Cobranza</h1>
          <p className="text-gray-600 mt-2">
            Configura plantillas para automatizar tus procesos de cobranza
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Plantilla
        </Button>
      </div>

      {/* Tarjetas de plantillas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantillas.map((plantilla) => (
          <Card key={plantilla.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{plantilla.nombre}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {plantilla.tipoServicio}
                  </p>
                </div>
                <Switch
                  checked={plantilla.activo}
                  onCheckedChange={() => handleToggleActivo(plantilla.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frecuencia:</span>
                  <span className="font-medium capitalize">
                    {plantilla.frecuencia}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monto:</span>
                  <span className="font-medium">
                    ${plantilla.monto.toLocaleString("es-CL")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Anticipación:</span>
                  <span className="font-medium">{plantilla.diasAnticipacion} días</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Mensaje:</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-md">
                    {plantilla.mensaje}
                  </p>
                </div>
                <div className="flex gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleOpenDialog(plantilla)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(plantilla)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(plantilla.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para crear/editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPlantilla ? "Editar Plantilla" : "Nueva Plantilla"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2">
                <Label htmlFor="nombre">Nombre de la Plantilla</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="tipoServicio">Tipo de Servicio</Label>
                <Input
                  id="tipoServicio"
                  value={formData.tipoServicio}
                  onChange={(e) =>
                    setFormData({ ...formData, tipoServicio: e.target.value })
                  }
                  placeholder="Ej: Hosting y Dominios"
                  required
                />
              </div>
              <div>
                <Label htmlFor="frecuencia">Frecuencia</Label>
                <Select
                  value={formData.frecuencia}
                  onValueChange={(value: unknown) =>
                    setFormData({ ...formData, frecuencia: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FRECUENCIAS.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="monto">Monto ($)</Label>
                <Input
                  id="monto"
                  type="number"
                  value={formData.monto}
                  onChange={(e) =>
                    setFormData({ ...formData, monto: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="diasAnticipacion">Días de Anticipación</Label>
                <Input
                  id="diasAnticipacion"
                  type="number"
                  value={formData.diasAnticipacion}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      diasAnticipacion: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="mensaje">Mensaje de Cobranza</Label>
                <Textarea
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={(e) =>
                    setFormData({ ...formData, mensaje: e.target.value })
                  }
                  placeholder="Usa {dias} para días restantes y {monto} para el monto a pagar"
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Variables disponibles: {"{dias}"}, {"{monto}"}
                </p>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Switch
                  id="activo"
                  checked={formData.activo}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, activo: checked })
                  }
                />
                <Label htmlFor="activo">Plantilla Activa</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingPlantilla ? "Guardar Cambios" : "Crear Plantilla"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
