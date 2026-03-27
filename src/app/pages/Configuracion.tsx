import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
// import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import { Building2, Mail, Bell, Lock, Palette } from "lucide-react";

export function Configuracion() {
  const [empresaData, setEmpresaData] = useState({
    nombre: "Servicios Digitales Pro",
    rut: "76.123.456-7",
    direccion: "Av. Providencia 1234, Santiago",
    telefono: "+56 9 1234 5678",
    email: "contacto@serviciosdigitales.cl",
    sitioWeb: "www.serviciosdigitales.cl",
  });

  const [emailConfig, setEmailConfig] = useState({
    servidor: "smtp.gmail.com",
    puerto: "587",
    usuario: "notificaciones@serviciosdigitales.cl",
    ssl: true,
  });

  const [notificaciones, setNotificaciones] = useState({
    emailNuevoCliente: true,
    emailNuevoServicio: true,
    emailCobroPendiente: true,
    emailCobroVencido: true,
    emailPagoRecibido: true,
    diasAnticipacionCobro: 7,
  });

  const handleSaveEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configuración de empresa guardada correctamente");
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configuración de email guardada correctamente");
  };

  const handleSaveNotificaciones = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configuración de notificaciones guardada correctamente");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Configuración</h1>
        <p className="text-gray-600 mt-2">
          Configura los parámetros del sistema
        </p>
      </div>

      <Tabs defaultValue="empresa" className="space-y-4">
        <TabsList>
          <TabsTrigger value="empresa" className="gap-2">
            <Building2 className="w-4 h-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="gap-2">
            <Lock className="w-4 h-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="apariencia" className="gap-2">
            <Palette className="w-4 h-4" />
            Apariencia
          </TabsTrigger>
        </TabsList>

        {/* Configuración de Empresa */}
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveEmpresa}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre de la Empresa</Label>
                    <Input
                      id="nombre"
                      value={empresaData.nombre}
                      onChange={(e) =>
                        setEmpresaData({ ...empresaData, nombre: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="rut">RUT</Label>
                    <Input
                      id="rut"
                      value={empresaData.rut}
                      onChange={(e) =>
                        setEmpresaData({ ...empresaData, rut: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      value={empresaData.direccion}
                      onChange={(e) =>
                        setEmpresaData({ ...empresaData, direccion: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={empresaData.telefono}
                      onChange={(e) =>
                        setEmpresaData({ ...empresaData, telefono: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={empresaData.email}
                      onChange={(e) =>
                        setEmpresaData({ ...empresaData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="sitioWeb">Sitio Web</Label>
                    <Input
                      id="sitioWeb"
                      value={empresaData.sitioWeb}
                      onChange={(e) =>
                        setEmpresaData({ ...empresaData, sitioWeb: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="submit">Guardar Cambios</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuración de Email */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Email (SMTP)</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveEmail}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="servidor">Servidor SMTP</Label>
                    <Input
                      id="servidor"
                      value={emailConfig.servidor}
                      onChange={(e) =>
                        setEmailConfig({ ...emailConfig, servidor: e.target.value })
                      }
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="puerto">Puerto</Label>
                    <Input
                      id="puerto"
                      value={emailConfig.puerto}
                      onChange={(e) =>
                        setEmailConfig({ ...emailConfig, puerto: e.target.value })
                      }
                      placeholder="587"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="usuario">Usuario</Label>
                    <Input
                      id="usuario"
                      type="email"
                      value={emailConfig.usuario}
                      onChange={(e) =>
                        setEmailConfig({ ...emailConfig, usuario: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Switch
                      id="ssl"
                      checked={emailConfig.ssl}
                      onCheckedChange={(checked) =>
                        setEmailConfig({ ...emailConfig, ssl: checked })
                      }
                    />
                    <Label htmlFor="ssl">Usar SSL/TLS</Label>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button type="submit">Guardar Cambios</Button>
                  <Button type="button" variant="outline">
                    Probar Conexión
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuración de Notificaciones */}
        <TabsContent value="notificaciones">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotificaciones}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNuevoCliente">
                        Nuevo Cliente Registrado
                      </Label>
                      <p className="text-sm text-gray-500">
                        Recibir email cuando se registra un nuevo cliente
                      </p>
                    </div>
                    <Switch
                      id="emailNuevoCliente"
                      checked={notificaciones.emailNuevoCliente}
                      onCheckedChange={(checked) =>
                        setNotificaciones({
                          ...notificaciones,
                          emailNuevoCliente: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNuevoServicio">Nuevo Servicio Creado</Label>
                      <p className="text-sm text-gray-500">
                        Recibir email cuando se crea un nuevo servicio
                      </p>
                    </div>
                    <Switch
                      id="emailNuevoServicio"
                      checked={notificaciones.emailNuevoServicio}
                      onCheckedChange={(checked) =>
                        setNotificaciones({
                          ...notificaciones,
                          emailNuevoServicio: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailCobroPendiente">Cobro Pendiente</Label>
                      <p className="text-sm text-gray-500">
                        Recibir email cuando hay un cobro próximo a vencer
                      </p>
                    </div>
                    <Switch
                      id="emailCobroPendiente"
                      checked={notificaciones.emailCobroPendiente}
                      onCheckedChange={(checked) =>
                        setNotificaciones({
                          ...notificaciones,
                          emailCobroPendiente: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailCobroVencido">Cobro Vencido</Label>
                      <p className="text-sm text-gray-500">
                        Recibir email cuando un cobro está vencido
                      </p>
                    </div>
                    <Switch
                      id="emailCobroVencido"
                      checked={notificaciones.emailCobroVencido}
                      onCheckedChange={(checked) =>
                        setNotificaciones({
                          ...notificaciones,
                          emailCobroVencido: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailPagoRecibido">Pago Recibido</Label>
                      <p className="text-sm text-gray-500">
                        Recibir email cuando se registra un pago
                      </p>
                    </div>
                    <Switch
                      id="emailPagoRecibido"
                      checked={notificaciones.emailPagoRecibido}
                      onCheckedChange={(checked) =>
                        setNotificaciones({
                          ...notificaciones,
                          emailPagoRecibido: checked,
                        })
                      }
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Label htmlFor="diasAnticipacion">
                      Días de Anticipación para Cobros
                    </Label>
                    <Input
                      id="diasAnticipacion"
                      type="number"
                      className="mt-2 max-w-xs"
                      value={notificaciones.diasAnticipacionCobro}
                      onChange={(e) =>
                        setNotificaciones({
                          ...notificaciones,
                          diasAnticipacionCobro: Number(e.target.value),
                        })
                      }
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Con cuántos días de anticipación notificar sobre cobros próximos
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="submit">Guardar Cambios</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuración de Seguridad */}
        <TabsContent value="seguridad">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Contraseña actualizada correctamente");
                  }}
                >
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="currentPassword">Contraseña Actual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button type="submit">Actualizar Contraseña</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sesiones Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Sesión Actual</p>
                      <p className="text-sm text-gray-500">
                        Santiago, Chile • Chrome en Windows
                      </p>
                    </div>
                    <span className="text-sm text-green-600">Activa</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Cerrar Todas las Sesiones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configuración de Apariencia */}
        <TabsContent value="apariencia">
          <Card>
            <CardHeader>
              <CardTitle>Personalización de la Interfaz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>Color Principal</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-12 h-12 rounded-lg bg-[#54EBA3] border-2 border-gray-300" />
                    <div>
                      <p className="font-medium">#54EBA3</p>
                      <p className="text-sm text-gray-500">Verde Actual</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="logo">Logo de la Empresa</Label>
                  <div className="mt-2">
                    <Input id="logo" type="file" accept="image/*" />
                    <p className="text-sm text-gray-500 mt-2">
                      Tamaño recomendado: 200x50px
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Guardar Cambios</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
