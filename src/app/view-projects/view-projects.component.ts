import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit{

  product:any = {}

  constructor(private api:ApiService, private route:ActivatedRoute){}

ngOnInit(): void {
  this.route.params.subscribe((res:any) => {
    console.log(res);
    const {id} = res
    
    this.getProduct(id)
  })
}

getProduct(pid:any){
  this.api.viewProductAPI(pid).subscribe((res:any)=>{
    this.product = res
    console.log(this.product);
    
  })
}

addToCart(product:any){
  if(sessionStorage.getItem("token")){
    // proceed to cart
    product.quantity=1
    this.api.addToCartAPI(product).subscribe({
      next:(res:any)=>{
        alert(res)
        this.api.getCartCount()
      },error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }else{
  alert(`Please Login`)
  }
 }

 addToWishlist(product:any){
  if(sessionStorage.getItem("token")){
    this.api.addToWishlist(product).subscribe({
      next:(res:any)=>{
        alert(`product '${product.title}' added to wishlist`)
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
}
