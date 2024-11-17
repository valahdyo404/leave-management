/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ProfileForm } from "@/components/molecules/Form/ProfileForm"

const dummyProfileData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  dateOfBirth: "1990-01-01",
  gender: "Male" as const,
}

export default function ProfilePage() {
  const handleSubmit = async (data: any) => {
    console.log('Profile update:', data)
  }

  return (
    <div className="p-6">
      <ProfileForm
        initialData={dummyProfileData}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
