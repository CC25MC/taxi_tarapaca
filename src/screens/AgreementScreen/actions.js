import { useState } from 'react';
import { useAgreementsGet, useAgreementsSaveData } from '../../hooks';
import { useNotify } from '../../utils';

const data = {
  nombre: '',
  descripcion: '',
  archivo: '',
};
const Action = () => {
  const [values, setValues] = useState(data);
  const { data: Agreements, isLoading, error } = useAgreementsGet();
  const { saveData, errorUserPost, isLoadingUserPost } =
    useAgreementsSaveData();

  useNotify(error, 'error', 'Error Obteniendo los datos');
  useNotify(errorUserPost, 'error', 'Error Creando o Editando Convenio');
  const { nombre, descripcion, archivo } = values || {};

  const handleimg = prop => event => {
    setValues({ ...values, [prop]: event.target.files[0] });
  };

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const SaveData = () => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);

    if (values?.id) {
      saveData(values);
    } else {
      saveData(formData);
    }
    setValues(data);
  };
  const reset = () => {
    setValues(data);
  };
  return {
    Agreements,
    nombre,
    descripcion,
    archivo,
    handleChange,
    handleimg,
    SaveData,
    reset,
    setValues,
    loading: isLoading || isLoadingUserPost,
  };
};

export default Action;
