import BackBtn from '../../assets/back-button.png';
import { useNavigate } from 'react-router-dom';
import './index.css';

// Creating a component called BackButton that sends the user one step back in the navigation history
export default function BackButton() {
  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  };

  // Setting an image as the button, with an alt if image cannot show
  return (
    <img
      tabIndex={1}
      className="backBtn"
      src={BackBtn}
      onClick={goBack}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          goBack();
        }
      }}
      alt="Back Button"
    />
  );
}
