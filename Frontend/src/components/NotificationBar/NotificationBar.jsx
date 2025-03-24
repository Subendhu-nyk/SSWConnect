import { useState } from 'react';
import { Drawer, Box, List, ListItem, Typography, Button, IconButton } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

import NotificationNotFound from '../../assets/images/nonotificationfound.png';

// Dummy notification data
const notificationData = [
  {
    recipient: 'Sam@gmail.com',
    notificationId: 'Student_MANAGEMENT',
    notificationTxnId: 'f23c812e-0a86-4964-b90e-949651ca50c4',
    notificationType: 'Student Updates',
    notificationPriority: 'High',
    notificationMedium: 'InApp',
    actions: null,
    markAsRead: false,
    notification: 'Action Required: Fee payment',
    sentByName: null,
    sentBy: null,
    sentDate: 1739288617933,
    additionalProperties: {},
    taskId: null,
    taskDesc: null,
    formId: null,
    referenceId: null,
  },
  {
    recipient: 'Sam@gmail.com',
    notificationId: 'STUDENT_MANAGEMENT',
    notificationTxnId: 'a88d8620-212d-4d18-8c6d-62cab276a94d',
    notificationType: 'Student Updates',
    notificationPriority: 'Low',
    notificationMedium: 'InApp',
    actions: null,
    markAsRead: false,
    notification: 'Action Required: Fee payment',
    sentByName: null,
    sentBy: null,
    sentDate: 1739203432380,
    additionalProperties: {},
    taskId: null,
    taskDesc: null,
    formId: null,
    referenceId: null,
  },
  {
    recipient: 'Sam@gmail.com',
    notificationId: 'STUDENT_MANAGEMENT',
    notificationTxnId: '17032548-77f3-408d-8b4e-e8d392c245de',
    notificationType: 'Student Updates',
    notificationPriority: 'Normal',
    notificationMedium: 'InApp',
    actions: null,
    markAsRead: false,
    notification: 'Action Required: Fee payment',
    sentByName: null,
    sentBy: null,
    sentDate: 1739201581331,
    additionalProperties: {},
    taskId: null,
    taskDesc: null,
    formId: null,
    referenceId: null,
  },
];

const NotificationBar = ({ drawerOpen, toggleDrawer}) => {
  const [displayCount, setDisplayCount] = useState(15);
  const loadMore = e => {
    e.stopPropagation();
    setDisplayCount(prevCount => prevCount + 15);
  };

  const formatNotificationDate = date => {
    if (!date) return 'Date not available';
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
    });
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'High':
        return 'error.main';
      case 'Low':
        return 'warning.main';
      default:
        return 'primary.main';
    }
  };
  return (
    <Drawer
      anchor='right'
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{ position: 'relative', zIndex: 9999 }}
    >
      <Box
        sx={{
          width: 350,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        role='presentation'
      >
        {/* Sticky Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'background.paper',
            zIndex: 1,
          }}
        >
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h6' sx={{ p: 2 }}>
              Notifications
            </Typography>
            {notificationData?.length > 0 && (
              <Button
                sx={{
                  maxHeight: 'max-content',
                  maxWidth: 'max-content',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  padding: '.2rem .2rem .2rem 0',
                  color: 'primary',
                }}
                onClick={() => alert('Notification clicked')}
                startIcon={
                  <DoneAllIcon color='primary' sx={{ paddingLeft: '.25rem' }} fontSize='12px' />
                }
              >
                Mark all as read
              </Button>
            )}
            {notificationData?.length === 0 && (
              <IconButton aria-label='close' sx={{ mr: 1 }} onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <Divider />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          {notificationData?.length === 0 ? (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              sx={{ p: 2, height: '80vh', opacity: '.5' }}
            >
              <img
                src={NotificationNotFound}
                alt='No notifications'
                style={{
                  width: '80%',
                }}
              />
              <Typography variant='body1' sx={{ mt: 2 }}>
                No notifications to display
              </Typography>
            </Box>
          ) : (
            <>
              <List>
                {notificationData?.slice(0, displayCount).map(notification => {
                  const formattedDate = formatNotificationDate(notification.sentDate);
                  const priorityColor = getPriorityColor(notification.notificationPriority);
                  return (
                    <ListItem
                      button
                      key={notification.notificationTxnId}
                      onClick={e => {
                        e.stopPropagation();
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 1,
                        p: 2,
                        borderBottom: '1px solid #e0e0e0',
                        backgroundColor: notification.markAsRead ? '#f9f9f9' : '#fff',
                        '&:hover': {
                          backgroundColor: '#f1f1f1',
                        },
                      }}
                      aria-label={`Notification: ${notification.notification}`}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: priorityColor,
                          }}
                        />
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                          {notification.notificationType || 'Notification'}
                        </Typography>
                      </Box>

                      <Typography variant='body2' ml={2}>
                        {notification.notification || 'No notification message'}
                      </Typography>

                      <Typography variant='body2' ml={2} sx={{ color: 'text.secondary' }}>
                        {formattedDate}
                      </Typography>

                      {notification.actions && (
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          {notification.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant='outlined'
                              size='small'
                              onClick={e => {
                                e.stopPropagation();
                              }}
                            >
                              {action}
                            </Button>
                          ))}
                        </Box>
                      )}
                    </ListItem>
                  );
                })}
              </List>

              {/* Show More Button */}
              {notificationData?.length > displayCount && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button variant='outlined' onClick={loadMore} sx={{ width: '100%' }}>
                    Show More
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default NotificationBar;
