import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Badge,
  Divider,
  IconButton,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { AppBar, DataTable, DropZone, Loader } from '../../componets';
import { useAgreementsDestroy, useAgreementsBulkSaveData } from '../../hooks';
import { useNotify } from '../../utils';
import { DateTime } from 'luxon';

const RegisterMovements = ({
  numIdentity,
  nombre,
  descripcion,
  archivo,
  handleChange,
  SaveData,
  reset,
  handleimg,
}) => {
  return (
    <Box w="100%">
      <Stack p={3} spacing={2}>
        <Heading textAlign={'center'} as="h4" size="md">
          Registro de Convenios
        </Heading>
        <Divider />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Identificador:
            <Badge ml="2" fontSize="0.9em" colorScheme="yellow">
              {numIdentity}
            </Badge>
          </Text>
        </Box>
        <Box>
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <Input
            id="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={handleChange('nombre')}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
          <Input
            id="descripcion"
            placeholder="Descripcion"
            value={descripcion}
            onChange={handleChange('descripcion')}
          />
        </Box>

        <DropZone
          name={'Archivo'}
          placeholder="Archivo"
          handleChange={handleimg}
          value={archivo}
        >
          Archivo
        </DropZone>

        <Divider />
        <HStack justifyContent={'end'} spacing={2}>
          <Button backgroundColor="primary" color="black" onClick={SaveData}>
            Guardar Convenio
          </Button>
          <Button onClick={reset}>Limpiar</Button>
        </HStack>
      </Stack>
    </Box>
  );
};

const View = ({
  Agreements,
  nombre,
  descripcion,
  archivo,
  handleChange,
  SaveData,
  reset,
  setValues,
  loading,
  handleimg,
}) => {
  const { destroy, error, isLoading } = useAgreementsDestroy();
  const {
    saveData,
    error: ErrorBulk,
    isLoading: loadingBulk,
  } = useAgreementsBulkSaveData();

  useNotify(ErrorBulk, 'error', 'Error insertando los Automoviles', 'ws');
  useNotify(error, 'error', 'Error eliminando Convenio');

  const updateChange = id => {
    const resultado = Agreements.find(item => item.id === id);
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
      Header: 'Descripcion',
      accessor: 'descripcion',
    },
    {
      Header: 'Archivo',
      accessor: 'archivo',
      Cell: data => {
        return data.row.original.archivo ? (
          <Link
            href={`http://127.0.0.1:8000/storage/convenios/${data.row.original.archivo}`}
            color={'blue'}
            isExternal
          >
            Ver <ExternalLinkIcon mx="2px" />
          </Link>
        ) : (
          ''
        );
      },
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

  if (loading || isLoading || loadingBulk) {
    return <Loader />;
  }

  return (
    <Box>
      <AppBar />
      <Box p={5} h={'100%'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} h={'100%'} spacing={5}>
          <Box h="100%">
            <VStack h="100%" spacing={5}>
              <Box
                border={'1px solid'}
                borderColor="gray.200"
                h={'auto'}
                w="100%"
                borderRadius={'xl'}
              >
                <RegisterMovements
                  numIdentity={Agreements?.length + 1}
                  nombre={nombre}
                  descripcion={descripcion}
                  archivo={archivo}
                  handleChange={handleChange}
                  SaveData={SaveData}
                  reset={reset}
                  setValues={setValues}
                  handleimg={handleimg}
                />
              </Box>
            </VStack>
          </Box>
          <Box h="100%">
            <DataTable
              title={'Convenio'}
              column={COLUMNS}
              row={Agreements}
              saveData={saveData}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default View;
