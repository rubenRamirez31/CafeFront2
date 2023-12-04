import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
            username : { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
            const res = await fetch(
                'http://localhost:8080/Usuarios/Login', 
                {
              method: "POST",
              body: JSON.stringify({
                username: credentials?.username ,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
  
          const user = await res.json();
  
          if (user.error) {
            throw user;
          } else {
            // Asumiendo que el token JWT se encuentra en la propiedad 'token' del objeto de usuario
            const token = user.token;
  
            // Fusionamos el token JWT devuelto por el backend con el token existente
            const updatedUser = { ...user, token };
  
            return updatedUser;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        // Fusionamos el token JWT devuelto por el backend con el token existente
        return { ...token, ...user };
      },
      async session({ session, token }) {
        // Asignamos el objeto de usuario (incluyendo el token) a la sesión
        session.user = token as any;
        return session;
      },
    },
    pages: {
      signIn: "/Login",
    },
  });
  
  export { handler as GET, handler as POST };
  