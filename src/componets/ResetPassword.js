import { useRef } from 'react';
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Text,
  Box,
} from '@chakra-ui/react';

export const ResetPassword = ({ isOpen, onClose }) => {
  const initialRef = useRef();

  return (
    <Modal
      isCentered
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Recuperar Contraseña</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontSize="md">
            Ingresa tu Correo Electronico para recuperar el acceso a tu cuenta.
          </Text>
          <Box marginTop={8} />

          <FormControl>
            <Input ref={initialRef} variant="filled" placeholder="Correo" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button backgroundColor="primary" color="black" mr={3}>
            Recuperar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
