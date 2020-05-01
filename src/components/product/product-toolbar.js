import React, {Component} from 'react'
import './toolbar.css'

class ProductToolBar extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            homeAction : props.homeAction,
            searchAction : props.searchAction,
            saveAction : props.saveAction,
            editAction : props.editAction,
            previewAction : props.previewAction,
            deleteAction : props.deleteAction,
            backAction : props.backAction,
            clearAction : props.clearAction,
            homeDisabled : props.homeDisabled,
            searchDisabled : props.searchDisabled,
            saveDisabled : props.saveDisabled,
            previewDisabled : props.previewDisabled,
            deleteDisabled : props.deleteDisabled,
            editDisabled : props.editDisabled,
            backDisabled : props.backDisabled,
            clearDisabled : props.clearDisabled
        }
    }
    RenderHome=()=>{
        if(this.state.homeDisabled !== true)
        {
            return <a href="#/" title="home" className="active"  onClick={this.state.homeAction}><i class="fas fa-home"></i></a>
        }
    }
    RenderPreview=()=>{
        if(this.state.previewDisabled !== true)
        {
            return <a href="#/" title="preview"  onClick={this.state.previewAction} disabled={this.state.previewDisabled}><i class="fas fa-eye"></i></a>
        }
    }
    RenderEdit=()=>{
        if(this.state.editDisabled !== true)
        {
            return <a href="#/" title="edit" onClick={this.state.editAction}><i class="fas fa-pencil-square-o"></i></a>
        }
    }
    RenderSave=()=>{
        if(this.state.saveDisabled !== true)
        {
            return <a href="#/" title="save" onClick={this.state.saveAction}><i class="fas fa-floppy-o"></i></a>
        }
    }
    RenderDelete=()=>{
        if(this.state.deleteDisabled !== true)
        {
            return <a href="#/" title="delete" onClick={this.state.deleteAction}><i class="fas fa-trash"></i></a>
        }
    }
    RenderSearch=()=>{
        if(this.state.searchDisabled !== true)
        {
            return <a href="#/" title="search" onClick={this.state.searchAction}><i class="fas fa-search"></i></a>
        }
    }
    RenderBack=()=>{
        if(this.state.backDisabled !== true)
        {
            return <a href="#/" title="back" onClick={this.state.backAction}><i class="fas fa-chevron-left"></i></a>
        }
    }
    RenderClear=()=>{
        if(this.state.clearDisabled !== true)
        {
            return <a href="#/" title="clear" onClick={this.state.clearAction}><i class="fas fa-times"></i></a>
        }
    }
    render(){
        return(<>
        <div className="row">
        <div class="icon-bar">
            {this.RenderHome()}
            {this.RenderSave()}
            {/* <a class="active" title="home" href="#/"  onClick={this.state.homeAction} disabled={this.state.homeDisabled}><i class="fas fa-home"></i></a>  */}
            {/* <a href="" title="save" onClick={this.state.saveAction} disabled={this.state.saveDisabled}><i class="fas fa-floppy-o"></i></a> */}
            {this.RenderEdit()}
            {this.RenderSearch()}
            {/* <a href="" title="search"  onClick={this.state.searchAction} disabled={this.state.searchDisabled}><i class="fas fa-search"></i></a>   */}
            
            {this.RenderPreview()}
            {this.RenderDelete()}
            {this.RenderClear()}
            {this.RenderBack()}
            
            {/* <a href="" title="clear"><i class="fas fa-trash"  onClick={this.state.deleteAction} disabled={this.state.deleteDisabled}></i></a>  */}
        </div>
        </div>
        </>)
    }
}
export default ProductToolBar
