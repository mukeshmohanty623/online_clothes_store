import React from 'react';
import Menu from './Menu';

const Base = ({
    title = "My Title",
    description = "My Description",
    className = "bg-black text-white p-4",
    children
})=>{
    return(
        <div className="content">
           <Menu></Menu>
            <div className="container-fluid">
                <div className="jumbotron bg-black text-white text-center">
                    <h4 className="display-4">{title}</h4>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark py-1 mt-auto">
                <div className="container-fluid bg-success text-white text-center py-2">
                    <h5>If you have any query feel free to contact us</h5>
                    <button className="btn btn-warning btn-sm">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">An Amazing <span className = "text-white">MERN</span> Bootcamp</span>
                </div>
            </footer>
        </div>
    );
}


export default Base;