import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Grid,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { useSelector } from 'react-redux';
import ReusableIcon from '../../common/ReusableIcon/ReusableIcon';

const ApplicationSettings = ({ open, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const theme = useSelector(state => state.theme);
  //   const userEmailId = 'abc@gmail.com'

  const tabsConfig = [
    { label: 'Date & Time', iconName: 'CalendarMonth' },
    { label: 'Language', iconName: 'Language' },
    { label: 'Page', iconName: 'Dashboard' },
    { label: 'Notifications', iconName: 'NotificationsActive' },
  ];

  //   const defaultPage = [
  //     { label: 'Dashboard', value: 'Dashboard' },
  //     { label: 'Teacher', value: 'Teacher' },
  //     { label: 'Student', value: 'Student' },
  //     { label: 'Staff', value: 'Staff' },
  //   ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      sx={{
        position: 'absolute',
        zIndex: 1000,
        borderRadius: '8px',
      }}
    >
      <DialogTitle>
        <Box display='flex' alignItems='center' justifyContent={'space-between'}>
          <Box display='flex' alignItems='center'>
            <SettingsOutlinedIcon sx={{ color: theme.darkMode ? '#fff' : '#424242', mr: 2 }} />
            <Typography variant='h6'>Application Settings</Typography>
          </Box>
          <Box>
            <IconButton
              onClick={onClose}
              sx={{
                '&:focus': {
                  outline: 'none',
                },
                '&:focus-visible': {
                  outline: 'none',
                },
              }}
            >
              <CloseIcon onClick={onClose} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant='scrollable'
              scrollButtons='auto'
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                '& .MuiTabs-scroller': {
                  overflowX: 'auto',
                },
                '& .MuiTab-root': {
                  flexShrink: 0,
                  minWidth: 'auto',
                  textTransform: 'capitalize',
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                },
              }}
            >
              {tabsConfig.map((tab, index) => (
                <Tab
                  key={index}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                      }}
                    >
                      <ReusableIcon
                        iconName={tab.iconName}
                        iconSize='18px'
                        isSelected={selectedTab === index}
                        CustomColor={theme.darkMode && '#fff'}
                      />
                      <Box ml={1}>
                        <Typography
                          variant='body'
                          color={selectedTab === index && theme.darkMode && '#fff'}
                        >
                          {tab.label}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
        <Box sx={{ height: '23vh', mb: 7 }}>
          {selectedTab === 0 && (
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Typography variant='body1' color='text.primary' sx={{ mb: '8px !important' }}>
                  Date Format
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1' color='text.primary' sx={{ mb: '8px !important' }}>
                  Time Format
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1' color='text.primary' sx={{ mb: '8px !important' }}>
                  Default Date Range
                </Typography>
              </Grid>
            </Grid>
          )}

          {selectedTab === 1 && (
            <Box mt={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <Typography variant='body1' color='text.primary' sx={{ marginBottom: 3 }}>
                  Language
                </Typography>
              </Grid>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box mt={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <Typography variant='body1' color='text.primary' sx={{ marginBottom: 3 }}>
                  Pages
                </Typography>
              </Grid>
            </Box>
          )}

          {selectedTab === 3 && (
            <Box mt={2} sx={{ padding: 2 }}>
              <Typography variant='body1' color='text.primary' sx={{ marginBottom: 3 }}>
                Notification Preferences
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <Divider sx={{ mb: 1.5 }} />
      <DialogActions>
        <Button
          sx={{ mb: 1, mr: 1.5 }}
          onClick={() => alert('Handle Save')}
          color='primary'
          variant='contained'
          disabled={false}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationSettings;
