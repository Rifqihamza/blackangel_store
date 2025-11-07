"use client"

import ContactPage from "./contactPage/page";
import HomePage from "./homePage/page";
import ProductPage from "./productPage/page";

export default function App() {
  return (
    <main>
      <HomePage />
      <div className="w-full max-w-7xl mx-auto">
        <ProductPage />
        <ContactPage />
      </div>
    </main>
  )
}