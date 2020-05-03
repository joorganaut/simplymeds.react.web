import React, {Component} from 'react'
import './searchbar.css'
class ProductSearchBar extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            sliderValue : 0, 
            SearchAction : this.props.SearchAction,
            ClearAction : this.props.ClearAction,
            Name : '',
            Brand : '',
            Price : 0,
            IsPrescription : '',
            Discounted : '',
            Tags : ''
        }
        this.Search = this.Search.bind(this)
    }
    Search=async ()=>{
        const params = {
            Name : this.state.Name,
            Price : this.state.Price,
            Brand : this.state.Brand, 
            IsPrescription : this.state.IsPrescription,
            Discounted : this.state.Discounted,
            Tags : this.state.Tags
        }
        await this.state.SearchAction(params)
    }
    handleUserInput=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        return(<>
            {/* <div class='container'> */}
  <div class='row'>
      <div class=''>
        <form class='search-form form-horizontal'>
        <div class="row">
         <div class="form-group">
        <label class="col">Name</label>
        <div class="col"><input type="text" name='Name' defaultValue={this.state.Name} class="form-control" placeholder='Name...' onChange={this.handleUserInput} /></div>
        </div>
        <div class="form-group">
        <label class="col">Brand</label>
        <div class="col"><input type="text" class="form-control" name='Brand' defaultValue={this.state.Brand}  placeholder='Brand...' onChange={this.handleUserInput} /></div>
         </div>
         <div class="form-group">
        {/* <label class="col">Cost</label> */}
        <div class="col">
        <label htmlFor="formControlRange" className='col text-center'>Price</label>
            <div className='row'>
            <div className='col-1 text-right'><del>N</del></div>
            <div className='col-8 text-left'>
            <span className='form-control'>
            <input type="range" onChange={e=>{this.setState({[e.target.name] : e.target.value, Price : e.target.value})}}  value={this.state.sliderValue}
            name='sliderValue' class="form-control form-control-range slider" id="formControlRange" min="0" max="2000000" step='1' />
            </span>
            </div>
            <div className='col-3'><input className='form-control' htmlFor='formControlRange' name='Price' onChange={(e)=>{this.handleUserInput(e); this.setState({sliderValue : e.target.value})}}  value={this.state.Price}/> </div>
            </div>
         </div>
         </div>
         <div class="form-group">
        <label class="col">Requires Prescription</label>
        <div class="col">
        <select type="text" class="form-control select" name='IsPrescription' value={this.state.IsPrescription} onChange={this.handleUserInput}  placeholder='Requires Prescription...' >
            <option value={''}>All...</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
        </select>
        </div>
        </div>
        <div class="form-group">
        <label class="col">Discounted</label>
        <div class="col">
        <select type="text" class="form-control select" name='Discounted' value={this.state.Discounted} onChange={this.handleUserInput}   placeholder='Requires Prescription...' >
            <option value={''}>All...</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
        </select>
        </div>
        </div>
        <div class="form-group">
        <label class="col">Tags</label>
        <div class="col">
        <input type="text" class="form-control"  placeholder='Tags...' name='Tags' value={this.state.Tags} onChange={this.handleUserInput}  />
        </div>
        </div>
        <div class="form-group">
        <label class="col"></label>
        <button class="search-btn btn btn-secondary shadow" type="button" title='search' onClick={this.Search}>Search<i className="fas fa-search"></i></button>
        </div>
        {/* <div class="form-group">
        <label class="col"></label>
        <button class="search-btn btn btn-secondary shadow" type="button" title='clear'><i className="fas fa-times"></i>Reset</button>
        </div> */}
    </div>
        </form>
      </div>
  </div>
             {/* </div> */}

        </>)
    }
}
export default ProductSearchBar