import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
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
import { mockServicios, mockClientes } from "../data/mockData";
import { Servicio, TIPOS_SERVICIO, ESTADOS_SERVICIO } from "../types";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export function Servicios() {
  const [servicios, setServicios] = useState<Servicio[]>(mockServicios);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServicio, setEditingServicio] = useState<Servicio | null>(null);
  const [formData, setFormData] = useState<Partial<Servicio>>({
    clienteId: "",
    tipoServicio: "hosting_dominios",
    descripcion: "",
    precioMensual: 0,
    fechaInicio: "",
    fechaVencimiento: "",
    estado: "activo",
  });

  const filteredServicios = servicios.filter(
    (servicio) =>
      servicio.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (servicio?: Servicio) => {
    if (servicio) {
      setEditingServicio(servicio);
      setFormData(servicio);
    } else {
      setEditingServicio(null);
      setFormData({
        clienteId: "",
        tipoServicio: "hosting_dominios",
        descripcion: "",
        precioMensual: 0,
        fechaInicio: "",
        fechaVencimiento: "",
        estado: "activo",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingServicio(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cliente = mockClientes.find((c) => c.id === formData.clienteId);
    if (!cliente) {
      toast.error("Debe seleccionar un cliente válido");
      return;
    }

    if (editingServicio) {
      setServicios(
        servicios.map((s) =>
          s.id === editingServicio.id
            ? { ...editingServicio, ...formData, clienteNombre: cliente.empresa }
            : s
        )
      );
      toast.success("Servicio actualizado correctamente");
    } else {
      const newServicio: Servicio = {
        id: Date.now().toString(),
        ...formData as Omit<Servicio, "id" | "clienteNombre">,
        clienteNombre: cliente.empresa,
      };
      setServicios([...servicios, newServicio]);
      toast.success("Servicio creado correctamente");
    }

    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de eliminar este servicio?")) {
      setServicios(servicios.filter((s) => s.id !== id));
      toast.success("Servicio eliminado correctamente");
    }
  };

  const getTipoServicioLabel = (value: string) => {
    return TIPOS_SERVICIO.find((t) => t.value === value)?.label || value;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Gestión de Servicios</h1>
          <p className="text-gray-600 mt-2">
            Administra los servicios digitales de tus clientes
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Servicio
        </Button>
      </div>

      {/* Búsqueda */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar por cliente o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla de servicios */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Servicios ({filteredServicios.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Tipo de Servicio
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Descripción
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Precio Mensual
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredServicios.map((servicio) => (
                  <tr key={servicio.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{servicio.clienteNombre}</td>
                    <td className="py-3 px-4">
                      {getTipoServicioLabel(servicio.tipoServicio)}
                    </td>
                    <td className="py-3 px-4">{servicio.descripcion}</td>
                    <td className="py-3 px-4">
                      ${servicio.precioMensual.toLocaleString("es-CL")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          servicio.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : servicio.estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : servicio.estado === "suspendido"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {servicio.estado.charAt(0).toUpperCase() +
                          servicio.estado.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(servicio)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(servicio.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog para crear/editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingServicio ? "Editar Servicio" : "Nuevo Servicio"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="clienteId">Cliente</Label>
                <Select
                  value={formData.clienteId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, clienteId: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.empresa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tipoServicio">Tipo de Servicio</Label>
                <Select
                  value={formData.tipoServicio}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, tipoServicio: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_SERVICIO.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="precioMensual">Precio Mensual ($)</Label>
                <Input
                  id="precioMensual"
                  type="number"
                  value={formData.precioMensual}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      precioMensual: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, estado: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_SERVICIO.map((estado) => (
                      <SelectItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) =>
                    setFormData({ ...formData, fechaInicio: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                <Input
                  id="fechaVencimiento"
                  type="date"
                  value={formData.fechaVencimiento}
                  onChange={(e) =>
                    setFormData({ ...formData, fechaVencimiento: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingServicio ? "Guardar Cambios" : "Crear Servicio"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
