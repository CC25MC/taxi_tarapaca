import { atom } from 'jotai';
export const listArticles = atom([]);
export const PERSISTOR_KEYS = {
  user: 'user',
  auth: 'auth',
};

// export const titles = {
//   '/inicio': 'Contratos',
//   '/configuracion': 'Configuración',
//   '/withdrawal': 'Withdrawal',
// }

export const download = {
  '/inicio/movimientos': 'importar_movimientos.xlsx',
  '/inicio/servicios': 'importar_servicios.xlsx',
  '/inicio/empresa': 'importar_empresa.xlsx',
  '/inicio/convenio': 'importar_convenio.xlsx',
  '/inicio/usuarios': 'importar_usuarios.xlsx',
  '/inicio/moviles': 'importar_moviles.xlsx',
};

export const exportName = {
  '/inicio/movimientos': 'movimientos.xlsx',
  '/inicio/servicios': 'servicios.xlsx',
  '/inicio/empresa': 'empresa.xlsx',
  '/inicio/convenio': 'convenio.xlsx',
  '/inicio/usuarios': 'usuarios.xlsx',
  '/inicio/moviles': 'moviles.xlsx',
};

export const dataexcelUser = [
  {
    codebar: '123515',
    sku: '0001',
    nombre: 'pan',
    descripcion: 'Bimbo',
    unidades: 1000,
    precio: 2000,
  },
  {
    codebar: '1235545',
    sku: '0002',
    nombre: 'arroz',
    descripcion: 'el gran marquez',
    unidades: 1000,
    precio: 2500,
  },
];
export const dataexcelMovements = [
  {
    nombre: 'Gustavo',
    fecha_serv: '2022-07-13',
    hora_serv: '08:00',
    domicilio: 'HOla',
    telefono: '04140541782',
    observaciones: 'HOla Servicio lo mas rapido posible',
    servicio: 'HOla',
    convenio: 'Ninguno',
    estado: null,
    movil: null,
  },
  {
    nombre: 'Gustavo',
    fecha_serv: '2022-07-13',
    hora_serv: '08:00',
    domicilio: 'HOla',
    telefono: '04140541782',
    observaciones: 'HOla Servicio lo mas rapido posible',
    servicio: 'HOla',
    convenio: 'Ninguno',
    estado: null,
    movil: null,
  },
];
export const dataexcelBusiness = [
  {
    codebar: '123515',
    sku: '0001',
    nombre: 'pan',
    descripcion: 'Bimbo',
    unidades: 1000,
    precio: 2000,
  },
  {
    codebar: '1235545',
    sku: '0002',
    nombre: 'arroz',
    descripcion: 'el gran marquez',
    unidades: 1000,
    precio: 2500,
  },
];
export const dataexcelAgreement = [
  {
    codebar: '123515',
    sku: '0001',
    nombre: 'pan',
    descripcion: 'Bimbo',
    unidades: 1000,
    precio: 2000,
  },
  {
    codebar: '1235545',
    sku: '0002',
    nombre: 'arroz',
    descripcion: 'el gran marquez',
    unidades: 1000,
    precio: 2500,
  },
];
export const dataexcelService = [
  {
    nombre: 'Cesar',
    direccion: 'pora ahi',
    correo: 'datos',
    telefono: 4140512,
    rut: 2776510,
    notas: 'notas',
  },
  {
    nombre: 'Cesar',
    direccion: 'pora ahi',
    correo: 'datos',
    telefono: 4140512,
    rut: 2776510,
    notas: 'notas',
  },
];

export const dataexcelMoviles = [
  {
    nombre: 'Cesar',
    direccion: 'pora ahi',
    correo: 'datos',
    telefono: 4140512,
    rut: 2776510,
    bank: 'Banco',
    notas: 'notas',
  },
  {
    nombre: 'Cesar',
    direccion: 'pora ahi',
    correo: 'datos',
    telefono: 4140512,
    rut: 2776510,
    bank: 'Banco',
    notas: 'notas',
  },
];

export const filedownload = {
  '/inicio/servicios': dataexcelService,
  '/inicio/movimientos': dataexcelMovements,
  '/inicio/moviles': dataexcelMoviles,
  '/inicio/convenio': dataexcelAgreement,
  '/inicio/usuarios': dataexcelUser,
  '/inicio/empresa': dataexcelBusiness,
};
