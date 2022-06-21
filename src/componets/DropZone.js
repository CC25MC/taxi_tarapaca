import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';
import { useRef } from 'react';

export const DropZone = ({
  name,
  placeholder,
  acceptedFileTypes,
  children,
  handleChange,
  value,
}) => {
  const inputRef = useRef();

  return (
    <FormControl>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiFile} />
        </InputLeftElement>
        <input
          type="file"
          onChange={handleChange('archivo')}
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          style={{ display: 'none' }}
        />
        <Input
          placeholder={placeholder || 'Your file ...'}
          onClick={() => inputRef.current.click()}
          // onChange={(e) => {}}
          readOnly={true}
          value={value && 'Archivo Seleccionado'}
        />
      </InputGroup>
    </FormControl>
  );
};
