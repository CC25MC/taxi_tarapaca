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
  Text,
  Badge,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { AppBar, DataTable, Loader } from '../../componets';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useAutomobilesDestroy } from '../../hooks';
import { useNotify } from '../../utils';
import { DateTime } from 'luxon';

const RegisterMovements = ({
  numIdentity,
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
}) => {
  return (
    <Box w="100%">
      <Stack p={3} spacing={2}>
        <Heading textAlign={'center'} as="h4" size="md">
          Registro de Moviles
        </Heading>
        <Divider />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Numero de movil:
            <Badge ml="2" fontSize="0.9em" colorScheme="yellow">
              {numIdentity}
            </Badge>
          </Text>
        </Box>
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="patente">Patente</FormLabel>
            <Input
              id="patente"
              placeholder="Patente"
              value={patente}
              onChange={handleChange('patente')}
            />
          </Box>
          <Box w={'50%'}>
            <FormLabel htmlFor="nombre">Nombre Movil</FormLabel>
            <Input
              id="nombre"
              placeholder="Nombre Movil"
              value={nombre}
              onChange={handleChange('nombre')}
            />
          </Box>
        </Stack>
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="estado">Estado</FormLabel>
            <Select
              id="estado"
              value={estado}
              onChange={handleChange('estado')}
            >
              <option value={''}>Seleccionar Opciones</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </Select>
          </Box>
          <Box w={'50%'}>
            <FormLabel htmlFor="telefono">Telefono</FormLabel>
            <Input
              id="telefono"
              placeholder="Telefono"
              value={telefono}
              onChange={handleChange('telefono')}
            />
          </Box>
        </Stack>
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="direccion">Dirección</FormLabel>
            <Input
              id="direccion"
              placeholder="Dirección"
              value={direccion}
              onChange={handleChange('direccion')}
            />
          </Box>
          <Box w={'50%'}>
            <FormLabel htmlFor="tipo">Tipo de Auto</FormLabel>
            <Input
              id="tipo"
              placeholder="Tipo de Auto"
              value={tipo}
              onChange={handleChange('tipo')}
            />
          </Box>
        </Stack>
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="color">Color del Movil</FormLabel>
            <Input
              id="color"
              placeholder="Color del Movil"
              value={color}
              onChange={handleChange('color')}
            />
          </Box>
          <Box w={'50%'}>
            <FormLabel htmlFor="marca">Marca</FormLabel>
            <Input
              id="marca"
              placeholder="Marca"
              value={marca}
              onChange={handleChange('marca')}
            />
          </Box>
        </Stack>
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="modelo">Modelo</FormLabel>
            <Input
              id="modelo"
              placeholder="Modelo"
              value={modelo}
              onChange={handleChange('modelo')}
            />
          </Box>
          <Box w={'50%'}>
            <FormLabel htmlFor="numero">Número</FormLabel>
            <Input
              id="numero"
              placeholder="Número"
              value={numero}
              onChange={handleChange('numero')}
            />
          </Box>
        </Stack>

        <Divider />
        <HStack justifyContent={'end'} spacing={2}>
          <Button backgroundColor="primary" color="black" onClick={SaveData}>
            Guardar Moviles
          </Button>
          <Button onClick={reset}>Limpiar</Button>
        </HStack>
      </Stack>
    </Box>
  );
};

const View = ({
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
  loading,
}) => {
  const { destroy, error, isLoading } = useAutomobilesDestroy();

  useNotify(error, 'error', 'Error eliminando Moviles');

  const updateChange = id => {
    const resultado = Automobiles.find(item => item.id === id);
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
      Header: 'Numero',
      accessor: 'numero',
    },
    {
      Header: 'Patente',
      accessor: 'patente',
    },
    {
      Header: 'Modelo',
      accessor: 'modelo',
    },
    {
      Header: 'Marca',
      accessor: 'marca',
    },
    {
      Header: 'Tipo',
      accessor: 'tipo',
    },
    {
      Header: 'Color',
      accessor: 'color',
    },
    {
      Header: 'Telefono',
      accessor: 'telefono',
    },
    {
      Header: 'Dirección',
      accessor: 'direccion',
    },
    {
      Header: 'Estado',
      accessor: 'estado',
    },
    {
      Header: 'Fecha',
      accessor: 'created_at',
      Cell: data => {
        return DateTime.fromISO(data.row.original.created_at).toLocaleString(
          DateTime.DATE_FULL
        );
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
            <Box
              border={'1px solid'}
              borderColor="gray.200"
              h={'auto'}
              w="100%"
              borderRadius={'xl'}
            >
              <RegisterMovements
                numIdentity={Automobiles?.length + 1}
                nombre={nombre}
                numero={numero}
                patente={patente}
                modelo={modelo}
                marca={marca}
                tipo={tipo}
                color={color}
                telefono={telefono}
                direccion={direccion}
                estado={estado}
                handleChange={handleChange}
                SaveData={SaveData}
                reset={reset}
              />
            </Box>
          </Box>
          <Box>
            <DataTable
              title={'Moviles'}
              h={'auto'}
              column={COLUMNS}
              row={Automobiles}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default View;
