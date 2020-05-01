import React, {Component} from 'react'
import './searchbar.css'
class ProductSearchBar extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            sliderValue : 0
        }
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
        <div class="col"><input type="text" class="form-control" placeholder='Name...' /></div>
        </div>
        <div class="form-group">
        <label class="col">Brand</label>
        <div class="col"><input type="text" class="form-control"  placeholder='Brand...' /></div>
         </div>
         <div class="form-group">
        {/* <label class="col">Cost</label> */}
        <div class="col">
        <label for="formControlRange" className='col text-center'>Price</label>
            <div className='row'>
            <div className='col-1 text-right'><del>N</del></div>
            <div className='col-8 text-left'>
            <span className='form-control'>
            <input type="range" onChange={e=>{this.setState({[e.target.name] : e.target.value})}}  value={this.state.sliderValue}
            name='sliderValue' class="form-control form-control-range slider" id="formControlRange" min="0" max="2000000" step='1' />
            </span>
            </div>
            <div className='col-3'><input className='form-control' name='sliderValue' onChange={e=>{this.setState({[e.target.name] : e.target.value})}}  value={this.state.sliderValue}/> </div>
            </div>
         </div>
         </div>
         <div class="form-group">
        <label class="col">Requires Prescription</label>
        <div class="col">
        <select type="text" class="form-control select"  placeholder='Requires Prescription...' >
            <option >All...</option>
            <option>Yes</option>
            <option>No</option>
        </select>
        </div>
        </div>
        <div class="form-group">
        <label class="col">Discounted</label>
        <div class="col">
        <select type="text" class="form-control select"  placeholder='Requires Prescription...' >
            <option >All...</option>
            <option>Yes</option>
            <option>No</option>
        </select>
        </div>
        </div>
        <div class="form-group">
        <label class="col">Tags</label>
        <div class="col">
        <input type="text" class="form-control"  placeholder='Tags...' />
        </div>
        </div>
        <div class="form-group">
        <label class="col"></label>
        <button class="search-btn btn btn-secondary shadow" type="button" title='search'>Search<i className="fas fa-search"></i></button>
        </div>
        <div class="form-group">
        <label class="col"></label>
        <button class="search-btn btn btn-secondary shadow" type="button" title='clear'><i className="fas fa-times"></i>Reset</button>
        </div>
    </div>
        </form>
      </div>
  </div>
             {/* </div> */}

        </>)
    }
}
export default ProductSearchBar