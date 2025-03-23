import * as icon from '@mui/icons-material';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
function ReusableIcon(props) {
  const { darkMode } = useSelector(state => state.theme);
  const { isSelected, iconName, iconSize, CustomColor } = props;
  const iconColor = CustomColor
    ? CustomColor
    : darkMode
    ? isSelected
      ? '#3730c7'
      : '#fff'
    : isSelected
    ? '#3730c7'
    : '#6B6B75';

  return createElement(icon[isSelected ? `${iconName}` : `${iconName}Outlined`], {
    sx: {
      color: iconColor,
      fontSize: `${iconSize ?? '24px'}`,
    },
    className: 'iconClass',
  });
}

export default ReusableIcon;
