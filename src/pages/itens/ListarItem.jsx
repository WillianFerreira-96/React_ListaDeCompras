import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarItem from './CriarItem';
import EditarItem from './EditarItem';

function createData(
  idItem,
  tituloItem,
  quantItem,
  dataCompra,
  statusItem  
) {
  return { idItem, tituloItem, quantItem, dataCompra, statusItem};
}

const initialRows = [
  createData(1, 'Arroz', '5kg', '2024-12-03', 'Concluído'),
  createData(2, 'Feijão', '2kg', '2022-12-14', 'Em Andamento'),
  createData(3, 'Carne', '3kg', '2022-12-20', 'Em Andamento'),
  createData(4, 'Leite', '2 caixas', '2022-12-08', 'Em Andamento'),
  createData(5, 'Café', '1 pacote', '2022-12-26', 'Aguardando')
];

const ListarItem = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState();
  const [idItemSelecionado, setidItemSelecionado] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseEditar = () => setOpenEditar(false);
  const handleOpenEditar = () => setOpenEditar(true);

  useEffect(() => {
    setItems(initialRows);
  },[]);

  const handleEditar = (id) => {
    setidItemSelecionado(id);

    let itemParaEditar = items.filter(obj => {
      return obj.idItem === id;
    })[0];

    setItem(itemParaEditar);

    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setItems(current =>
      current.filter(item => {
        return item.idItem !== id;
      }),
    );
  };

    return(
    <>
    <Card>
        <CardHeader
          title="Items"
          subheader="Listagem de Items"
        /> 
        <CardContent>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Data da Compra</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {items.map((row, indice) => (
                    <TableRow
                    key={indice}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                          {row.idItem}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.tituloItem}
                      </TableCell>
                      <TableCell align="right">{row.quantItem}</TableCell>
                      <TableCell align="right">{row.dataCompra}</TableCell>
                      <TableCell align="right">{row.statusItem}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="success" onClick={() => handleEditar(row.idItem)}><EditIcon fontSize="small" /></Button>            
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="error" onClick={() => handleDeletar(row.idItem)}><DeleteIcon fontSize="small" /></Button>            
                      </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" onClick={handleOpen}>Criar Item</Button>
            <Button size="small" variant="outlined">Cancelar</Button>
      </CardActions> 
    </Card>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarItem handleClose={handleClose} items={items} setItems={setItems} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarItem handleCloseEditar={handleCloseEditar} idItemSelecionado={idItemSelecionado} items={items} item={item} setItems={setItems} />
        </div>
      </Modal>  
    </div>
  </>    
 );
};
 
export default ListarItem;