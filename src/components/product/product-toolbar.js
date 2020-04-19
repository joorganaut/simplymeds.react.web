import React, {Component} from 'react'
import './toolbar.css'

class ProductToolBar extends Component{f
    constructor(props)
    {
        super(props)
        this.state={
            homeAction : props.homeAction,
            searchAction : props.searchAction,
            saveAction : props.saveAction,
            previewAction : props.previewAction,
            deleteAction : props.deleteAction,
        }
    }
    render(){
        return(<>
        <div className="row">
        <div class="icon-bar">
            <a class="active" title="home" href="#/"  onClick={this.state.homeAction}><i class="fas fa-home"></i></a> 
            <a href="" title="save" onClick={this.state.saveAction}><i class="fas fa-floppy-o"></i></a>
            <a href="" title="search"  onClick={this.state.searchAction}><i class="fas fa-search"></i></a>              
            <a href="" title="preview"  onClick={this.state.previewAction}><i class="fas fa-eye"></i></a>
            <a href="" title="clear"><i class="fas fa-trash"  onClick={this.state.deleteAction}></i></a> 
        </div>
        </div>
        </>)
    }
}
export default ProductToolBar
