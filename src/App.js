import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import EditComponent from './pages/Edit';
import ListComponent from './pages/Home';
import LoginComponent from './pages/Login';
import Header from "./component/Header";
import NewServiceComponent from "./pages/NewService";

class App extends Component {
  render() {
    //const userID = localStorage.getItem("USERID");
    return (
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        <div className="d-flex" id="wrapper">

          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="ykb-bg"><span className="sidebar-heading logo"></span></div>
            <div className="list-group list-group-flush">
              <Link to="/home" className="list-group-item list-group-item-action bg-light">Ana Sayfa</Link>
              <Link to="/new-service" className="list-group-item list-group-item-action bg-light">Yeni Servis Ekle</Link>
            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom ykb-bg" style={{ fontSize: 28, color: "white", }}>
              <a href="#" id="menu-toggle"><span className="ykb-icon ykb-icon-menu" style={{ color: "white", fontSize: 24 }}></span></a>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <Header history={this.props.history}></Header>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="container-fluid">
              <Switch>
                <Route path="/new-service" component={NewServiceComponent} />
                <Route path="/home" component={ListComponent} />
                <Route path="/delete/:id" component={ListComponent} />
                <Route path="/edit/:id" component={EditComponent} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/" component={ListComponent} />
              </Switch>
            </div>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;