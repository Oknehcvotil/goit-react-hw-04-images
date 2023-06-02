import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import getImgs from 'services/getImgs';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGalleryCont } from './ImageGallery.styled';

const ImageGallery = ({ page, searchValue, onLoadMore, onLoader, onClick }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    fetchData();
  }, [page, searchValue]);

  async function fetchData() {
    if (page === 1) {
      onLoadMore(false);
      setImages([]);
    }

    onLoader();

    try {
      const data = await getImgs(searchValue, page);
      const { hits, totalHits } = data;

      const perPage = 12;
      const totalPages = Math.ceil(totalHits / perPage);

      if (totalHits === 0 || !hits) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      toast.success(`Hooray! We found ${totalHits} images.`);

      if (totalPages > 1) {
        onLoadMore(true);
      }

      if (totalPages > 1 && page === totalPages) {
        toast.info(
          "We're sorry, but you've reached the end of search results."
        );
        onLoadMore(false);
      }

      setImages(images => [...images, ...hits]);
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      onLoader();
    }
  }

  return (
    <ImageGalleryCont className="gallery">
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          img={webformatURL}
          largeImg={largeImageURL}
          alt={tags}
          onClick={onClick}
        />
      ))}
    </ImageGalleryCont>
  );
};

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  searchValue: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onLoader: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
