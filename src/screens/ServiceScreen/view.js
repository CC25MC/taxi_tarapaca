import {
  Box,
  SimpleGrid,
  HStack,
  FormLabel,
  Input,
  Stack,
  Select,
  Button,
  Heading,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { AppBar, DataTable, Loader } from '../../componets';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useServiceDestroy } from '../../hooks';
import { useNotify } from '../../utils';
import { HexColorPicker } from 'react-colorful';
import { DateTime } from 'luxon';
import './style.css';

const RegisterClient = ({
  nombre,
  aviso,
  valor,
  color,
  estado,
  handleChange,
  SaveData,
  reset,
}) => {
  return (
    <Box border="1px" borderColor={'gray.200'} borderRadius="xl">
      <Stack p={3} spacing={2}>
        <Heading textAlign={'center'} as="h4" size="md">
          Registrar Servicio
        </Heading>
        <Divider />
        <Box>
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <Input
            id="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={handleChange('nombre')}
          />
        </Box>
        <Box className="resposive example">
          <FormLabel htmlFor="color">Color</FormLabel>

          <HexColorPicker color={color} onChange={handleChange('color')} />
        </Box>

        <Box>
          <FormLabel htmlFor="valor">Valor </FormLabel>
          <Input
            id="valor"
            placeholder="Valor"
            value={valor}
            onChange={handleChange('valor')}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="estado">Estado</FormLabel>
          <Select id="estado" value={estado} onChange={handleChange('estado')}>
            <option value={''}>Seleccionar Opciones</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </Select>
        </Box>
        <Box>
          <FormLabel htmlFor="aviso">Aviso</FormLabel>
          <Select id="aviso" value={aviso} onChange={handleChange('aviso')}>
            <option value={''}>Seleccionar Opciones</option>
            <option value="10">10 Minutos</option>
            <option value="15">15 Minutos</option>
            <option value="25">25 Minutos</option>
            <option value="30">30 Minutos</option>
            <option value="40">40 Minutos</option>
            <option value="50">50 Minutos</option>
            <option value="60">60 Minutos</option>
          </Select>
        </Box>
        <Divider />

        <HStack justifyContent={'end'} spacing={2}>
          <Button backgroundColor="primary" color="black" onClick={SaveData}>
            Guardar Servicio
          </Button>
          <Button onClick={reset}>Limpiar</Button>
        </HStack>
      </Stack>
    </Box>
  );
};

const View = ({
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
  loading,
}) => {
  const { destroy, error, isLoading } = useServiceDestroy();

  useNotify(error, 'error', 'Error eliminando Servicios');

  const updateChange = id => {
    const resultado = Services.find(item => item.id === id);
    if (resultado) {
      setValues(resultado);
    }
  };

  const COLUMNS = [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Aviso',
      accessor: 'aviso',
      Cell: data => {
        return (
          data.row.original.aviso + "Min"
        );
      },
    },
    {
      Header: 'Valor',
      accessor: 'valor',
    },
    {
      Header: 'Color',
      accessor: 'color',
      Cell: data => {
        return (
          <Box
            width={'30px'}
            height={'30px'}
            background={data.row.original.color}
            borderRadius={5}
          />
        );
      },
    },
    {
      Header: 'Estado',
      accessor: 'estado',
    },
    {
      Header: 'Fecha',
      accessor: 'created_at',
      Cell: data => {
        return DateTime.fromISO(data.row.original.created_at).toLocaleString(DateTime.DATE_FULL);
      },
    },
    {
      Header: 'Acciones',
      Cell: data => {
        return (
          <Box>
            <IconButton
              colorScheme="blue"
              m={1}
              icon={<EditIcon />}
              onClick={() => updateChange(data.row.original.id)}
            />
            <IconButton
              colorScheme="red"
              m={1}
              icon={<DeleteIcon />}
              onClick={() => destroy(data.row.original.id)}
            />
          </Box>
        );
      },
    },
  ];

  if (loading || isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <AppBar />
      <Box p={5} h={'100%'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} h={'100%'} spacing={5}>
          <Box>
            <RegisterClient
              nombre={nombre}
              aviso={aviso}
              valor={valor}
              color={color}
              estado={estado}
              handleChange={handleChange}
              SaveData={SaveData}
              reset={reset}
            />
          </Box>
          <Box>
            <DataTable
              title={'Servicios'}
              row={Services}
              column={COLUMNS}
              h={'auto'}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default View;
