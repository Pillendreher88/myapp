import React, { useEffect } from 'react'
import Review from './Review.js'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Loading from '../Loading/LoadingWrapper.js';
import { LoadingCircle } from '../Loading/LoadingSpinner.js';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import queryString from 'query-string';
import MultipleSelect from '../Inputs/MultipleSelectFilter.js';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import LoadingSeperator from '../Loading/LoadingSeperator.js';
import { connect } from 'react-redux';
import { fetchReviews, loadMoreReviews, postHelpful } from '../../actions';
import { getReviews, getPaginationReviews, getReviewsTitle } from '../../reducers/selectors.js';
import useApiStatus from '../../hooks/useApiStatus.js';
import { LinkWrap } from '../Utils/Link.js';


const Container = styled.div`
margin-bottom: 20px;
margin-top: 20px;
background-color: rgba(0,0,0,0.2);
text-align: center;
padding-top: 100px;
padding-bottom: 100px;
`;

const Title = styled(Typography)`
margin-bottom: 1rem;
margin-top: 20px;
margin-right: 10px;
`;

const ProductLink = styled(LinkWrap)`
padding: 1rem;
baackground-color: 
`;

const Reviews = ({ reviews = [],
  postHelpful,
  id,
  title,
  fetchReviews,
  loadMoreReviews,
  pagination,
  authenticated }) => {

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchReviews(id, location.search);
  }, [id, location]);

  const { isLoading } = useApiStatus("FETCH_REVIEWS");
  const { isLoadingMore } = useApiStatus("LOAD_MORE_REVIEWS");

  const queryParams = queryString.parse(location.search, { arrayFormat: 'bracket' });

  const handleChange = (event, key) => {
    const value = event.target.value;
    addQuery({ [key]: value });
  }

  const addQuery = (query) => {
    const string = queryString.stringify({ ...queryString.parse(location.search, { arrayFormat: 'bracket' }), ...query }, { arrayFormat: 'bracket' });
    history.push({ search: encodeURI(string) });
  }

  const changeOrderDirection = () => {

    if (queryParams.dir === "asc")
      addQuery({ dir: "desc" });
    else addQuery({ dir: "asc" });
  }

  const goToLogin = () => {
    history.push({
      pathname: "/login",
      state: { modalOpen: false, redirectTo: location.pathname }
    });
  }

  const renderReview = (review, index) => {

    return <Review review={review} key={review.title + index} onHelpfulClick={authenticated ? postHelpful : goToLogin} />
  }

  const renderToolTip = () => {

    if (queryParams.dir === "asc")
      return "Ascending Order";
    else {
      return "Descending Order";
    }
  }

  const optionsOrderBy = [
    { value: "helpful", label: "Helpfulness" },
    { value: "created_at", label: "Review Date" },
    { value: "rating", label: "Rating" },
  ];

  const filter = {
    key: "rating", label: "Filter by Rating",
    values: [{ label: "1 Star", key: "1" }, { label: "2 Stars", key: "2" },
    { label: "3 Stars", key: "3" }, { label: "4 Stars", key: "4" },
    { label: "5 Stars", key: "5" }]
  };

  return (
    <Loading loading={isLoading}>
      <Grid
        container
        item
        direction="row"
        justify="center"
        spacing={2}>
        <Grid item xs={12} md={7} sm={10}>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Title variant="h3" component="h1">
              {`Reviews of ${title}`}
            </Title>
            <LinkWrap to={`/product/${id}`}>
              <Button variant="outlined" color="secondary">
                To Productpage
              </Button>
            </LinkWrap>
          </Box>
          <Box display="flex" justifyContent="flex-start" mt={2} mb={1}>
            <Tooltip title={renderToolTip()}>
              <IconButton aria-label="direction" color="primary" onClick={changeOrderDirection}>
                {queryParams.dir === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </Tooltip>
            <Box mr={1}>
              <FormControl>
                <InputLabel>SortBy</InputLabel>
                <Select
                  value={queryParams.orderBy ? queryParams.orderBy : "helpful"}
                  onChange={(event) => handleChange(event, "orderBy")}>
                  {optionsOrderBy.map((option) =>
                    <MenuItem value={option.value} key={option.label}>{option.label}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
            <MultipleSelect label={filter.label}
              addQuery={addQuery}
              queryKey={filter.key}
              key={filter.key}
              width="150px"
              selectedStart={queryParams[filter.key] ? [].concat(queryParams[filter.key]) : []}
              values={filter.values} />
          </Box>
          <LoadingSeperator isLoading={isLoading} text={reviews.length + " reviews found"} />
          {(reviews && reviews.length > 0) ? reviews.map((review, index) => renderReview(review, index)) :
            (!isLoading ?
              <Container>
                <Typography variant="h6" display="block" gutterBottom>
                  There are unfortunately no reviews matching youre selection.
          </Typography>
              </Container> : null)}
        </Grid>
        <Grid item xs={12} justify="center" container>
          {isLoadingMore ? <LoadingCircle /> : (pagination && pagination.next_page_url) &&
            <Button onClick={() => loadMoreReviews(pagination.next_page_url)}
              variant="contained"
              color="primary">
              Load More Reviews
      </Button>}
        </Grid>
      </Grid>
    </Loading>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loadMoreReviews: (url) => dispatch(loadMoreReviews(url)),
  postHelpful: (id, isHelpful) => dispatch(postHelpful(id, isHelpful)),
  fetchReviews: (id, query) => dispatch(fetchReviews(id, query)),
});

const mapStateToProps = (state, ownProps) => ({
  reviews: getReviews(state, ownProps.match.params.id),
  pagination: getPaginationReviews(state, ownProps.match.params.id),
  id: ownProps.match.params.id,
  title: getReviewsTitle(state),
  user: state.auth.user,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);


