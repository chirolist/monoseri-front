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
import { CircularProgress, MenuItem, Select } from '@mui/material';
import { sign } from 'crypto';

type InvoiceProps = {
  id: number;
};

export const InvoiceTemplate: React.FC<InvoiceProps> = ({ id }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [baseInfoVisible, setBaseInfoVisible] = useState(true);
  const [invoiceInfoVisible, setInvoiceInfoVisible] = useState(true);
  const [billingInfoVisible, setBillingInfoVisible] = useState(true);

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  const handleBaseInfoToggle = () => {
    setBaseInfoVisible(!baseInfoVisible);
  };

  const handleInvoiceInfoToggle = () => {
    setInvoiceInfoVisible(!invoiceInfoVisible);
  };

  const handleBillingInfoToggle = () => {
    setBillingInfoVisible(!billingInfoVisible);
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
      billSyozoku: '',
      billName: '',
      prefecture: '',
      salesStatus: '',
      category: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // Handle form submission logic here
    setLoading(false);
    setAlertVisible(true);
    console.log('Form data submitted:', data);
  };

  const labelWidth = '200px';

  return (
    <Container maxWidth="xl" className="mt-5">
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </div>
      )}

      <form
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
        className="mt-5 grid h-full"
      >
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
            md={6}
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                      ユーザーcode
                    </Typography>
                    <TextField fullWidth value={id} disabled size="small" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                      カテゴリー
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...register('category')}
                      error={!!errors.category}
                      helperText={errors.category ? 'Category is required' : ''}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
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
                      都道府県{' '}
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
                    <Select
                      size="small"
                      fullWidth
                      {...register('prefecture')}
                      error={!!errors.prefecture}
                      defaultValue=""
                    >
                      {[
                        '北海道',
                        '青森県',
                        '岩手県',
                        '宮城県',
                        '秋田県',
                        '山形県',
                        '福島県',
                        '茨城県',
                        '栃木県',
                        '群馬県',
                        '埼玉県',
                        '千葉県',
                        '東京都',
                        '神奈川県',
                        '新潟県',
                        '富山県',
                        '石川県',
                        '福井県',
                        '山梨県',
                        '長野県',
                        '岐阜県',
                        '静岡県',
                        '愛知県',
                        '三重県',
                        '滋賀県',
                        '京都府',
                        '大阪府',
                        '兵庫県',
                        '奈良県',
                        '和歌山県',
                        '鳥取県',
                        '島根県',
                        '岡山県',
                        '広島県',
                        '山口県',
                        '徳島県',
                        '香川県',
                        '愛媛県',
                        '高知県',
                        '福岡県',
                        '佐賀県',
                        '長崎県',
                        '熊本県',
                        '大分県',
                        '宮崎県',
                        '鹿児島県',
                        '沖縄県',
                      ].map((prefecture) => (
                        <MenuItem key={prefecture} value={prefecture}>
                          {prefecture}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
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
                      営業ステータス
                    </Typography>
                    <Select
                      size="small"
                      fullWidth
                      {...register('salesStatus')}
                      defaultValue=""
                    >
                      {['営業中', '休業中', '準備中'].map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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

          <Card className={`bg-white p-4`}>
            <FormControlLabel
              control={
                <Switch
                  checked={billingInfoVisible}
                  onChange={handleBillingInfoToggle}
                />
              }
              label={<span style={{ fontWeight: 'bold' }}>請求者情報</span>}
            />
            <Collapse in={billingInfoVisible}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                      {...register('billSyozoku')}
                      error={!!errors.billSyozoku}
                      helperText={
                        errors.billSyozoku ? 'billSyozoku is required' : ''
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
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
                      請求者名{' '}
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
                      {...register('billName')}
                      error={!!errors.billName}
                      helperText={errors.billName ? 'billName is required' : ''}
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
