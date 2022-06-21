import {
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Button,
  InputRightElement,
  IconButton,
  Tag,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AppBar, DataTable, Loader } from '../../componets';
import { ViewIcon, ViewOffIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useUserDestroy } from '../../hooks';
import { useNotify } from '../../utils';
import { DateTime } from 'luxon';

const View = ({
  name,
  email,
  role,
  password,
  password_confirmation,
  handleChange,
  SaveData,
  loading,
  users,
  reset,
  setValues,
  values,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const { destroy, error, isLoading } = useUserDestroy();
  useNotify(error, 'error', 'Error eliminando Usuario');

  const updateChange = id => {
    const resultado = users?.data.find(item => item.id === id);
    if (resultado) {
      setValues(resultado);
      onOpen();
    }
  };
  if (loading || isLoading) {
    return <Loader />;
  }
  const COLUMNS = [
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Rol',
      Cell: data => {
        return (
          <Tag
            size={'md'}
            variant="solid"
            colorScheme={data?.row?.original?.role === 1 ? 'red' : 'green'}
          >
            {data?.row?.original?.role === 1 ? 'Administrador' : 'Usuario'}
          </Tag>
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
              mr={3}
              icon={<EditIcon />}
              onClick={() => updateChange(data.row.original.id)}
            />
            <IconButton
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={() => destroy(data.row.original.id)}
            />
          </Box>
        );
      },
    },
  ];

  const pass =
    name?.length > 0 &&
    email?.length > 0 &&
    password?.length > 0 &&
    password_confirmation === password;

  return (
    <Box>
      <AppBar />
      <Box p={5}>
        <DataTable
          title={'Usuarios'}
          column={COLUMNS}
          row={users?.data}
          onOpen={onOpen}
        />
      </Box>

      <Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Crear Nuevo Usuario
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nombre Completo</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  placeholder="Nombre"
                  value={name}
                  onChange={handleChange('name')}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Correo</FormLabel>
                <Input
                  id="email"
                  placeholder="correo@gmail.com"
                  type={'email'}
                  value={email}
                  onChange={handleChange('email')}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="role">Rol</FormLabel>
                <Select id="role" value={role} onChange={handleChange('role')}>
                  <option value="2">Usuario</option>
                  <option value="1">Administrador</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleChange('password')}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor="password">Confirmar Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    id="password_confirmation"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirmar Contraseña"
                    value={password_confirmation}
                    onChange={handleChange('password_confirmation')}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              bg={'primary'}
              isDisabled={values?.id ? false : !pass}
              onClick={() => {
                SaveData();
                onClose();
              }}
            >
              Crear
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default View;
