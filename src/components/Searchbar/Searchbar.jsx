import PropTypes from 'prop-types';
import { IoSearchSharp } from 'react-icons/io5';
import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarCont,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  static propTypes = {
    handleSearch: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      toast.warning('Please write what you are looking for.');
      return;
    }

    this.props.handleSearch(this.state.value);

    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchbarCont>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <IoSearchSharp style={{ width: 25, height: 25 }} />
          </SearchBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </SearchForm>
      </SearchbarCont>
    );
  }
}

export default Searchbar;
