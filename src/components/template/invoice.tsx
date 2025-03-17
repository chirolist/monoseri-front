'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Card from 'components/card';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  FormControlLabel,
  Collapse,
  Switch,
} from '@mui/material';
import { RiLineHeight } from 'react-icons/ri';
import { sign } from 'crypto';

type InvoiceProps = {
  id: number;
};

export const InvoiceTemplate: React.FC<InvoiceProps> = ({ id }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const [baseInfoVisible, setBaseInfoVisible] = useState(true);
  const [invoiceInfoVisible, setInvoiceInfoVisible] = useState(true);

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  const handleBaseInfoToggle = () => {
    setBaseInfoVisible(!baseInfoVisible);
  };

  const handleInvoiceInfoToggle = () => {
    setInvoiceInfoVisible(!invoiceInfoVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      kana: '',
      email: '',
      phone: '',
      address: '',
      year: '',
      month: '',
      day: '',
      affiliation: '',
      invoiceCode: '',
      projectName: '',
    },
  });

  const onSubmit = (data) => {
    // Handle form submission logic here
    setAlertVisible(true);
    console.log('Form data submitted:', data);
  };

  const labelWidth = '200px';

  return (
    <Container maxWidth="xl" className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid h-full">
        {alertVisible && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '2px solid green',
              color: 'green',
              padding: '10px',
              textAlign: 'center',
              zIndex: 1000,
              cursor: 'pointer',
            }}
          >
            保存されました
            <button onClick={handleAlertClose} style={{ marginLeft: '10px' }}>
              閉じる
            </button>
          </div>
        )}
        <Box className="grid grid-cols-1 gap-4">
          <Grid
            item
            xs={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                width: 'auto',
                backgroundColor: 'white',
                boxShadow: 'none',
                border: '1px solid gray',
                color: 'gray',
              }}
            >
              保存
            </Button>
          </Grid>

          <Card className={`bg-white p-4`}>
            <FormControlLabel
              control={
                <Switch
                  checked={baseInfoVisible}
                  onChange={handleBaseInfoToggle}
                />
              }
              label={<span style={{ fontWeight: 'bold' }}>基本情報</span>}
            />
            <Collapse in={baseInfoVisible}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      ユーザーID
                    </Typography>
                    <TextField fullWidth value={id} disabled size="small" />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      所属
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...register('affiliation')}
                      error={!!errors.affiliation}
                      helperText={
                        errors.affiliation ? 'Affiliation is required' : ''
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      氏名{' '}
                      <span
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          marginLeft: '4px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          verticalAlign: 'middle',
                        }}
                      >
                        必須
                      </span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name ? 'Name is required' : ''}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      カナ{' '}
                      <span
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          marginLeft: '4px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          verticalAlign: 'middle',
                        }}
                      >
                        必須
                      </span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...register('kana')}
                      error={!!errors.kana}
                      helperText={errors.kana ? 'Kana is required' : ''}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      メールアドレス{' '}
                      <span
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          marginLeft: '4px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          verticalAlign: 'middle',
                        }}
                      >
                        必須
                      </span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      type="email"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email ? 'Email is required' : ''}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      電話番号{' '}
                      <span
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          marginLeft: '4px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          verticalAlign: 'middle',
                        }}
                      >
                        必須
                      </span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      type="tel"
                      {...register('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone ? 'Phone is required' : ''}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      住所
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...register('address')}
                      error={!!errors.address}
                      helperText={errors.address ? 'Address is required' : ''}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      生年月日
                    </Typography>
                    <Box display="flex" alignItems="center" width="100%">
                      <TextField
                        select
                        size="small"
                        label="年"
                        {...register('year')}
                        error={!!errors.year}
                        helperText={errors.year ? 'Year is required' : ''}
                        SelectProps={{
                          native: true,
                        }}
                        style={{ marginRight: '8px', width: '100px' }}
                      >
                        {[...Array(100)].map((_, index) => (
                          <option key={index} value={2025 - index}>
                            {2025 - index}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        select
                        size="small"
                        label="月"
                        {...register('month')}
                        error={!!errors.month}
                        helperText={errors.month ? 'Month is required' : ''}
                        SelectProps={{
                          native: true,
                        }}
                        style={{ marginRight: '8px', width: '100px' }}
                      >
                        {[...Array(12)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        select
                        size="small"
                        label="日"
                        {...register('day')}
                        error={!!errors.day}
                        helperText={errors.day ? 'Day is required' : ''}
                        SelectProps={{
                          native: true,
                        }}
                        style={{ width: '100px' }}
                      >
                        {[...Array(31)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </TextField>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Collapse>
          </Card>

          <Card className={`bg-white p-4`}>
            <FormControlLabel
              control={
                <Switch
                  checked={invoiceInfoVisible}
                  onChange={handleInvoiceInfoToggle}
                />
              }
              label={<span style={{ fontWeight: 'bold' }}>請求情報</span>}
            />
            <Collapse in={invoiceInfoVisible}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      請求番号{' '}
                      <span
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          marginLeft: '4px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          verticalAlign: 'middle',
                        }}
                      >
                        必須
                      </span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...register('invoiceCode')}
                      error={!!errors.invoiceCode}
                      helperText={
                        errors.invoiceCode ? 'InvoiceCode is required' : ''
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography
                      variant="body1"
                      style={{
                        marginRight: '8px',
                        width: labelWidth,
                        whiteSpace: 'nowrap',
                        fontSize: '15px',
                        textAlign: 'right',
                      }}
                    >
                      案件名{' '}
                      <span
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          marginLeft: '4px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          verticalAlign: 'middle',
                        }}
                      >
                        必須
                      </span>
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...register('projectName')}
                      error={!!errors.projectName}
                      helperText={
                        errors.projectName ? 'ProjectName is required' : ''
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Collapse>
          </Card>
        </Box>
      </form>
    </Container>
  );
};
