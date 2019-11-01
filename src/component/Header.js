import React from 'react';
import {
    Link
} from 'react-router-dom';
import { withRouter } from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem('USERID');
        localStorage.removeItem('USEREMAIL');
        localStorage.removeItem('USERNAME');
        return this.props.history.push('/login');
    }

    render() {
        const userId= localStorage.getItem('USERID');
        let loginLink = null;
        if (userId === null) {
            loginLink = <Link to="/login" className="nav-link"><span className="ykb-icon ykb-icon-avatar" style={{ color: "white" }}></span></Link>;
        } else {
            loginLink = <div className="row"><span style={{color:"white", fontSize:20, marginRight:15, marginTop:12}}>Hoşgeldin {localStorage.getItem('USERNAME')}</span><Link to="#" className="nav-link" onClick={this.handleLogout}><span className="ykb-icon ykb-icon-power-off" style={{ color: "white" }}></span></Link></div>;
        }
        return (
            <div>
                {loginLink}
            </div >
        );
    }

}
export default withRouter(Header);