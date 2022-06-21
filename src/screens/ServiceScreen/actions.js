import { useState } from 'react';
import { useServiceGet, useServiceSaveData } from '../../hooks';
import { useNotify } from '../../utils';

const data = {
  nombre: '',
  aviso: '',
  valor: '',
  color: '',
  estado: '',
};
const Action = () => {
  const [values, setValues] = useState(data);
  const { data: Services, isLoading, error } = useServiceGet();
  const { saveData, errorUserPost, isLoadingUserPost } = useServiceSaveData();

  useNotify(error, 'error', 'Error Obteniendo los datos');

  useNotify(errorUserPost, 'error', 'Error Creando o Editando Moviles');

  const { nombre, aviso, valor, color, estado } = values || {};

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: prop === 'color' ? event : event.target.value,
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
    Services,
    nombre,
    aviso,
    valor,
    color,
    estado,
    handleChange,
    SaveData,
    reset,
    setValues,
    loading: isLoading || isLoadingUserPost,
  };
};

export default Action;
