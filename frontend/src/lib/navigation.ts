"use client"
import { useRouter } from 'next/navigation'

export const useAppNavigation = () => {
  const router = useRouter()

  return {
    goToDashboard: () => router.push('/dashboard'),
    goToEmployees: () => router.push('/dashboard/employees'),
    goToLeaves: () => router.push('/dashboard/leaves'),
    goToProfile: () => router.push('/dashboard/profile'),
    goToLogin: () => router.push('/login'),
    goBack: () => router.back(),
  }
}