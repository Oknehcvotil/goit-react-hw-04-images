import { useState } from 'react';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import ButtonLoadMore from 'components/ButtonLoadMore';
import Modal from 'components/Modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContainer } from './App.styled';

// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [modalValue, setModalValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleModal = modalValue => {
    setModalValue(modalValue);

    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  const handleSearch = value => {
    if (value === searchValue) {
      return;
    }

    setSearchValue(value);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleLoader = () => {
    setIsLoading(isLoading => !isLoading);
  };

  const handleLoadMore = value => {
    setIsLoadMore(value);
  };

  return (
    <AppContainer>
      {isModalOpen && <Modal data={modalValue} onClose={handleModal} />}
      {isLoading && <Loader />}
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery
        page={page}
        searchValue={searchValue}
        onLoader={handleLoader}
        onLoadMore={handleLoadMore}
        onClick={handleModal}
      />
      {isLoadMore && <ButtonLoadMore onClick={onLoadMore} />}
      <ToastContainer position="top-right" autoClose={3000} />
    </AppContainer>
  );
};

export default App;
