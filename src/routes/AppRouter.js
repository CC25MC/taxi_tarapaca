import React, { lazy, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth, useAutomobilesGet, useMovementsSaveData } from '../hooks';
import { request } from '../api';
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  ModalFooter,
  Select,
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  // TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Loader } from '../componets';
import claxon from '../assets/claxon.mp3';

const DashboardScreen = lazy(() => import('../screens/DashboardScreen'));
const LoginScreen = lazy(() => import('../screens/LoginScreen'));
const MovementsScreen = lazy(() => import('../screens/MovementsScreen'));
const UsersScreen = lazy(() => import('../screens/UsersScreen'));
const MovilesScreen = lazy(() => import('../screens/MovilesScreen'));
const BusinessScreen = lazy(() => import('../screens/BusinessScreen'));
const AgreementScreen = lazy(() => import('../screens/AgreementScreen'));
const ServiceScreen = lazy(() => import('../screens/ServiceScreen'));

function subtractTimeFromDate(objDate, intMin) {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = intMin * 60000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

  return newDateObj;
}

const AlertScreen = async (onOpen, onClose, setValues) => {
  const audio = new Audio(claxon);

  var date = new Date();
  // var getDate = format(date, 'yyyy-MM-dd');
  // var time = format(date, 'h:m');

  const movimientos = await request.movements.getMovements();
  if (movimientos) {
    const servicios = await request.service.getService();
    movimientos.map(opc => {
      const resultado = servicios.find(item => item.nombre === opc.servicio);
      var newDate = subtractTimeFromDate(date, Number(resultado.aviso));
      var getDate = format(newDate, 'yyyy-MM-dd');
      var time = format(newDate, 'hh:mm');
      if (opc.fecha_serv === getDate && opc.hora_serv === time) {
        console.log('Entro');
        audio.currentTime = 0;
        audio
          .play()
          .then(() => {
            console.log('audio played auto');
          })
          .catch(error => {
            console.log(error);
          });
        setValues(opc);
        onOpen();
      }
      return opc;
    });
    // console.log(subtractTimeFromDate(date, 30));
  }
  console.log('Alerta funcionando');
};

const movilesData = (automoviles, id) => {
  const resultado = automoviles.find(item => Number(item.id) === Number(id));
  return resultado?.telefono || 'Cargando';
};

const Protected = ({ children }) => {
  const { auth } = useAuth();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const IsLoggedIn = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.isAuthenticated) {
    return <Navigate to="/inicio/movimientos" replace />;
  }
  return children;
};

export const AppRouter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: Automobiles,
    isLoading: isLoadingAutomobiles,
    // error: errorAutomobiles,
  } = useAutomobilesGet();

  const { saveData } = useMovementsSaveData();
  const [values, setValues] = useState({});
  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      AlertScreen(onOpen, onClose, setValues);
    }, 60000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (isLoadingAutomobiles) {
    return <Loader />;
  }

  return (
    <Box>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <IsLoggedIn>
                <LoginScreen />
              </IsLoggedIn>
            }
          />
          <Route
            path="/inicio"
            element={
              <Protected isLoggedIn={true}>
                <DashboardScreen />
              </Protected>
            }
          />
          <Route
            path="/inicio/movimientos"
            element={
              <Protected isLoggedIn={true}>
                <MovementsScreen />
              </Protected>
            }
          />
          <Route
            path="/inicio/servicios"
            element={
              <Protected isLoggedIn={true}>
                <ServiceScreen />
              </Protected>
            }
          />
          <Route
            path="/inicio/moviles"
            element={
              <Protected isLoggedIn={true}>
                <MovilesScreen />
              </Protected>
            }
          />
          <Route
            path="/inicio/empresa"
            element={
              <Protected isLoggedIn={true}>
                <BusinessScreen />
              </Protected>
            }
          />
          <Route
            path="/inicio/convenio"
            element={
              <Protected isLoggedIn={true}>
                <AgreementScreen />
              </Protected>
            }
          />
          <Route
            path="/inicio/usuarios"
            element={
              <Protected isLoggedIn={true}>
                <UsersScreen />
              </Protected>
            }
          />
        </Routes>
      </Router>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notificacion de Servicio {values?.servicio}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
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
                    <Td>{values?.nombre}</Td>
                  </Tr>
                  <Tr>
                    <Td>Domicilio</Td>
                    <Td>{values?.domicilio}</Td>
                  </Tr>
                  <Tr>
                    <Td>Telefono</Td>
                    <Td>{values?.telefono}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
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
                      {values?.movil ? (
                        movilesData(Automobiles, values?.movil)
                      ) : (
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
                      )}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <HStack justifyContent={'end'} spacing={2}>
              {!values?.movil && (
                <Button
                  onClick={() => {
                    saveData(values);
                    onClose();
                  }}
                  backgroundColor="primary"
                  color="black"
                >
                  Modificar
                </Button>
              )}

              <Button
                onClick={() => {
                  // updateState(1);
                  onClose();
                }}
                colorScheme={'blackAlpha'}
              >
                Alertar
              </Button>
              <Button
                onClick={() => {
                  // updateState(0);
                  onClose();
                }}
                colorScheme={'red'}
              >
                Cerrar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
