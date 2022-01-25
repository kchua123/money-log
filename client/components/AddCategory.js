import React from "react";
import { addCategory } from "../store/categories"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AddCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addCategory({...this.state});
    this.setState({
      name: ""
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  render() {
    const { name } = this.state;
    const { handleSubmit } = this;

    return (
      <div className="container">
        <form className="add-form" onSubmit={handleSubmit}>

          <div className="mb-3 row">
            <label htmlFor="name" className="form-label">
              Category Name
            </label>
            <div className="col-sm-10">
              <input
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Category"
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3 mt-4 row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </div>
          </div>
          
        </form>
        </div>
    );
  }
}

const mapState = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCategory: (category) => dispatch(addCategory(category))
});

export default connect(mapState, mapDispatchToProps)(AddCategory);
