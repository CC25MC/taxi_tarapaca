import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Heading,
  Divider,
  Tooltip,
  Tag,
  TagLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  InfoOutlineIcon,
  ChatIcon,
} from '@chakra-ui/icons';
import QRCode from 'react-qr-code';
import { useLogout, useAuth, useGetStatus, useGetQr } from '../hooks';
import { useNotify } from '../utils';
import { Loader } from './Loader';

const Links = [
  {
    title: 'Movimientos',
    paht: '/inicio/movimientos',
  },
  {
    title: 'Servicios',
    paht: '/inicio/servicios',
  },
  {
    title: 'Moviles',
    paht: '/inicio/moviles',
  },
  {
    title: 'Empresa',
    paht: '/inicio/empresa',
  },
  {
    title: 'Convenio',
    paht: '/inicio/convenio',
  },
  // {
  //   title: 'Informes',
  //   paht: '/inicio/informes',
  // },
];

const NavLink = ({ children, location }) => {
  let navigate = useNavigate();
  return (
    <Link
      px={2}
      py={1}
      p={2}
      bg={location?.pathname === children.paht ? 'primary' : 'white'}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'primary',
      }}
      onClick={() => navigate(children.paht, { replace: true })}
    >
      <Heading as="h6" size="xs">
        {children.title}
      </Heading>
    </Link>
  );
};

export const AppBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isLoading } = useGetStatus();
  const { data: dataQr, error: ErrorQr, isLoading: isLoadingQr } = useGetQr();
  let location = useLocation();
  let navigate = useNavigate();
  const { logOut, isLoadinglogOut, errorlogOut } = useLogout();
  const { user } = useAuth();
  useNotify(errorlogOut, 'error', 'Error Cerrando Sesión');
  useNotify(error, 'error', 'Error El servicio de mensajeria esta inactivo');
  useNotify(ErrorQr, 'error', 'Error Obteniendo el Qr del Chat de mensajeria');
  if (isLoadinglogOut) {
    return <Loader />;
  }
  return (
    <>
      <Box bg={'white'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            bg={'white'}
            display={{ md: 'none' }}
            _hover={{
              textDecoration: 'none',
              bg: 'primary',
            }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={4} alignItems={'center'}>
            <Heading as="h4" size="md">
              Taxi Tarapaca
            </Heading>
          </HStack>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link, key) => (
              <NavLink key={key} location={location}>
                {link}
              </NavLink>
            ))}
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={2}>
              <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                  <Button bg={'white'}>
                    <Tooltip
                      label={
                        data.status === 'AUTHENTICATED'
                          ? 'Chat Online'
                          : 'Chat Offline'
                      }
                    >
                      <Tag
                        size="lg"
                        colorScheme={
                          data.status === 'AUTHENTICATED' ? 'green' : 'red'
                        }
                        borderRadius="full"
                      >
                        <ChatIcon ml={-1} mr={2} />
                        <TagLabel>
                          {data.status === 'AUTHENTICATED'
                            ? 'Chat Online'
                            : 'Chat Offline'}
                        </TagLabel>
                      </Tag>
                    </Tooltip>
                  </Button>
                </PopoverTrigger>
                <PopoverContent _focus={{ boxShadown: 'none' }}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="bold">Qr Mensajeria</PopoverHeader>
                  <PopoverBody w="full">
                    {dataQr?.qr ? (
                      <QRCode title="Qr" value={dataQr?.qr} />
                    ) : (
                      'Al parecer el Servidor esta presentando problemas por favor Reinicialo.'
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={
                      'https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?k=20&m=1016744034&s=612x612&w=0&h=kjCAwH5GOC3n3YRTHBaLDsLIuF8P3kkAJc9RvfiYWBY='
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    icon={<AddIcon />}
                    _focus={{
                      bg: 'primary',
                    }}
                    _hover={{
                      bg: 'primary',
                    }}
                    onClick={() =>
                      navigate('/inicio/usuarios', { replace: true })
                    }
                  >
                    Crear Usuarios
                  </MenuItem>
                  {user?.role === 1 && (
                    <MenuItem
                      icon={<InfoOutlineIcon />}
                      _focus={{
                        bg: 'primary',
                      }}
                      _hover={{
                        bg: 'primary',
                      }}
                    >
                      Ultimos Movimientos
                    </MenuItem>
                  )}

                  <MenuDivider />
                  <MenuItem
                    icon={<CloseIcon />}
                    _focus={{
                      bg: 'primary',
                    }}
                    _hover={{
                      bg: 'primary',
                    }}
                    onClick={logOut}
                  >
                    Cerrar Sesión
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, key) => (
                <NavLink key={key} location={location}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Divider />
      {/* <Box p={4}></Box> */}
    </>
  );
};
