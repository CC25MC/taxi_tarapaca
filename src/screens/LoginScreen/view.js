import { Formik, Field } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  Divider,
  Image,
  useDisclosure,
  Hide,
  useMediaQuery,
} from '@chakra-ui/react';
import { images } from '../../assets';
import { Loader, ResetPassword } from '../../componets';

const SectionOne = ({ onOpen, signIn }) => {
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');
  return (
    <Box
      display={'flex'}
      flexDirection="column"
      justifyContent={'center'}
      alignItems="center"
      fontSize="xl"
      w={isLargerThan480 ? '50%' : '100%'}
      h="100%"
    >
      <Box p={6} rounded="md" maxW={500}>
        <Heading as="h4" size="md">
          Iniciar Sesión
        </Heading>
        <Box marginTop={5} />
        <Text fontSize="md">
          Bienvenido a taxis tarapaca, ingresa tus credenciales para comenzar.
        </Text>
        <Box marginTop={8} />

        <Formik
          initialValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmit={values => {
            signIn(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="flex-start">
                <FormControl>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    placeholder="Correo"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    placeholder="Contraseña"
                    validate={value => {
                      let error;

                      if (value.length < 5) {
                        error =
                          'La contraseña no cumple con el minimo de caracteres';
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Box display={'flex'} w={'100%'} fontSize="xl">
                  <Box />
                  <Link
                    color="primary"
                    fontSize={'sm'}
                    to="/inicio"
                    marginLeft={'auto'}
                    onClick={onOpen}
                  >
                    Olvidaste tu contraseña?
                  </Link>
                </Box>

                <Divider />
                <Box display={'flex'} w={'100%'} fontSize="xl">
                  <Field
                    as={Checkbox}
                    id="rememberMe"
                    name="rememberMe"
                    colorScheme="yellow"
                  >
                    Recuerdame?
                  </Field>
                  <Button
                    type="submit"
                    marginLeft={'auto'}
                    backgroundColor="primary"
                    color="black"
                  >
                    Iniciar Sesión
                  </Button>
                </Box>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const SectionTwo = () => {
  return (
    <Box
      bgGradient="linear(179.99deg, #FBD409 0.01%, rgba(234, 101, 26, 0) 167.11%)"
      display={'flex'}
      flexDirection="column"
      justifyContent={'center'}
      alignItems="center"
      fontSize="xl"
      w={'50%'}
      h="100%"
    >
      <Box p={6} maxW={450}>
        <Image src={images.mapa} alt="Dan Abramov" />
        <Heading as="h2" size="2xl">
          Llegamos
          <br />a toda Iquique
        </Heading>
      </Box>
    </Box>
  );
};

const View = ({ signIn, isLoadingSigningIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (isLoadingSigningIn) {
    return <Loader />;
  }
  return (
    <Flex h="100vh">
      <ResetPassword isOpen={isOpen} onClose={onClose} />
      <SectionOne onOpen={onOpen} signIn={signIn} />
      <Hide below="sm">
        <SectionTwo />
      </Hide>
    </Flex>
  );
};

export default View;
