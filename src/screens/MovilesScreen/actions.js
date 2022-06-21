import { useState } from 'react';
import { useAutomobilesGet, useAutomobilesSaveData } from '../../hooks';
import { useNotify } from '../../utils';

const data = {
  nombre: '',
  numero: '',
  patente: '',
  modelo: '',
  marca: '',
  tipo: '',
  color: '',
  telefono: '',
  direccion: '',
  estado: '',
};
const Action = () => {
  const [values, setValues] = useState(data);
  const { data: Automobiles, isLoading, error } = useAutomobilesGet();
  const { saveData, errorUserPost, isLoadingUserPost } =
    useAutomobilesSaveData();

  useNotify(error, 'error', 'Error Obteniendo los datos');

  useNotify(errorUserPost, 'error', 'Error Creando o Editando Moviles');

  const {
    nombre,
    numero,
    patente,
    modelo,
    marca,
    tipo,
    color,
    telefono,
    direccion,
    estado,
  } = values || {};

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const SaveData = () => {
    saveData(values);
    setValues(data);
  };
  const reset = () => {
    setValues(data);
  };
  return {
    Automobiles,
    nombre,
    numero,
    patente,
    modelo,
    marca,
    tipo,
    color,
    telefono,
    direccion,
    estado,
    handleChange,
    SaveData,
    reset,
    setValues,
    loading: isLoading || isLoadingUserPost,
  };
};

export default Action;
