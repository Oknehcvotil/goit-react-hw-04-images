import PropTypes from 'prop-types';
import { IoSearchSharp } from 'react-icons/io5';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarCont,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';

const Searchbar = ({handleSearch}) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.warning('Please write what you are looking for.');
      return;
    }

    handleSearch(value);

    setValue('');
  };

  return (
    <SearchbarCont>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <IoSearchSharp style={{ width: 25, height: 25 }} />
        </SearchBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </SearchForm>
    </SearchbarCont>
  );
};

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Searchbar;
