import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component{

    render(){
        const {alertData}=this.props;
        return(
            <div>
                {Object.keys(alertData).length>0&&!alertData.status &&  <div className="alert alert-danger alert-dismissible text-center" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>{alertData.msg}</strong>
                </div>}

                {Object.keys(alertData).length>0&&alertData.status && <div className="alert alert-success alert-dismissible text-center" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>{alertData.msg}</strong>
                </div>}
            </div>
        );
    }
}


Alert.propTypes ={
    alertData:PropTypes.object.isRequired,
}


export default Alert
