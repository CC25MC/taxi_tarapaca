import {
  Box,
  SimpleGrid,
  HStack,
  FormLabel,
  Input,
  Stack,
  Select,
  Button,
  Textarea,
  Heading,
  Text,
  Badge,
  Divider,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tag,
  Tr,
  Th,
  Td,
  // TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  AppBar,
  DataTable,
  CalendarStyled as Calendar,
  Loader,
} from '../../componets';
import { useMovementsDestroy, useMovementsBulkSaveData } from '../../hooks';
import { useNotify } from '../../utils';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { DateTime } from 'luxon';

const RegisterMovements = ({
  numIdentity,
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
}) => {
  return (
    <Stack p={3} spacing={2}>
      <Heading textAlign={'center'} as="h4" size="md">
        Registro de Movimientos
      </Heading>
      <Divider />
      <SimpleGrid columns={{ base: 1, md: 3 }} h={'50%'} spacing={3}>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Reserva:
            <Badge ml="2" fontSize="0.9em" colorScheme="yellow">
              {numIdentity}
            </Badge>
          </Text>
        </Box>
        <Box>
          <FormLabel htmlFor="date">Fecha del Servicio</FormLabel>
          <Input
            id="date"
            placeholder="Fecha"
            type={'date'}
            value={fecha_serv}
            onChange={handleChange('fecha_serv')}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="time">Hora del Servicio</FormLabel>
          <Input
            id="time"
            placeholder="Hora"
            type={'time'}
            value={hora_serv}
            onChange={handleChange('hora_serv')}
          />
        </Box>
      </SimpleGrid>
      <Divider />
      <SimpleGrid columns={{ base: 1, md: 3 }} h={'50%'} spacing={3}>
        <Box>
          <Input
            id="name"
            placeholder="Nombre"
            value={nombre}
            onChange={handleChange('nombre')}
          />
        </Box>
        <Box>
          <Input
            id="adress"
            placeholder="Domicilio"
            value={domicilio}
            onChange={handleChange('domicilio')}
          />
        </Box>
        <Box>
          <Input
            id="fono"
            placeholder="Fono"
            value={telefono}
            onChange={handleChange('telefono')}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="service">Servicios</FormLabel>
          <Select
            id="service"
            value={servicio}
            onChange={handleChange('servicio')}
          >
            <option value={''}>Seleccionar Opciones</option>
            {Services.map((item, key) => (
              <option key={key} value={item?.nombre}>
                {item?.nombre}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
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
        <Textarea
          placeholder="Observación"
          value={observaciones}
          onChange={handleChange('observaciones')}
        />
      </SimpleGrid>
      <Divider />
      <HStack justifyContent={'end'} spacing={2}>
        <Button backgroundColor="primary" color="black" onClick={SaveData}>
          Guardar Movimientos
        </Button>
        <Button onClick={reset}>Limpiar</Button>
      </HStack>
    </Stack>
  );
};

const View = ({
  Movements,
  Agreements,
  Automobiles,
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
  loading,
  values,
  updateState,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, onChange] = useState("")
  const { destroy, error, isLoading } = useMovementsDestroy();
  const { saveData, error: ErrorBulk, isLoading: loadingBulk } = useMovementsBulkSaveData();

  useNotify(error, 'error', 'Error eliminando Convenio');
  useNotify(ErrorBulk, 'error', 'Error insertando los movimientos', "ws");

  const updateChange = id => {
    const resultado = Movements.find(item => item.id === id);
    if (resultado) {
      setValues(resultado);
    }
  };

  const selectMovement = id => {
    onOpen();
    const resultado = Movements.find(item => item.id === id);
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
      Header: 'Servicio',
      accessor: 'servicio',
    },
    {
      Header: 'Convenio',
      accessor: 'convenio',
    },
    {
      Header: 'Fecha Servicio',
      accessor: 'fecha_serv',
    },
    {
      Header: 'Hora Servicio',
      accessor: 'hora_serv',
    },
    {
      Header: 'Domicilio',
      accessor: 'domicilio',
    },
    {
      Header: 'Fono',
      accessor: 'telefono',
    },
    {
      Header: 'Observaciones',
      accessor: 'observaciones',
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
            {data.row.original?.estado === null ? (
              <>
                <IconButton
                  colorScheme="blackAlpha"
                  m={1}
                  icon={<ViewIcon />}
                  onClick={() => selectMovement(data.row.original.id)}
                />
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
              </>
            ) : (
              <Tag
                size={'md'}
                variant="solid"
                colorScheme={data?.row?.original?.estado === 0 ? 'red' : 'green'}
              >
                {data.row.original?.estado === 0 ? 'Anulado' : 'Finalizado'}
              </Tag>
            )}
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
        <SimpleGrid columns={{ base: 1, md: 2 }} h={'50%'} spacing={5}>
          <Box
            w="100%"
            h={'100%'}
            border="1px"
            borderColor={'gray.200'}
            borderRadius="xl"
          >
            <RegisterMovements
              numIdentity={Movements?.length + 1}
              Agreements={Agreements}
              Services={Services}
              nombre={nombre}
              fecha_serv={fecha_serv}
              hora_serv={hora_serv}
              hora={hora}
              domicilio={domicilio}
              telefono={telefono}
              observaciones={observaciones}
              servicio={servicio}
              convenio={convenio}
              handleChange={handleChange}
              SaveData={SaveData}
              reset={reset}
            />
          </Box>

          <Box
            w="100%"
            h={'100%'}
            border="1px"
            borderColor={'gray.200'}
            borderRadius="xl"
          >
            <Calendar value={date} onChange={onChange} />
          </Box>
        </SimpleGrid>
        <Box marginTop={5} />

        <SimpleGrid columns={{ base: 1, md: 1 }} h={'50%'} spacing={5}>
          <DataTable
            title={'Movimientos'}
            column={COLUMNS}
            row={Movements}
            h={'auto'}
            search={date}
            saveData={saveData}
          />
        </SimpleGrid>
      </Box>
      <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Servicio Numero {values?.id} </ModalHeader>
          <ModalCloseButton onClick={reset} />
          <ModalBody>
            <Box border="1px" borderColor={'gray.200'} borderRadius="xl">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th colSpan={2} textAlign="center" fontSize={'md'}>
                        Datos del Cliente
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Nombre</Td>
                      <Td>{nombre}</Td>
                    </Tr>
                    <Tr>
                      <Td>Domicilio</Td>
                      <Td>{domicilio}</Td>
                    </Tr>
                    <Tr>
                      <Td>Telefono</Td>
                      <Td>{telefono}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box border="1px" borderColor={'gray.200'} borderRadius="xl" mt={3}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th colSpan={2} textAlign="center" fontSize={'md'}>
                        Servicio
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Tipo</Td>
                      <Td>{servicio}</Td>
                    </Tr>
                    <Tr>
                      <Td>Convenio</Td>
                      <Td> {convenio} </Td>
                    </Tr>
                    <Tr>
                      <Td>Fecha</Td>
                      <Td>{fecha_serv}</Td>
                    </Tr>
                    <Tr>
                      <Td>Hora</Td>
                      <Td>{hora_serv}</Td>
                    </Tr>
                    <Tr>
                      <Td>Observación</Td>
                      <Td>{observaciones}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box border="1px" borderColor={'gray.200'} borderRadius="xl" mt={3}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th colSpan={2} textAlign="center" fontSize={'md'}>
                        Asignacion Manual del Servicio
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>N° de Movil</Td>
                      <Td>
                        <Select
                          id="service"
                          value={values?.movil}
                          onChange={handleChange('movil')}
                        >
                          <option value={''}>Seleccionar Opciones</option>
                          {Automobiles.map((item, key) => (
                            <option key={key} value={item?.id}>
                              {item?.id} - {item?.nombre} - {item?.telefono}
                            </option>
                          ))}
                        </Select>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack justifyContent={'end'} spacing={2}>
              <Button
                onClick={() => {
                  SaveData();
                  onClose();
                }}
                backgroundColor="primary"
                color="black"
              >
                Modificar
              </Button>
              <Button
                onClick={() => {
                  updateState(1);
                  onClose();
                }}
                colorScheme={'blackAlpha'}
              >
                Terminar
              </Button>
              <Button
                onClick={() => {
                  updateState(0);
                  onClose();
                }}
                colorScheme={'red'}
              >
                Anular
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default View;
