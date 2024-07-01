import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const icon = theme !== 'dark-mode' ? 'FaMoon' : 'FaSun'
  return (
    <Button 
      onClick={toggleTheme} 
      appareance='tertiary'
      ariaLabel='change the page theme to dark or light'
    >
        <Icon color='white' icon={icon} size='small' />
    </Button>
  );
};

export default ThemeToggle;