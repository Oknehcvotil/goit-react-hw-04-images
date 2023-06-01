import { Component } from 'react';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import ButtonLoadMore from 'components/ButtonLoadMore';
import Modal from 'components/Modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContainer } from './App.styled';

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    modalValue: {},
    isLoading: false,
    isLoadMore: false,
    isModalOpen: false,
  };

  handleModal = modalValue => {
    this.setState({ modalValue });

    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  handleSearch = searchValue => {
    if (searchValue === this.state.searchValue) {
      return;
    }
    this.setState({ searchValue });
    this.setState({ page: 1 });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  handleLoadMore = value => {
    this.setState({ isLoadMore: value });
  };

  render() {
    const {
      isLoading,
      page,
      searchValue,
      isLoadMore,
      isModalOpen,
      modalValue,
    } = this.state;

    return (
      <AppContainer>
        {isModalOpen && <Modal data={modalValue} onClose={this.handleModal} />}
        {isLoading && <Loader />}
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery
          page={page}
          searchValue={searchValue}
          onLoader={this.handleLoader}
          onLoadMore={this.handleLoadMore}
          onClick={this.handleModal}
        />
        {isLoadMore && <ButtonLoadMore onClick={this.onLoadMore} />}
        <ToastContainer position="top-right" autoClose={3000} />
      </AppContainer>
    );
  }
}

export default App;
