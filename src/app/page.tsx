"use client"

import ContactPage from "./(site)/contactPage/page";
import HomePage from "./(site)/homePage/page";
import ProductPage from "./(site)/productPage/page";
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent";

export default function App() {
  return (
    <main>
      <NavbarComponent />
      <div className="w-full max-w-7xl mx-auto">
        <HomePage />
        <ProductPage />
        <ContactPage />
      </div>
    </main>
  )
}