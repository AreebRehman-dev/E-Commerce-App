import React from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getCategories } from './apiAdmin';

import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const CategoryList = () => {
  const { user } = isAuthenticated();

  const [categories, setCategories] = React.useState([]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  React.useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title='Category List'
      description={`Hey ${user.name} ready to manage categories?`}
      crumb='Categories'
      actions={
        <Link to='/admin/dashboard' className='btn-x btn-x--outline'>
          <ArrowBackIcon />
          Back to Dashboard
        </Link>
      }
    >
      <div className='section section--sm'>
        <div className='shell shell--narrow' style={{ padding: 0 }}>
          <div className='panel'>
            <div className='panel-head'>
              <h3>Total {categories.length} categories</h3>
              <Link to='/create/category' className='btn-x btn-x--primary btn-x--sm'>
                <AddIcon />
                Add Category
              </Link>
            </div>

            {categories.length > 0 ? (
              <ul className='rowlist'>
                {categories.map((c, i) => (
                  <li key={i} className='rowitem'>
                    <span className='rowitem-index'>{i + 1}</span>
                    <span className='rowitem-main'>
                      <span className='rowitem-title'>{c.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='panel-body'>
                <div className='empty' style={{ border: 0, padding: '32px 16px' }}>
                  <span className='empty-icon'>
                    <CategoryIcon />
                  </span>
                  <h3>No categories found</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryList;
