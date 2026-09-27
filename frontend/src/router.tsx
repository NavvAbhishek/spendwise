import { BrowserRouter, Route, Routes } from "react-router"
import { SignUpPage } from "@/pages/auth/signup"
import { SignedInPage } from "@/pages/auth/signed-in"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/me" element={<SignedInPage />} />
        <Route path="*" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}
