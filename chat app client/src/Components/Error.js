import { connect } from "react-redux";

function Error(props) {
  return props.errors.map((error, index) => {
    return (
      <div key={index} className="row">
        <div
          key={index}
          className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-8 offset-2 text-center font-italic p-2 mt-2 border rounded bg-danger text-light"
        >
          {error.msg}
        </div>
      </div>
    );
  });
}

const mapStateToProps = (state) => {
  return { errors: state.login.errors };
};

export default connect(mapStateToProps, null)(Error);
