import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allProducts:any =[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getWishlist().subscribe((res:any)=>{
      this.allProducts = res
      console.log(this.allProducts)
      this.api.getWishlistCount()

    })
  }

  removeItem(id:any){
    this.api.removeWishlist(id).subscribe((res:any)=>{
      this.getWishlist()
    })
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      // proceed to cart
      product.quantity=1
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          alert(`'${product.title}' added to cart`)
          this.api.getWishlistCount()
          this.api.getCartCount()
          this.removeItem(product._id) 
        },error:(reason:any)=>{
          alert(reason.error)
        }
      })
    }else{
    alert(`Please Login`)
    }
   }


}
