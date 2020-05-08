import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function AppFooter(props) {
  const { loading } = props.post;

  return (
    <Fragment>
      {!loading ? (
        <footer style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>
            <small>
              Created by Andrey Varlamov &copy;
              <a
                href="https://github.com/andreyvarlamov/andrey-blog-v2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"   "}
                Github
              </a>
            </small>
          </p>
        </footer>
      ) : null}
    </Fragment>
  );
}

AppFooter.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, null)(AppFooter);
