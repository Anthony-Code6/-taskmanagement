import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSupabaseService } from '../services/auth-supabase.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  if (inject(AuthSupabaseService).isLoggeIn()) {
    return true
  }
  inject(Router).navigate(['/'])
  return false

};
