import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    changeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" className="language-switcher" sx={{ minWidth: 140 }}>
      <InputLabel id="language-switcher-label">Language</InputLabel>
      <Select
        labelId="language-switcher-label"
        id="language-switcher"
        value={language}
        label="Language"
        onChange={handleLanguageChange}
        data-testid="language-switcher-select"
      >
        <MenuItem value="vi">Vietnamese</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
