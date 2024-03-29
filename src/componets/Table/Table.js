import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Button,
  IconButton,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Heading,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
  AddIcon,
  SearchIcon,
  // ChevronDownIcon,\
} from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import { FaFileExcel } from 'react-icons/fa';
// import Data from "../Dataset/Data.json";
import Data from './Data.json';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import { COLUMNS } from './Columns';
import { download, filedownload, exportName } from '../../variables';
import { format } from 'date-fns';
import { read, utils, writeFile } from 'xlsx';
import { useToast } from '@chakra-ui/react';

export const DataTable = ({
  title,
  onOpen,
  column,
  row,
  h,
  search,
  saveData,
}) => {
  let location = useLocation();
  const toast = useToast();
  //   let columns = Object.keys(Data[0]);  //columns list before using react table.

  // we momoized the columns and data so that our table don't get render again and again.
  const [excel, setExcel] = useState(null);

  const handleChange = async e => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    // console.log(data);

    setExcel(data);
  };

  const exportar = () => {
    let data = utils.json_to_sheet(filedownload[location.pathname]);
    const workbook = utils.book_new();
    const filename = download[location.pathname];
    utils.book_append_sheet(workbook, data, filename);
    writeFile(workbook, filename);
  };

  const dataExport = () => {
    let data = utils.json_to_sheet(row);
    const workbook = utils.book_new();
    const filename = exportName[location.pathname];
    utils.book_append_sheet(workbook, data, filename);
    writeFile(workbook, filename);
  };

  useEffect(() => {
    if (excel) {
      try {
        const workbook = read(excel);
        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = utils.sheet_to_json(workbook.Sheets[sheet]);

        saveData({ data: dataExcel });
      } catch (error) {
        toast({
          title: 'error',
          description: 'Error Insertando los datos del excel',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      setExcel(null);
    }
  }, [excel]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = useMemo(() => column || COLUMNS, [column]);
  const data = useMemo(() => row || Data, [row]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    // setSortBy,
    // allColumns,
    setGlobalFilter,
  } = tableInstance;

  const { pageIndex, globalFilter } = state;

  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  useEffect(() => {
    if (search) {
      onChange(format(search, 'yyyy-MM-dd'));
      setValue(format(search, 'yyyy-MM-dd'));
    }
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box border={'1px solid'} borderColor="gray.200" h={h} borderRadius={'xl'}>
      <Box p={3}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <Stack direction={'row'} spacing={2}>
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon />}
                />
                <Input
                  type="text"
                  value={value || ''}
                  onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  placeholder="Buscar"
                />
              </InputGroup>
            </Box>
            <Popover>
              <PopoverTrigger>
                <Button
                  maxW={'md'}
                  variant={'outline'}
                  leftIcon={<FaFileExcel />}
                >
                  <Text>Excel</Text>
                </Button>
              </PopoverTrigger>
              <PopoverContent _focus={{ boxShadown: 'none' }}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight="bold">
                  Documentos Excel
                </PopoverHeader>
                <PopoverBody w="full">
                  <Tabs isLazy colorScheme="yellow">
                    <TabList>
                      {saveData && (
                        <Tab
                          _focus={{ boxShadow: 'none' }}
                          fontSize="xs"
                          fontWeight="bold"
                          w="50%"
                        >
                          Importar
                        </Tab>
                      )}
                      <Tab
                        _focus={{ boxShadow: 'none' }}
                        fontSize="xs"
                        fontWeight="bold"
                        w="50%"
                      >
                        Exportar
                      </Tab>
                    </TabList>
                    <TabPanels>
                      {saveData && (
                        <TabPanel>
                          {/* You can add your content here. */}
                          Antes de importar los datos te dejamos esta plantilla
                          para descargar, donde tendras el formato correcto que
                          debe cumplir el excel.
                          <Box display={'flex'} mt="3">
                            <Button
                              maxW={'md'}
                              variant={'outline'}
                              onClick={exportar}
                            >
                              <Text>Plantilla</Text>
                            </Button>
                            <label
                              htmlFor="contained-button-file"
                              style={{ marginLeft: 'auto' }}
                            >
                              <input
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                              />
                              <Button
                                id="contained-button-file"
                                maxW={'md'}
                                bg={'primary'}
                                variant={'outline'}
                                as="span"
                              >
                                Importar
                              </Button>
                            </label>
                          </Box>
                        </TabPanel>
                      )}
                      <TabPanel>
                        Exportá todos los datos contenidos en esta tabla.
                        <Button
                          isFullWidth
                          bg={'primary'}
                          ml="auto"
                          mt={'3'}
                          onClick={dataExport}
                          variant={'outline'}
                        >
                          <Text>Exportar</Text>
                        </Button>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            {onOpen && (
              <Button
                maxW={'md'}
                bg={'primary'}
                onClick={onOpen}
                leftIcon={<AddIcon />}
              >
                <Text>Agregar {title}</Text>
              </Button>
            )}
          </Stack>

          {/* <Menu>
            <MenuButton
              alignSelf="center"
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              mx="1em"
              size="xs"
              as={Button}
              colorScheme="blue"
            >
              {selectedSortColumn['desc'] === true
                ? 'Descendente'
                : 'Ascendente'}
            </MenuButton>
            <MenuList color="gray.800" zIndex="3" minWidth="240px">
              <MenuOptionGroup
                type="radio"
                defaultValue={'0'}
                onChange={e => typeOfSort(e)}
              >
                <MenuItemOption key={0} value={'0'}>
                  Ascendente
                </MenuItemOption>
                <MenuItemOption key={1} value={'1'}>
                  Descendente
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              alignSelf="center"
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              mx="1em"
              size="xs"
              as={Button}
              colorScheme="blue"
            >
              Filtrar Por
            </MenuButton>
            <MenuList color="gray.800" zIndex="3" minWidth="240px">
              <MenuOptionGroup type="radio" onChange={e => handleSort(e)}>
                {allColumns.map((column, idx) => (
                  <MenuItemOption
                    icon={
                      column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon />
                        ) : (
                          <TriangleUpIcon />
                        )
                      ) : (
                        ''
                      )
                    }
                    key={idx}
                    value={column.id}
                  >
                    {column.Header}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Button
            size="xs"
            m="4px"
            colorScheme="red"
            variant="outline"
            onClick={() => setSortBy([])}
          >
            Reset Sorting
          </Button>  */}
        </Flex>
      </Box>
      <Divider />
      <Box maxH="100%" overflowY="auto">
        <Table
          variant="striped"
          colorScheme="blackAlpha"
          {...getTableProps()}
          size="md"
        >
          <Thead
            p="0"
            position="sticky"
            top="0px"
            bg={'white'}
            style={{ overflow: 'auto' }}
          >
            {headerGroups.map((headerGroup, indexKey) => (
              <Tr p="0" key={indexKey} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <Th
                    p="1em"
                    className="th1"
                    key={columnIndex}
                    color={'gray.800'}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {/* This will render the Title of column */}
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon />
                      ) : (
                        <TriangleUpIcon />
                      )
                    ) : (
                      ''
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody className="body1" p="1em" {...getTableBodyProps()}>
            {page && page.length > 0 ? (
              page.map(row => {
                prepareRow(row);
                return (
                  <Tr className="tr1" {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <Td
                          className="td1"
                          color={'gray.600'}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}{' '}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })
            ) : (
              <Tr className="tr1">
                <Td
                  className="td1"
                  colSpan={columns.length}
                  color={'gray.600'}
                  textAlign={'center'}
                >
                  No hay Datos Registrados
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Flex
        borderTop="1px solid"
        borderColor="gray.200"
        justifyContent="center"
      >
        <Flex alignContent="center">
          <IconButton
            _focus={{ boxShadow: '' }}
            _hover={{ backgroundColor: '' }}
            _active={{ backgroundColor: '' }}
            color="gray.800"
            bg="white"
            fontSize="15px"
            icon={<ArrowLeftIcon />}
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
          />
          <IconButton
            _focus={{ boxShadow: '' }}
            _hover={{ backgroundColor: '' }}
            _active={{ backgroundColor: '' }}
            color="gray.800"
            bg="white"
            fontSize="30px"
            icon={<ChevronLeftIcon />}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          />
          <Text m="0" alignSelf="center">
            {pageIndex + 1} - {pageOptions.length}{' '}
          </Text>
          <IconButton
            _focus={{ boxShadow: '' }}
            _hover={{ backgroundColor: '' }}
            _active={{ backgroundColor: '' }}
            color="gray.800"
            bg="white"
            fontSize="30px"
            icon={<ChevronRightIcon />}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          />
          <IconButton
            _focus={{ boxShadow: '' }}
            _hover={{ backgroundColor: '' }}
            _active={{ backgroundColor: '' }}
            color="gray.800"
            bg="white"
            fontSize="15px"
            icon={<ArrowRightIcon />}
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
