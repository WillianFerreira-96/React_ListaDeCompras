import React, {useState, useEffect} from 'react';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const AddItem = ({handleClose, items, setItems}) =>{
  const [idItem, setIdItem] = useState();
  const [tituloItem, setTituloItem] = useState('');
  const [quantItem, setQuantItem] = useState('');
  const [dataCompra, setdataCompra] = useState('');
  const [statusItem, setStatusItem] = useState('');
  
  useEffect(() => {
    let proximoId = Math.max(...items.map(item => item.idItem)) + 1;
    setIdItem(proximoId);
  },[]);

  const handleStatus = (event) => {
    setStatusItem(event.target.value);
  };

  const handleSalvar = () => {
    console.log(`id: ${idItem} \n titulo: ${tituloItem} \n descrição: ${quantItem} \n inicio: ${dataCompra} \n status: ${statusItem}`);

    setItems(
      [...items, 
        {
          idItem,
          tituloItem,
          quantItem,
          dataCompra,
          statusItem
        }
      ]);
    handleClose();
  };

  return(
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader
          title="Items"
          subheader="Adicionar de Items"
        /> 
        <CardContent sx={{
          width: '95%',
          maxWidth: '100%',
        }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input id="Item_titulo" aria-describedby="Item_titulo_helper_text" value={tituloItem} onChange={e => { setTituloItem(e.target.value) }} />
              <FormHelperText id="Item_titulo_helper_text">Título do Item.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>  
            <FormControl fullWidth>
              <Input id="Item_quantidade" aria-describedby="Item_quantidade_helper_text" value={quantItem} onChange={e => { setQuantItem(e.target.value) }} />
              <FormHelperText id="Item_quantidade_helper_text">Quantidade.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>  
              <FormControl>
                <Input id="data_compra" type="date" aria-describedby="data_compra_helper_text" value={dataCompra} onChange={e => { setdataCompra(e.target.value) }}
                  sx={{
                    color:'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                    paddingLeft:'13px'
                  }} 
                />
                <FormHelperText id="data_compra_helper_text">Data da compra.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>  
              <FormControl fullWidth>
                <InputLabel htmlFor="Item_recurso">Status</InputLabel>
                <Select
                  id="Item_status"
                  value={statusItem}
                  label="Status"
                  onChange={handleStatus}
                  size="small"
                  sx={{
                    color:'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                  }} 
                >
                  <MenuItem value={'Aguardando'}>Aguardando</MenuItem>
                  <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                  <MenuItem value={'Concluída'}>Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} pl={2} mt={2}>
              <Grid item xs={1}>
                <Button size="small" variant="contained" onClick={handleSalvar}>Salvar</Button>
              </Grid>  
              <Grid item xs={1}>  
                <Button size="small" variant="outlined" onClick={handleClose}>Cancelar</Button>  
              </Grid>
            </Grid>  
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  p: 4,
};

export default AddItem;