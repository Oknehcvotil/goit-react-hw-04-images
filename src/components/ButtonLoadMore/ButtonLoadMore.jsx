import PropTypes from 'prop-types';
import { BtnLoad } from './ButtonLoadMore.styled';

const ButtonLoadMore = ({ onClick }) => {
  return (
    <BtnLoad type="button" onClick={onClick}>
      Load more
    </BtnLoad>
  );
};

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonLoadMore;
