import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import getImgs from 'services/getImgs';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGalleryCont } from './ImageGallery.styled';

class ImageGallery extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    searchValue: PropTypes.string.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    onLoader: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    images: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchValue, onLoadMore, onLoader } = this.props;

    if (prevProps.searchValue !== searchValue || prevProps.page !== page) {
      if (prevProps.searchValue !== searchValue) {
        onLoadMore(false);
        this.setState({ images: [] });
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

        if (totalPages > 1) {
          onLoadMore(true);
        }

        if (page === totalPages) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
          onLoadMore(false);
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        this.setState(state => ({ images: [...state.images, ...hits] }));
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        this.props.onLoader();
      }
    }
  }

  render() {
    const { images } = this.state;
    const { onClick } = this.props;

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
  }
}

export default ImageGallery;
