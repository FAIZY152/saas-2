"use client"

import { AuthLayout } from "@/components/pages/auth/AuthLayout"
import { LoginForm } from "@/components/pages/auth/LoginForm"
import { RegisterForm } from "@/components/pages/auth/RegisterForm"
import { useState } from "react"


interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(false)

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <AuthLayout isOpen={isOpen} onClose={onClose}>
      {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <RegisterForm onToggleMode={toggleMode} />}
    </AuthLayout>
  )
}
