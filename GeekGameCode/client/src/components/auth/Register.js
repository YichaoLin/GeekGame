

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

/** react-redux 的两个最主要功能
 *  connect: 用于从 UI 组件生成容器组件, 将两种组件连起来
 *  Provider: 可以让组件及子组件拿到state
 */
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { PropTypes } from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '', 
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // 取消默认事件 
    e.preventDefault(); 
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // 调用action
    this.props.registerUser(newUser, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }


  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth; 这里可以拿到当前组件的auth值

    return (
      <div className="register">
        {/* {user ? user.name : null} */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Welcome to Geek Camp</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="username"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  // The page will display what you wirte
                  error={errors.name}
                />

                <TextFieldGroup
                  type="email"
                  placeholder="email address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="enter your password again"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  } 
}
// 传来的registerUser必须是函数，auth必须是对象，errors必须是对象
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired 
}

// 将状态映射为属性，把更新的users的信息拿到
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

// export default Register;
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
