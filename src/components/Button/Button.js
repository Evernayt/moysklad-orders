import Loader from 'components/Loader/Loader';
import './Button.css';

const Button = ({ appearance = 'default', children, ...props }) => {
  return (
    <button className={`button-${appearance}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
