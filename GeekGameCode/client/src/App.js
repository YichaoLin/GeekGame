import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import PrivateRoute from './common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import CreateProfile from './components/create-profile/CreateProfile';
import Post from './components/post/Post';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  // 解析token
  const decoded = jwt_decode(localStorage.jwtToken);
  // dispatch里面的东西是给reducer的
  store.dispatch(setCurrentUser(decoded));
  // 以上实现的功能，一旦登陆成功且没有过期，一直处于合法的状态（之前已经把登陆成功的信息储存在LS里了
  // 检测token是否过期

  // 获取当前时间
  const currentTime = Date.now() / 1000;

  // 判断当前是否大于token过期时间
  if (decoded.exp < currentTime) {
    // 过期
    store.dispatch(logoutUser());

    // TODO: 清除用户信息

    // 页面跳转
    window.location.href = "/login";
  }
}


class App extends Component {
  render() {
    return (
      // provider在根组件外面包了一层，这样一来，App的所有组件就默认都可以拿到state了
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* exact means only in this router this page will be posted */}
            <Route exact path="/" component={Landing} />
            <div className="contaier">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/profiles" component={Profiles} /> */}
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profiles" component={Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
