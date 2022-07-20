import { atom } from 'jotai';
export const listArticles = atom([]);
export const PERSISTOR_KEYS = {
  user: 'user',
  auth: 'auth',
};

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
    name: 'Jose Luis',
    email: 'cesar@gmail.com',
    role: '0',
    password: 'Bimbo',
    created_at: '2022-07-13',
  },
  {
    name: 'Cristo',
    email: 'miguel@gmail.com',
    role: '1',
    password: '123456',
    created_at: '2022-07-13',
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
    created_at: '2022-07-13',
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
    created_at: '2022-07-13',
  },
];
export const dataexcelBusiness = [
  {
    nombre: 'cesar',
    domicilio: 'araure',
    rut: '27276551-0',
    razon_social: 'compra',
    convenio: 'aereo',
    ciudad: 'iquique',
    telefono: '04140541782',
    created_at: '2022-07-13',
  },
  {
    nombre: 'cesar',
    domicilio: 'araure',
    rut: '27276551-0',
    razon_social: 'compra',
    convenio: 'aereo',
    ciudad: 'iquique',
    telefono: '04140541782',
    created_at: '2022-07-13',
  },
];
export const dataexcelAgreement = [
  {
    nombre: 'Cristo',
    descripcion: 'dale guaya',
    archivo: '',
    created_at: '2022-07-13',
  },
  {
    nombre: 'Cristo',
    descripcion: 'dale guaya',
    archivo: '',
    created_at: '2022-07-13',
  },
];
export const dataexcelService = [
  {
    nombre: 'Cesar',
    aviso: '10',
    valor: 'datos',
    color: '#FFFFFF',
    estado: 'Activo',
    created_at: '2022-07-13',
  },
  {
    nombre: 'Jose Luis',
    aviso: '10',
    valor: 'datos',
    color: '#FFFFFF',
    estado: 'Inactivo',
    created_at: '2022-07-13',
  },
];

export const dataexcelMoviles = [
  {
    nombre: 'Corsa',
    numero: '145265',
    patente: '251516',
    modelo: 'convertible',
    marca: 'chevrolet',
    tipo: 'convertible',
    color: 'Rojo',
    telefono: '0414524541',
    direccion: 'aeropuerto',
    estado: 'activo',
    created_at: '2022-07-13',
  },
  {
    nombre: 'Corsa',
    numero: '145265',
    patente: '251516',
    modelo: 'convertible',
    marca: 'chevrolet',
    tipo: 'convertible',
    color: 'Rojo',
    telefono: '0414524541',
    direccion: 'aeropuerto',
    estado: 'activo',
    created_at: '2022-07-13',
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
