import { Metadata } from "next"
import 'bootstrap/dist/css/bootstrap.css'
import NavBarComponent from "./components/navbar"
import FooterComponent from "./components/footer"
import SessionContextGlobal from "./context/SessionContext"
import { useSession, signOut } from "next-auth/react";
import styles from "./styles.module.css";





export const metadata: Metadata = {
  title: 'Cafe Contigo',
  description: 'Programación Web Híbrida',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="es">
      <body className={styles.body}>
        <SessionContextGlobal>
          <NavBarComponent></NavBarComponent>
          <div>
            {children}
          </div>
        </SessionContextGlobal>
        <FooterComponent></FooterComponent>
      </body>
    </html>
  )
}
