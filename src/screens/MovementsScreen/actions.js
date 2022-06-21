import { useState } from 'react';
import {
  useMovementsGet,
  useMovementsSaveData,
  useAgreementsGet,
  useServiceGet,
  useAutomobilesGet,
} from '../../hooks';
import { useNotify } from '../../utils';
const data = {
  nombre: '',
  fecha_serv: '',
  hora_serv: '',
  hora: '',
  domicilio: '',
  telefono: '',
  observaciones: '',
  servicio: '',
  convenio: '',
};
const Action = () => {
  const [values, setValues] = useState(data);
  const { data: Movements, isLoading, error } = useMovementsGet();
  
  const {
    data: Automobiles,
    isLoading: isLoadingAutomobiles,
    error: errorAutomobiles,
  } = useAutomobilesGet();

  const {
    data: Agreements,
    isLoading: isLoadingAgreement,
    error: errorAgreement,
  } = useAgreementsGet(); 

  const {
    data: Services,
    isLoading: isLoadingServices,
    error: errorServices,
  } = useServiceGet();

  const { saveData, errorUserPost, isLoadingUserPost } = useMovementsSaveData();

  useNotify(error, 'error', 'Error Obteniendo los Movimientos');

  useNotify(errorServices, 'error', 'Error Obteniendo los Servicios');

  useNotify(errorAutomobiles, 'error', 'Error Obteniendo los Automoviles');

  useNotify(errorAgreement, 'error', 'Error Obteniendo los Convenios');

  useNotify(errorUserPost, 'error', 'Error Creando o Editando Movimientos');

  const {
    nombre,
    fecha_serv,
    hora_serv,
    hora,
    domicilio,
    telefono,
    observaciones,
    servicio,
    convenio,
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
  const updateState = value => {
    saveData({ ...values, estado: value });
  };
  const reset = () => {
    setValues(data);
  };
  return {
    Movements,
    Automobiles,
    Agreements,
    Services,
    nombre,
    fecha_serv,
    hora_serv,
    hora,
    domicilio,
    telefono,
    observaciones,
    servicio,
    convenio,
    handleChange,
    SaveData,
    reset,
    setValues,
    values,
    updateState,
    loading:
      isLoading ||
      isLoadingUserPost ||
      isLoadingAgreement ||
      isLoadingServices ||
      isLoadingAutomobiles,
  };
};

export default Action;
