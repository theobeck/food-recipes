import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import React from 'react';


// Define the properties interface for the Filter component
interface FilterProps {
    onChange: (option: Option) => void;
  }
  
  // Define the Filter component as a functional component
  export default function Filter(props: FilterProps) {
    const { onChange } = props;
  
    // Create an array with Option objects that are different filters
    const options: Option[] = [
      { value: 'highest-rating', label: 'Highest Rating' },
      { value: 'alphabetical-order', label: 'Alphabetical Order' },
    ];
  
    // Show the Dropdown component with the different Option filters
    return (
      <Dropdown
        options={options}
        onChange={onChange}
        placeholder="Select an option"
      />
    );
  }