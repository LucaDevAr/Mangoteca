// AuthGuard.tsx
"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children, allowedRoles = [] }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Espera hasta que la sesión esté cargada

    // Si no hay sesión, redirige al login
    if (!session) {
      router.push('/auth/signin');
    } else {
      // Asegúrate de que session.user y session.user.role estén definidos antes de acceder a ellos
      const userRole = session.user?.role;

      if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
        // Si el rol no está permitido, redirige a una página de error o al inicio
        router.push('/');
      }
    }
  }, [session, status, allowedRoles, router]);

  if (status === 'loading' || !session) {
    return <p>Loading...</p>;
  }

  return children;
};

export default AuthGuard;
