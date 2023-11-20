import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

interface SortProps {
  onChange: (option: Option) => void;
  value: string; // Add this line
}

export default function Sort({ onChange, value }: SortProps) {
  const options: Option[] = [
    { value: 'highest-rating', label: 'Highest Rating' },
    { value: 'alphabetical-order', label: 'Alphabetical Order' },
  ];

  return (
    <Dropdown 
      options={options} 
      onChange={onChange} 
      value={value} // Control the displayed value
      placeholder="Select an option" 
    />
  );
}
