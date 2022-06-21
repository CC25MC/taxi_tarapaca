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
import { useClientDestroy } from '../../hooks';
import { useNotify } from '../../utils';
import { DateTime } from 'luxon';

const RegisterClient = ({
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
}) => {
  return (
    <Box>
      <Stack p={3} spacing={2}>
        <Heading textAlign={'center'} as="h4" size="md">
          Registrar Empresa
        </Heading>
        <Divider />
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="rut">Rut</FormLabel>
            <Input
              id="rut"
              placeholder="Patente"
              value={rut}
              onChange={handleChange('rut')}
            />
          </Box>
          <Box w={'50%'}>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={handleChange('nombre')}
            />
          </Box>
        </Stack>
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="domicilio">Domicilio</FormLabel>
            <Input
              id="domicilio"
              placeholder="Domicilio"
              value={domicilio}
              onChange={handleChange('domicilio')}
            />
          </Box>
          <Box w={'50%'}>
            <FormLabel htmlFor="razon_social">Razón Social</FormLabel>
            <Input
              id="razon_social"
              placeholder="Razón Social"
              value={razon_social}
              onChange={handleChange('razon_social')}
            />
          </Box>
        </Stack>
        <Stack direction="row">
          <Box w={'50%'}>
            <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
            <Input
              id="ciudad"
              placeholder="Ciudad"
              value={ciudad}
              onChange={handleChange('ciudad')}
            />
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
            <FormLabel htmlFor="convenio">Convenio</FormLabel>
            <Select
              id="convenio"
              value={convenio}
              onChange={handleChange('convenio')}
            >
              <option value={''}>Seleccionar Opciones</option>
              {Agreements.map((item, key) => (
                <option key={key} value={item?.nombre}>
                  {item?.nombre}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
        <HStack justifyContent={'end'} spacing={2}>
          <Button backgroundColor="primary" color="black" onClick={SaveData}>
            Guardar Empresa
          </Button>
          <Button onClick={reset}>Limpiar</Button>
        </HStack>
      </Stack>
    </Box>
  );
};
// const SearchBussines = () => {
//   return (
//     <Box>
//       <Stack p={3} spacing={2}>
//         <Heading textAlign={'center'} as="h4" size="md">
//           Busqueda de Empresas
//         </Heading>
//         <Divider />
//         <Stack direction="row">
//           <Box w={'50%'}>
//             <FormLabel htmlFor="date">Palabra</FormLabel>
//             <Input id="date" placeholder="Patente" />
//           </Box>
//           <Box w={'50%'}>
//             <FormLabel htmlFor="role">Rut</FormLabel>
//             <Select id="role">
//               <option value="user">Usuario</option>
//               <option value="admin">Administrador</option>
//             </Select>
//           </Box>
//         </Stack>
//         <HStack justifyContent={'end'} spacing={2}>
//           <Button backgroundColor="primary" color="black">
//             Realizar Busqueda
//           </Button>
//         </HStack>
//       </Stack>
//     </Box>
//   );
// };
const View = ({
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
  loading,
}) => {
  const { destroy, error, isLoading } = useClientDestroy();

  useNotify(error, 'error', 'Error eliminando Moviles');

  const updateChange = id => {
    const resultado = Clients.find(item => item.id === id);
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
      Header: 'Domicilio',
      accessor: 'domicilio',
    },
    {
      Header: 'Telefono',
      accessor: 'telefono',
    },
    {
      Header: 'Ciudad',
      accessor: 'ciudad',
    },
    {
      Header: 'Rut',
      accessor: 'rut',
    },
    {
      Header: 'Razón Social',
      accessor: 'razon_social',
    },
    {
      Header: 'Convenio',
      accessor: 'convenio',
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
        <SimpleGrid columns={{ base: 1, md: 2 }} h={'50%'} spacing={5}>
          <Box
            w="100%"
            h={'100%'}
            border="1px"
            borderColor={'gray.200'}
            borderRadius="xl"
          >
            <RegisterClient
              Agreements={Agreements}
              nombre={nombre}
              rut={rut}
              domicilio={domicilio}
              razon_social={razon_social}
              ciudad={ciudad}
              telefono={telefono}
              convenio={convenio}
              handleChange={handleChange}
              SaveData={SaveData}
              reset={reset}
            />
          </Box>

          <Box>
            <DataTable
              title={'Empresa'}
              h={'auto'}
              column={COLUMNS}
              row={Clients}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default View;
