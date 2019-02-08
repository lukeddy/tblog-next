import React from "react";
import PropTypes from 'prop-types';

class Pagination extends React.Component{


    prePage() {
        let {currentPage} = this.props
        if (--currentPage === 0) {
            return false
        }
        this.props.jumpPage(currentPage)
    }

    nextPage() {
        let {currentPage,totalPages} = this.props
        if (++currentPage > totalPages) {
            return false
        }
        this.props.jumpPage(currentPage)
    }

    render(){
        const {totalPages,currentPage,jumpPage}=this.props
        return (
            <nav>
                <ul className="pagination">
                    <li className={currentPage===1?'disabled':''}>
                        <span className="page-link" onClick={this.prePage.bind(this)}>«</span>
                    </li>
                    {[...Array(totalPages)].map((e, i) => {
                        const pageNo=i+1
                        return(
                            <li key={pageNo} className={currentPage===pageNo?'active':''}>

                                <span className="page-link" onClick={jumpPage.bind(this,pageNo)}>{pageNo}</span>
                            </li>
                        )
                    })}
                    <li className={currentPage===totalPages?'disabled':''}>
                        <span className="page-link" onClick={this.nextPage.bind(this)}>»</span>
                    </li>
                    <li>
                        <span>当前第{currentPage}页,共{totalPages}页</span>
                    </li>
                </ul>
            </nav>
        );
    }
}

Pagination.propTypes={
  totalPages:PropTypes.number.isRequired,
  currentPage:PropTypes.number.isRequired,
  jumpPage:PropTypes.func.isRequired,
}

export default Pagination