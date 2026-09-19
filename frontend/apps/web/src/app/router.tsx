import { BrowserRouter, Route, Routes } from "react-router"
import { SignUpPage } from "@/features/auth/pages/SignUpPage"
import { SignedInPage } from "@/features/auth/pages/SignedInPage"

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
