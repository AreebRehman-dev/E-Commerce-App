import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import Search from './Search';
import { prices } from './fixedPrices';

import TuneIcon from '@material-ui/icons/Tune';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Inventory2Icon from '@material-ui/icons/Category';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className='u-center' style={{ marginTop: 36 }}>
          <button type='button' onClick={loadMore} className='btn-x btn-x--dark btn-x--lg'>
            Load more
            <ExpandMoreIcon />
          </button>
        </div>
      )
    );
  };

  // Deliberately mount-only. Listing `loadFilteredResults` here would re-run
  // this effect whenever `skip` changes, and since it resets `skip` to 0 that
  // would undo every "Load more" the moment it completed.
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout title='Shop page' description='Search and find books'>
      <Search />

      {error && (
        <div className='section section--sm'>
          <div className='notice notice--error'>{error}</div>
        </div>
      )}

      <div className='section'>
        <div className='shop-layout'>
          <aside className='panel panel--sticky'>
            <div className='panel-head'>
              <h4>
                <span className='u-flex'>
                  <TuneIcon style={{ fontSize: 19, opacity: 0.6 }} />
                  Filters
                </span>
              </h4>
            </div>

            <div className='panel-body'>
              <div className='filter-group'>
                <h5 className='filter-title'>Filter by categories</h5>
                <ul className='filter-list'>
                  <Checkbox
                    categories={categories}
                    handleFilters={(filters) => handleFilters(filters, 'category')}
                  />
                </ul>
              </div>

              <div className='filter-group'>
                <h5 className='filter-title'>Filter by price range</h5>
                <div className='filter-list'>
                  <RadioBox
                    prices={prices}
                    handleFilters={(filters) => handleFilters(filters, 'price')}
                  />
                </div>
              </div>
            </div>
          </aside>

          <section>
            <div className='section-head' style={{ marginBottom: 22 }}>
              <h2 className='section-title'>Products</h2>
              {filteredResults.length > 0 && (
                <span className='chip chip--brand'>
                  <Inventory2Icon />
                  {filteredResults.length} shown
                </span>
              )}
            </div>

            {filteredResults.length > 0 ? (
              <div className='grid-products grid-products--tight fade-in'>
                {filteredResults.map((product, i) => (
                  <Card key={i} product={product} />
                ))}
              </div>
            ) : (
              <div className='empty'>
                <span className='empty-icon'>
                  <TuneIcon />
                </span>
                <h3>No products match these filters</h3>
                <p>Clear a filter or pick a wider price range to see more results.</p>
              </div>
            )}

            {loadMoreButton()}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
