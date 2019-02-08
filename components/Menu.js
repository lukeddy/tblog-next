import React from "react";
import PropTypes from "prop-types";

class Menu extends React.Component{

    clickTab=(tab)=>{
        this.props.goToTab(tab);
    }

    render(){
        const {catList,currentTab}=this.props

        return(
            <div>
                <span onClick={this.clickTab.bind(this,'all')} className={`link topic-tab ${currentTab==="all"?'current-tab':''}`}>全部</span>
                {catList.slice(0,6).map((cat,index)=>{
                    return (
                        <span key={index} onClick={this.clickTab.bind(this,cat.catDir)} className={`link topic-tab ${currentTab===cat.catDir?'current-tab':''}`}>{cat.catName}</span>
                    )
                })}

                {catList.length>6 &&
                    <span className="dropdown">
                        <a href="/" className="dropdown-toggle topic-tab" data-toggle="dropdown">更多 <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          {catList.slice(6,catList.length).map((cat,index)=>{
                              return (
                                  <li key={index} onClick={this.clickTab.bind(this,cat.catDir)}
                                      className={`link topic-tab ${currentTab===cat.catDir?'current-tab':''}`}>
                                      <span>{cat.catName}</span>
                                  </li>
                              )
                          })}
                        </ul>
                    </span>
                }
            </div>
        );
    }
}

PropTypes.propTypes={
    catList:PropTypes.array.isRequired,
    currentTab:PropTypes.string.isRequired,
    goToTab:PropTypes.func.isRequired,
}

export default Menu