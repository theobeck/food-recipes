import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import React from 'react';


interface FilterProps {
    onChange: (option: Option) => void;
  }
  
  export default function Filter(props: FilterProps) {
    const { onChange } = props;
  
    
    const options: Option[] = [
      { value: 'highest-rating', label: 'Highest Rating' },
      { value: 'alphabetical-order', label: 'Alphabetical Order' },
    ];
  
    return (
      <Dropdown
        options={options}
        onChange={onChange}
        placeholder="Select an option"
      />
    );
  }