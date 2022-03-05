import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
import { TokenStorageService } from "../_services/token-storage.service";
//import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private tokenStorage: TokenStorageService,
		private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
		//var isAuthenticated = this.authService.getAuthStatus();
		if (!this.tokenStorage.getToken()) {
			this.router.navigate(['/login']);
		}
		return true;
	}
}
