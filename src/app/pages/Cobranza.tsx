import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockCobros } from "../data/mockData";
import { Cobro } from "../types";
import { CheckCircle, Clock, AlertTriangle, Eye } from "lucide-react";
import { toast } from "sonner";

export function Cobranza() {
  const [cobros, setCobros] = useState<Cobro[]>(mockCobros);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCobro, setSelectedCobro] = useState<Cobro | null>(null);
  const [pagoData, setPagoData] = useState({
    metodoPago: "",
    referencia: "",
  });

  const cobrosPendientes = cobros.filter((c) => c.estado === "pendiente");
  const cobrosVencidos = cobros.filter((c) => c.estado === "vencido");
  const cobrosPagados = cobros.filter((c) => c.estado === "pagado");

  const totalPendiente = cobrosPendientes.reduce((sum, c) => sum + c.monto, 0);
  const totalVencido = cobrosVencidos.reduce((sum, c) => sum + c.monto, 0);
  const totalPagado = cobrosPagados.reduce((sum, c) => sum + c.monto, 0);

  const handleOpenPagoDialog = (cobro: Cobro) => {
    setSelectedCobro(cobro);
    setPagoData({ metodoPago: "", referencia: "" });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCobro(null);
    setPagoData({ metodoPago: "", referencia: "" });
  };

  const handleRegistrarPago = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCobro) return;

    setCobros(
      cobros.map((c) =>
        c.id === selectedCobro.id
          ? {
              ...c,
              estado: "pagado" as const,
              metodoPago: pagoData.metodoPago,
              referencia: pagoData.referencia,
            }
          : c
      )
    );

    toast.success("Pago registrado correctamente");
    handleCloseDialog();
  };

  // const handleMarcarVencido = (id: string) => {
  //   setCobros(
  //     cobros.map((c) => (c.id === id ? { ...c, estado: "vencido" as const } : c))
  //   );
  //   toast.warning("Cobro marcado como vencido");
  // };

  const CobroCard = ({ cobro }: { cobro: Cobro }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{cobro.clienteNombre}</h3>
          <p className="text-sm text-gray-500">{cobro.tipoServicio}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            cobro.estado === "pagado"
              ? "bg-green-100 text-green-800"
              : cobro.estado === "pendiente"
              ? "bg-yellow-100 text-yellow-800"
              : cobro.estado === "vencido"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {cobro.estado.charAt(0).toUpperCase() + cobro.estado.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Monto:</span>
          <span className="font-semibold text-gray-900">
            ${cobro.monto.toLocaleString("es-CL")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Fecha Emisión:</span>
          <span>{new Date(cobro.fechaEmision).toLocaleDateString("es-CL")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Vencimiento:</span>
          <span>{new Date(cobro.fechaVencimiento).toLocaleDateString("es-CL")}</span>
        </div>
        {cobro.metodoPago && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Método de Pago:</span>
            <span>{cobro.metodoPago}</span>
          </div>
        )}
        {cobro.referencia && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Referencia:</span>
            <span className="font-mono text-xs">{cobro.referencia}</span>
          </div>
        )}
      </div>

      {cobro.estado === "pendiente" && (
        <Button
          onClick={() => handleOpenPagoDialog(cobro)}
          className="w-full"
          size="sm"
        >
          Registrar Pago
        </Button>
      )}
      {cobro.estado === "vencido" && (
        <Button
          onClick={() => handleOpenPagoDialog(cobro)}
          variant="destructive"
          className="w-full"
          size="sm"
        >
          Registrar Pago Vencido
        </Button>
      )}
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Módulo de Cobranza</h1>
        <p className="text-gray-600 mt-2">
          Gestiona los cobros y pagos de tus servicios
        </p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Cobros</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cobros.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cobrosPendientes.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              ${totalPendiente.toLocaleString("es-CL")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cobrosVencidos.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              ${totalVencido.toLocaleString("es-CL")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pagados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cobrosPagados.length}</div>
            <p className="text-xs text-gray-600 mt-1">
              ${totalPagado.toLocaleString("es-CL")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para organizar cobros */}
      <Tabs defaultValue="pendientes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pendientes">
            Pendientes ({cobrosPendientes.length})
          </TabsTrigger>
          <TabsTrigger value="vencidos">
            Vencidos ({cobrosVencidos.length})
          </TabsTrigger>
          <TabsTrigger value="pagados">
            Pagados ({cobrosPagados.length})
          </TabsTrigger>
          <TabsTrigger value="todos">Todos ({cobros.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cobrosPendientes.map((cobro) => (
              <CobroCard key={cobro.id} cobro={cobro} />
            ))}
            {cobrosPendientes.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No hay cobros pendientes
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="vencidos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cobrosVencidos.map((cobro) => (
              <CobroCard key={cobro.id} cobro={cobro} />
            ))}
            {cobrosVencidos.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No hay cobros vencidos
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pagados">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cobrosPagados.map((cobro) => (
              <CobroCard key={cobro.id} cobro={cobro} />
            ))}
            {cobrosPagados.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No hay cobros pagados
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="todos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cobros.map((cobro) => (
              <CobroCard key={cobro.id} cobro={cobro} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para registrar pago */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pago</DialogTitle>
          </DialogHeader>
          {selectedCobro && (
            <form onSubmit={handleRegistrarPago}>
              <div className="space-y-4 py-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cliente:</span>
                    <span className="font-medium">{selectedCobro.clienteNombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monto:</span>
                    <span className="font-bold text-lg">
                      ${selectedCobro.monto.toLocaleString("es-CL")}
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="metodoPago">Método de Pago</Label>
                  <Select
                    value={pagoData.metodoPago}
                    onValueChange={(value) =>
                      setPagoData({ ...pagoData, metodoPago: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Transferencia">Transferencia</SelectItem>
                      <SelectItem value="Tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                      <SelectItem value="Efectivo">Efectivo</SelectItem>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="referencia">Referencia / Número de Transacción</Label>
                  <Input
                    id="referencia"
                    value={pagoData.referencia}
                    onChange={(e) =>
                      setPagoData({ ...pagoData, referencia: e.target.value })
                    }
                    placeholder="Ej: TRF-123456"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">Confirmar Pago</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
