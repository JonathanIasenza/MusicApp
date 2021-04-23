import React from 'react';
import { Spinner } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Loading.css'

const Loading = () => {
    return (
        <div className="loader">
            <Spinner id="spinner" color="light"></Spinner>
            <h1 className="loading-title">Loading...</h1>
        </div>
    )
}

export default Loading;