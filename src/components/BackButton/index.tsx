import BackBtn from '../../assets/back-button.png';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function BackButton() {
  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  }

  return <img className='backBtn' src={BackBtn} onClick={goBack} alt="Back Button" />
      
}