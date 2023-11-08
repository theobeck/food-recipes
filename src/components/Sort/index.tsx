import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

// Defines the properties interface for the Sort component
interface SortProps {
  onChange: (option: Option) => void;
}

// Defines the Sort component as a functional component
export default function Sort(props: SortProps) {
  const { onChange } = props;

  // Creates an array with Option objects that are different sorting options
  const options: Option[] = [
    { value: 'highest-rating', label: 'Highest Rating' },
    { value: 'alphabetical-order', label: 'Alphabetical Order' },
  ];

  // Shows the Dropdown component with the different sorting options
  return <Dropdown options={options} onChange={onChange} placeholder="Select an option" />;
}
