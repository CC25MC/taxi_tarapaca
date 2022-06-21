import { useState } from 'react';
import { useUserGet, useUserSaveData } from '../../hooks';
import { useNotify } from '../../utils';

const data = {
  name: '',
  email: '',
  role: 2,
  password: '',
  password_confirmation: '',
};
const Action = () => {
  const [values, setValues] = useState(data);
  const { data: users, error, isLoading } = useUserGet();
  const { saveData, errorUserPost, isLoadingUserPost } = useUserSaveData();

  useNotify(
    errorUserPost,
    'error',
    errorUserPost?.response?.data?.message
  );
  useNotify(error, 'error', 'Error Obteniendo Usuarios');

  const { name, email, role, password, password_confirmation } = values || {};
  
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
    name,
    email,
    role,
    password,
    password_confirmation,
    handleChange,
    SaveData,
    reset,
    setValues,
    values,
    loading: isLoading || isLoadingUserPost,
    users,
  };
};

export default Action;
