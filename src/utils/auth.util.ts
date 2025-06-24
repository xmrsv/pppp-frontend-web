import type { User } from "../modules/users/user.entity";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasRole: (roleName: string) => boolean;
  hasAnyRole: (roleNames: string[]) => boolean;
}

/**
 * Obtiene el estado de autenticación actual del usuario
 */
export function getAuthState(): AuthState {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) as User : null;
  
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.roles?.some(role => role.name === "Admin") ?? false,
    hasRole: (roleName: string) => {
      return user?.roles?.some(role => role.name === roleName) ?? false;
    },
    hasAnyRole: (roleNames: string[]) => {
      return roleNames.some(roleName => 
        user?.roles?.some(role => role.name === roleName) ?? false
      );
    }
  };
}

/**
 * Guarda el usuario en localStorage
 */
export function setAuthUser(user: User): void {
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Elimina el usuario del localStorage
 */
export function clearAuthUser(): void {
  localStorage.removeItem("user");
}

/**
 * Redirige al login si no está autenticado
 */
export function requireAuth(): boolean {
  const auth = getAuthState();
  if (!auth.isAuthenticated) {
    window.location.href = "/auth/login";
    return false;
  }
  return true;
}

/**
 * Redirige al dashboard si no tiene los roles requeridos
 * Los admins tienen acceso a todo
 */
export function requireRole(roleNames: string | string[]): boolean {
  const auth = getAuthState();
  if (!auth.isAuthenticated) {
    window.location.href = "/auth/login";
    return false;
  }
  
  // Los admins tienen acceso a todo
  if (auth.isAdmin) {
    return true;
  }
  
  const roles = Array.isArray(roleNames) ? roleNames : [roleNames];
  if (!auth.hasAnyRole(roles)) {
    window.location.href = "/dashboard";
    return false;
  }
  
  return true;
}

/**
 * Obtiene los elementos de navegación según los permisos del usuario
 * Los admins ven todas las opciones
 */
export function getNavigationItems() {
  const auth = getAuthState();
  
  const items: Array<{href: string, text: string, requiredRoles: string[]}> = [
    {
      href: "/dashboard",
      text: "Dashboard",
      requiredRoles: [] // Siempre visible si está autenticado
    }
  ];
  
  // Los admins ven todas las opciones
  if (auth.isAdmin) {
    items.push(
      {
        href: "/dashboard/supervisor",
        text: "Seguimiento General",
        requiredRoles: ["Supervisor", "Admin"]
      },
      {
        href: "/dashboard/student",
        text: "Vista Estudiante", 
        requiredRoles: ["Student", "Admin"]
      }
    );
  } else {
    // Para usuarios no admin, mostrar según sus roles específicos
    if (auth.hasRole("Supervisor")) {
      items.push({
        href: "/dashboard/supervisor",
        text: "Seguimiento General",
        requiredRoles: ["Supervisor"]
      });
    }
    
    if (auth.hasRole("Student")) {
      items.push({
        href: "/dashboard/student",
        text: "Vista Estudiante", 
        requiredRoles: ["Student"]
      });
    }
  }
  
  return items;
}

/**
 * Inicializa los controles de UI basados en la autenticación
 * Los admins pueden ver todos los elementos
 */
export function initializeAuthUI() {
  const auth = getAuthState();
  
  // Mostrar/ocultar elementos basados en roles
  document.querySelectorAll('[data-role]').forEach(element => {
    const requiredRoles = (element as HTMLElement).dataset.role?.split(',') || [];
    // Los admins pueden ver todo, o verificar si tiene algún rol requerido
    const hasAccess = auth.isAdmin || requiredRoles.length === 0 || auth.hasAnyRole(requiredRoles);
    
    if (hasAccess) {
      element.removeAttribute('style');
    } else {
      (element as HTMLElement).style.display = 'none';
    }
  });
  
  // Mostrar/ocultar elementos para usuarios autenticados
  document.querySelectorAll('[data-auth="true"]').forEach(element => {
    if (auth.isAuthenticated) {
      element.removeAttribute('style');
    } else {
      (element as HTMLElement).style.display = 'none';
    }
  });
  
  // Mostrar/ocultar elementos para usuarios no autenticados
  document.querySelectorAll('[data-auth="false"]').forEach(element => {
    if (!auth.isAuthenticated) {
      element.removeAttribute('style');
    } else {
      (element as HTMLElement).style.display = 'none';
    }
  });
  
  // Actualizar texto del usuario
  document.querySelectorAll('[data-user-name]').forEach(element => {
    const displayName = auth.user?.fullName || "Usuario";
    const roleIndicator = auth.isAdmin ? " (Admin)" : "";
    element.textContent = displayName + roleIndicator;
  });
}
