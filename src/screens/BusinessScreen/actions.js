import { useState } from 'react';
import { useClientGet, useClientSaveData, useAgreementsGet } from '../../hooks';
import { useNotify } from '../../utils';
import { format } from 'rut.js';
const data = {
  nombre: '',
  rut: '',
  domicilio: '',
  razon_social: '',
  ciudad: '',
  telefono: '',
  convenio: '',
};
const Action = () => {
  const [values, setValues] = useState(data);
  const { data: Clients, isLoading, error } = useClientGet();
  const {
    data: Agreements,
    isLoading: isLoadingAgreement,
    error: errorAgreement,
  } = useAgreementsGet();
  const { saveData, errorUserPost, isLoadingUserPost } = useClientSaveData();

  useNotify(error, 'error', 'Error Obteniendo los datos');

  useNotify(errorAgreement, 'error', 'Error Obteniendo los datos');

  useNotify(errorUserPost, 'error', 'Error Creando o Editando Clientes');

  const { nombre, rut, domicilio, razon_social, ciudad, telefono, convenio } =
    values || {};

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: prop === 'rut' ? format(event.target.value) : event.target.value,
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
    Clients,
    Agreements,
    nombre,
    rut,
    domicilio,
    razon_social,
    ciudad,
    telefono,
    convenio,
    handleChange,
    SaveData,
    reset,
    setValues,
    loading: isLoading || isLoadingUserPost || isLoadingAgreement,
  };
};

export default Action;
