import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allProducts:any=[]
  constructor(private api:ApiService){}

 ngOnInit(): void {
   this.getAllProducts()
 }

 getAllProducts(){
  this.api.getAllProductAPI().subscribe({
    next:(res:any)=>{
      this.allProducts = res
    },
    error:(reason:any)=>{
      console.log(reason)
    }
  })
 }

 addToWishlist(product:any){
  if(sessionStorage.getItem("token")){
    this.api.addToWishlist(product).subscribe({
      next:(res:any)=>{
        alert(`'${product.title}' added to wishlist`)
        this.api.getWishlistCount()
      },
      error:(reason:any)=>{
        console.log(reason);
        alert(reason.error)
      }
    })
  }else{
  alert(`Please Login`)
  }
 }

 
 addToCart(product:any){
  if(sessionStorage.getItem("token")){
    // proceed to cart
    product.quantity=1
    this.api.addToCartAPI(product).subscribe({
      next:(res:any)=>{
        alert(`'${product.title}' added to cart`)
        this.api.getCartCount()
      },error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }else{
  alert(`Please Login`)
  }
 }
}
