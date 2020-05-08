import React, { Fragment } from "react";
import { DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setFilter as setFilterAction } from "../redux/actions/postActions";

function MyPostsButton(props) {
  const { filter } = props.post;
  const { user, setFilter } = props;

  const filterClick = () => {
    setFilter({ id: user._id, name: user.name });
  };

  return (
    <Fragment>
      {filter && filter.id === user._id ? null : (
        <DropdownItem onClick={filterClick}>My Posts</DropdownItem>
      )}
    </Fragment>
  );
}

MyPostsButton.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    post: state.post,
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filter => dispatch(setFilterAction(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsButton);
