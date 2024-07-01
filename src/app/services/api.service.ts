import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  SERVER_URL = "https://mean-e-cart.onrender.com"

  constructor(private http:HttpClient) {
    
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }
  
  // register
  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`, user)
  }

  // login
  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`, user)
  }

  // getAllProducts
  getAllProductAPI(){
    return this.http.get(`${this.SERVER_URL}/allproducts`)
  }

  // viewProducts
  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/viewproduct/${id}`)
  }

  // addToWishlist
  appendTokenHeader(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return {headers}
  }
  // axios gives header as an object directly. httpclient does not do this, it has to be done manually.

  addToWishlist(product:any){
    return this.http.post(`${this.SERVER_URL}/addtowishlist`, product, this.appendTokenHeader())
  }

  getWishlist(){
    return this.http.get(`${this.SERVER_URL}/getwishlist`, this.appendTokenHeader())
  }
  getWishlistCount(){
    this.getWishlist().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }
  // remove wishlist
  removeWishlist(id:any){
    return this.http.delete(`${this.SERVER_URL}/removewishlist/${id}`, this.appendTokenHeader())
  }

  // addToCart
  addToCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/addtocart`, product, this.appendTokenHeader())
  }
  // getCartAPI
  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/getcart`, this.appendTokenHeader())
  }
  getCartCount(){
    this.getCartAPI().subscribe((res:any)=> {
      this.cartCount.next(res.length)
    })
  }

// remove cart
  removeCart(id:any){
    return this.http.delete(`${this.SERVER_URL}/removecart/${id}`, this.appendTokenHeader())
  }

  // increment item
  incrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cartincrement/${id}`, this.appendTokenHeader())
  }
  // decrement item
  decrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cartdecrement/${id}`, this.appendTokenHeader())
  }
  // empty cart
  emptyCartAPI(){
    return this.http.delete(`${this.SERVER_URL}/emptycart`, this.appendTokenHeader())
  }



}

