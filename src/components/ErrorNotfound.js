import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

function ErrorNotfound () {
    return (
        <div>
            <h1> Error 404: Page not found</h1>
        </div>
    )
}

export default withRouter(connect()(ErrorNotfound));