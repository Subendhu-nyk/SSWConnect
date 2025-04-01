import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { subMenuConfig } from '../../common/constants/subMenuConfig';

const SidebarView = () => {
  const { user } = useSelector(state => state.auth);
  const role = user?.role || 'admin';
  const [openMenus, setOpenMenus] = useState({});

  const sidebarParentmenu = {
    admin: [
      { Main: ['dashboard', 'application'] },
      { Peoples: ['students', 'teachers', 'staff'] },
      {
        Academic: ['classes', 'class-timetable', 'courses', 'syllabus', 'timetable'],
      },
      { Management: ['fees-collection', 'library'] },
      {
        HRM: [
          'staffs',
          'departments',
          'designation',
          'attendance',
          'leaves',
          'holidays',
          'front-office',
          'feedback',
        ],
      },
      { Announcements: ['notice-board', 'events'] },
      {
        Reports: [
          'attendance-report',
          'class-report',
          'student-report',
          'grade-report',
          'leave-report',
          'fees-report',
        ],
      },
    ],
    teacher: [
      { Main: ['dashboard'] },
      { Peoples: ['students'] },
      {
        Academic: ['classes', 'class-routine', 'courses', 'syllabus', 'timetable'],
      },
      { Management: ['library'] },
      {
        HRM: ['attendance', 'leaves'],
      },
      { Announcements: ['notice-board', 'events'] },
      {
        Reports: ['attendance-report', 'class-report', 'student-report', 'grade-report'],
      },
    ],
    student: [
      { Main: ['dashboard'] },
      { Peoples: [] },
      {
        Academic: ['class-routine', 'courses', 'syllabus', 'timetable'],
      },
      { Management: ['library'] },
      {
        HRM: ['feedback'],
      },
      { Announcements: ['notice-board', 'events'] },
      {
        Reports: ['student-report', 'grade-report'],
      },
    ],
    staff: [
      { Main: ['dashboard'] },
      { Peoples: ['students', 'staff'] },
      {
        Academic: ['classroom', 'timetable'],
      },
      { Management: ['fees-collection', 'library'] },
      {
        HRM: ['attendance', 'leaves', 'holidays', 'front-office'],
      },
      { Announcements: ['notice-board', 'events'] },
      {
        Reports: ['attendance-report', 'leave-report', 'fees-report'],
      },
    ],
  };

  const groupedMenus = sidebarParentmenu[role] || [];

  const toggleMenu = id => {
    setOpenMenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getFilteredSubmenus = parentId => {
    return subMenuConfig.filter(item => item.id === parentId && item.requiredRole.includes(role));
  };

  return (
    <Box
      component='nav'
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid #ddd',
        position: 'fixed',
        top: 64,
        bottom: 0,
        left: 0,
        overflowY: 'auto',
      }}
    >
      <List>
        {Array.isArray(groupedMenus)
          ? groupedMenus.map((group, index) => {
              const sectionTitle = Object.keys(group)[0];
              const items = group[sectionTitle];

              if (!items || items.length === 0) return null;

              return (
                <Box key={index}>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      px: 2,
                      py: 1,
                      mt: index !== 0 ? 1.5 : 0,
                      color: 'text.secondary',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {sectionTitle}
                  </Typography>

                  <List disablePadding dense>
                    {items.map(id => {
                      const subMenus = getFilteredSubmenus(id);
                      const isExpandable = subMenus.length > 0;
                      const isOpen = openMenus[id];

                      return (
                        <Box key={id}>
                          <ListItem
                            button
                            onClick={() => (isExpandable ? toggleMenu(id) : null)}
                            component={!isExpandable ? NavLink : 'div'}
                            to={!isExpandable ? `/${id}` : undefined}
                            sx={{
                              pl: 3,
                              '&.active': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                              },
                              '&:hover': {
                                backgroundColor: 'grey.100',
                              },
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <ListItemText
                              primary={id
                                .replace(/-/g, ' ')
                                .replace(/\b\w/g, char => char.toUpperCase())}
                            />
                            {isExpandable && (
                              <ListItemIcon sx={{ minWidth: 'auto' }}>
                                <IconButton size='small'>
                                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                              </ListItemIcon>
                            )}
                          </ListItem>

                          {/* Submenu items */}
                          <Collapse in={isOpen} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding dense>
                              {subMenus.map(sub => (
                                <ListItem
                                  key={sub.path}
                                  button
                                  component={NavLink}
                                  to={`/${sub.path}`}
                                  sx={{
                                    pl: 5,
                                    '&.active': {
                                      backgroundColor: 'primary.main',
                                      color: 'white',
                                    },
                                    '&:hover': {
                                      backgroundColor: 'grey.100',
                                    },
                                  }}
                                >
                                  <ListItemText primary={sub.label} />
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        </Box>
                      );
                    })}
                  </List>
                  <Divider sx={{ my: 1 }} />
                </Box>
              );
            })
          : null}
      </List>
    </Box>
  );
};

export default SidebarView;
