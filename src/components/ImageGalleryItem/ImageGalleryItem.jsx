import PropTypes from 'prop-types';
import { ImageItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, img, alt, largeImg, onClick }) => {
  return (
    <ImageItem
      id={id}
      onClick={() => {
        onClick({ largeImg, alt });
      }}
    >
      <GalleryImage src={img} alt={alt} />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
