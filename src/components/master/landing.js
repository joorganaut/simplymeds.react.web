import React, {Component} from 'react'
import background from './Pharmacy/images/hero_1.jpg';
import bg2 from './Pharmacy/images/bg_2.jpg';//'./Pharmacy/images/bg_2.jpg';
import bg1 from './Pharmacy/images/bg_1.jpg';
import person1 from './Pharmacy/images/person_1.jpg';
import person2 from './Pharmacy/images/person_2.jpg';
import person3 from './Pharmacy/images/person_3.jpg';
import person4 from './Pharmacy/images/person_4.jpg';
import person5 from './Pharmacy/images/person_5.jpg';
import product1 from './Pharmacy/images/products_1.png';
import product01 from './Pharmacy/images/product_01.png';
import product02 from './Pharmacy/images/product_02.png';
import product03 from './Pharmacy/images/product_03.png';
import product04 from './Pharmacy/images/product_04.png';
import product05 from './Pharmacy/images/product_05.png';
import product06 from './Pharmacy/images/product_06.png';
import product07 from './Pharmacy/images/product_07_large.png';
// import './Pharmacy/css/owl.carousel.min.css';

// "background-image: url('@Url.Content("~/App_Themes/Pharmacy/images/bg_2.jpg")');"


class Landing extends Component{
render(){
    return(
        <div>
        <div className="site-blocks-cover" style={{backgroundImage: `url('${background}')`}}>
    <div className="container">
        <div className="row">
            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
                <div className="site-block-cover-content text-center">
                    <h2 className="sub-title">Effective Medicine, New Medicine Everyday</h2>
                    <h1>Welcome To Simply Meds<small>&reg;</small></h1>
                    <p>
                        <a href="#" className="btn btn-primary px-5 py-3">Shop Now</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div className="site-section">
    <div className="container">
        <div className="row align-items-stretch section-overlap">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap bg-primary h-100">
                    <a href="#" className="h-100">
                        <h5>Free <br /> Shipping</h5>
                        <p>
                            Amet sit amet dolor
                            <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                        </p>
                    </a>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap h-100">
                    <a href="#" className="h-100">
                        <h5>Season <br /> Sale 50% Off</h5>
                        <p>
                            Amet sit amet dolor
                            <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                        </p>
                    </a>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap bg-warning h-100">
                    <a href="#" className="h-100">
                        <h5>Buy <br /> A Gift Card</h5>
                        <p>
                            Amet sit amet dolor
                            <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                        </p>
                    </a>
                </div>
            </div>

        </div>
    </div>
</div>

<div className="site-section">
    <div className="container">
        <div className="row">
            <div className="title-section text-center col-12">
                <h2 className="text-uppercase">Popular Products</h2>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                
                <span data-toggle="modal" className="tag align-top" data-target="#ProductModal">View</span>
                <a href="shop-single.html"> <img src={product01} alt="Image"/></a>
                <h3 className="text-dark"><a href="shop-single.html">Bioderma</a></h3>
                <p className="price"><del>95.00</del> &mdash; $55.00</p>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                <span data-toggle="modal" className="tag align-top" data-target="#ProductModal">View</span>
                <a href="shop-single.html"> <img src={product02} alt="Image"/></a>
                <h3 className="text-dark"><a href="shop-single.html">Chanca Piedra</a></h3>
                <p className="price">$70.00</p>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                <span data-toggle="modal" className="tag align-top" data-target="#ProductModal">View</span>
                <a href="shop-single.html"> <img src={product03} alt="Image"/></a>
                <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                <p className="price">$120.00</p>
            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                <span data-toggle="modal" className="tag align-top" data-target="#ProductModal">View</span>
                <a href="shop-single.html"> <img src={product04} alt="Image"/></a>
                <h3 className="text-dark"><a href="shop-single.html">Cetyl Pure</a></h3>
                <p className="price"><del>45.00</del> &mdash; $20.00</p>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                <span data-toggle="modal" className="tag align-top" data-target="#ProductModal">View</span>
                <a href="shop-single.html"> <img src={product05} alt="Image"/></a>
                <h3 className="text-dark"><a href="shop-single.html">CLA Core</a></h3>
                <p className="price">$38.00</p>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                
                <span data-toggle="modal" className="tag align-top" data-target="#ProductModal">View</span>
                <a href="shop-single.html"> <img src={product06} alt="Image"/></a>
                <h3 className="text-dark"><a href="shop-single.html">Poo Pourri</a></h3>
                <p className="price"><del>$89</del> &mdash; $38.00</p>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-12 text-center">
                <a href="shop.html" className="btn btn-primary px-4 py-3">View All Products</a>
            </div>
        </div>
    </div>
</div>


<div className="site-section bg-light">
    <div className="container">
        <div className="row">
            <div className="title-section text-center col-12">
                <h2 className="text-uppercase">New Products</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 block-3 products-wrap">
                <div className="nonloop-block-3 owl-carousel">

                    <div className="text-center item mb-4" >
                        <a href="shop-single.html"> <img src={product03} alt="Image"/></a>
                        <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                        <p className="price">$120.00</p>
                    </div>

                    <div className="text-center item mb-4">
                        <a href="shop-single.html"> <img src={product01} alt="Image"/></a>
                        <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                        <p className="price">$120.00</p>
                    </div>

                    <div className="text-center item mb-4">
                        <a href="shop-single.html"> <img src={product02} alt="Image"/></a>
                        <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                        <p className="price">$120.00</p>
                    </div>

                    <div className="text-center item mb-4">
                        <a href="shop-single.html"> <img src={product04} alt="Image"/></a>
                        <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                        <p className="price">$120.00</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<div className="site-section">
    <div className="container">
        <div className="row">
            <div className="title-section text-center col-12">
                <h2 className="text-uppercase">Testimonials</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 block-3 products-wrap">
                <div className="nonloop-block-3 no-direction owl-carousel">

                    <div className="testimony">
                        <blockquote>
                            <img src={person1} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat unde.&rdquo;</p>
                        </blockquote>

                        <p>&mdash; Kelly Holmes</p>
                    </div>

                    <div className="testimony">
                        <blockquote>
                            <img src={person2} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>
                                &ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                                obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                                unde.&rdquo;
                            </p>
                        </blockquote>

                        <p>&mdash; Rebecca Morando</p>
                    </div>

                    <div className="testimony">
                        <blockquote>
                            <img src={person3} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>
                                &ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                                obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                                unde.&rdquo;
                            </p>
                        </blockquote>

                        <p>&mdash; Lucas Gallone</p>
                    </div>

                    <div className="testimony">
                        <blockquote>
                            <img src={person4} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>
                                &ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                                obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                                unde.&rdquo;
                            </p>
                        </blockquote>

                        <p>&mdash; Andrew Neel</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<div className="site-section bg-secondary bg-image" style={{backgroundImage:`url(${bg2})`}}>
    <div className="container">
        <div className="row align-items-stretch">
            <div className="col-lg-6 mb-5 mb-lg-0">
                <a href="#" className="banner-1 h-100 d-flex" style={{backgroundImage:`url(${bg1})`}}>
                    <div className="banner-1-inner align-self-center">
                        <h2>Pharma Products</h2>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                        </p>
                    </div>
                </a>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
                <a href="#" className="banner-1 h-100 d-flex" style={{backgroundImage:`url(${bg2})`}}>
                    <div className="banner-1-inner ml-auto  align-self-center">
                        <h2>Rated by Experts</h2>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
</div>
    );
}

}
export default Landing;