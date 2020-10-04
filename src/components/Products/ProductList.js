import React, { useEffect } from 'react';
import Product from './Product.js';
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";
import FilterSelect from "../FilterSelect";
import PropTypes from 'prop-types';
import Loading from '../Loading/LoadingWrapper.js';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import LoadingSeperator from '../Loading/LoadingSeperator.js';
import Breadcrumbs from '../BreadcrumbsNav.js';
import { connect } from 'react-redux';
import { addItem, fetchCategory, selectCategory, FETCH_CATEGORY } from '../../actions';
import { getVisibleProducts, getLoadingInfo } from '../../reducers/selectors.js';


const ProductList = ({
  products,
  categories,
  addToCart,
  fetchProducts,
  selectCategory,
  isFetching }) => {

  const { category, subCategory } = useParams();

  useEffect(() => {
    forceCheck();
  });

  useEffect(() => {
    console.log("remount");
  }, []);
  useEffect(() => {
    
    let subSlug = subCategory ? `/${subCategory}` : "";
    let slug = `${category}${subSlug}`;
    selectCategory(slug);
    fetchProducts(slug);
    console.log("fetch");
  }, [category, subCategory, selectCategory, fetchProducts]);

  if (categories.length === 0) return null;
  const categoryData = categories[category];
  const subCategoryData = subCategory ?
    categories[category].subcategories.find(sub =>
      sub.slug === subCategory) : null;

  const filterCategory = (categoryData && categoryData.filter) ? categoryData.filter : [];
  const filterSub = (subCategoryData && subCategoryData.filter) ? subCategoryData.filter : [];
  const filter = [].concat(filterCategory, filterSub);

  return (
    <div>
      <Breadcrumbs/>
      <FilterSelect filters={filter} />
      <LoadingSeperator isLoading={isFetching} text={products.length + " items found"} />
      <Loading loading={isFetching} >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {(products) && products.map(product => {
            return <Grid item key={product.id} sm={6} xs={12} md={4}>
              <LazyLoad once={true} height={200} offset = {400}>
                <Product product={product}
                  addToCart={addToCart} />
              </LazyLoad>
            </Grid>
          })}
        </Grid>
      </Loading>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
  addToCart: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
}

ProductList.defaultProps = {
  products: {},
  isFetching: false,
}

const mapDispatchToProps = dispatch => ({
  addToCart: (id) => dispatch(addItem(id, true)),
  fetchProducts: (category, subCategory) => dispatch(fetchCategory(category, subCategory)),
  selectCategory: (category) => dispatch(selectCategory(category))
});

const mapStateToProps = (state, props) => ({
  products: getVisibleProducts(state, props),
  isFetching: getLoadingInfo(state, FETCH_CATEGORY),
  categories: state.categories.categories
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
