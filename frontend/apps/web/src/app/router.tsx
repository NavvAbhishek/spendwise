import { BrowserRouter, Route, Routes } from "react-router"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div className="p-8 text-foreground">Spendwise — coming soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}
