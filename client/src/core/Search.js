import React, { useState, useEffect } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import SearchOffIcon from '@material-ui/icons/SearchOutlined';

import { getCategories, list, getFilteredProducts } from './apiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories = [], category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setData((prev) => ({ ...prev, categories: response }));
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    const byCategory = category && category !== 'All';

    if (search) {
      list({ search: search || undefined, category: category || undefined }).then((response) => {
        if (!response || response.error) {
          console.log(response && response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
      return;
    }

    if (byCategory) {
      getFilteredProducts(0, 100, { category: [category], price: [] }).then((response) => {
        if (!response || response.error) {
          console.log(response && response.error);
        } else {
          setData({ ...data, results: response.data || [], searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `Search: No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    if (!searched) return null;

    return (
      <section className='section' aria-live='polite'>
        <div className='section-head'>
          <h2 className='section-title'>{searchMessage(searched, results)}</h2>
        </div>

        {results.length > 0 ? (
          <div className='grid-products fade-in'>
            {results.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <span className='empty-icon'>
              <SearchOffIcon />
            </span>
            <h3>Nothing matched your search</h3>
            <p>Try a different keyword, or widen the search by selecting another category.</p>
          </div>
        )}
      </section>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit} className='searchbar' role='search'>
      <div className='searchbar-cat'>
        <label className='sr-only' htmlFor='search-category'>
          Category
        </label>
        <select
          id='search-category'
          className='select'
          value={category || 'All'}
          onChange={handleChange('category')}
        >
          <option value='All'>All categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className='searchbar-field'>
        <SearchIcon />
        <label className='sr-only' htmlFor='search-input'>
          Search by name
        </label>
        <input
          id='search-input'
          className='input'
          type='text'
          placeholder='Search by name…'
          autoComplete='off'
          value={search || ''}
          onChange={handleChange('search')}
        />
      </div>

      <button
        type='submit'
        className='btn-x btn-x--primary'
        disabled={!search && (!category || category === 'All')}
      >
        Search
      </button>
    </form>
  );

  return (
    <div>
      <div className='searchwrap'>{searchForm()}</div>
      {searchedProducts(results)}
    </div>
  );
};

export default Search;
