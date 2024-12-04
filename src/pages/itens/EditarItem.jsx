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

const EditarItem = ({handleCloseEditar, idItemSelecionado, items, item, setItems}) =>{
  const [idItem, setIdItem] = useState();
  const [tituloItem, setTituloItem] = useState('');
  const [quantItem, setQuantItem] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [statusItem, setStatusItem] = useState('');

  useEffect(() => {
    setIdItem(idItemSelecionado);
    setTituloItem(item.tituloItem);
    setQuantItem(item.quantItem);
    setDataCompra(item.dataCompra);
    setStatusItem(item.statusItem);
  },[]);

  const handleStatus = (event) => {
    setStatusItem(event.target.value);
  };

  const handleEditar = () => {
    setItems(current =>
      current.map(obj => {
        if (obj.idItem === idItemSelecionado) {
          console.log('obj: ' + JSON.stringify(obj));          
          return {...obj, 
              idItem:idItemSelecionado,
              tituloItem:tituloItem,
              quantItem:quantItem,
              dataCompra:dataCompra,
              statusItem:statusItem
          };
        }

        return obj;
      }),
    );
    handleCloseEditar();
  };

  return(
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader
          title="Items"
          subheader="Edição de Items"
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
              <FormHelperText id="Item_quantidade_helper_text">Quantidades de Items.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>  
              <FormControl>
                <Input id="Data_Compra" type="date" aria-describedby="Data_Compra_helper_text" value={dataCompra} onChange={e => { setDataCompra(e.target.value) }}
                  sx={{
                    color:'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                    paddingLeft:'13px'
                  }} 
                />
                <FormHelperText id="Data_Compra_helper_text">Data da Compra.</FormHelperText>
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
                <Button size="small" variant="contained" onClick={handleEditar}>Salvar</Button>
              </Grid>  
              <Grid item xs={1}>  
                <Button size="small" variant="outlined" onClick={handleCloseEditar}>Cancelar</Button>  
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

export default EditarItem;