// MyOrders is now part of the My Account page.
// This file redirects to /my-account for backwards compatibility.
import { Navigate } from "react-router-dom"
export default function MyOrders() {
  return <Navigate to="/my-account" replace />
}
