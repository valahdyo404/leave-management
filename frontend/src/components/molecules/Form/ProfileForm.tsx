"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/atoms/Button"
import { useState } from "react"
import { User } from "lucide-react"

const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  currentPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
  newPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false
  }
  return true
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
  initialData?: Partial<ProfileFormValues>
  onSubmit: (data: ProfileFormValues) => void
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      gender: initialData?.gender || "Male",
    },
  })

  const handleSubmit = (data: ProfileFormValues) => {
    onSubmit(data)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={40} className="text-gray-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-gray-500">Update your personal information</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <input
              {...form.register("firstName")}
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.firstName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <input
              {...form.register("lastName")}
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.lastName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            {...form.register("email")}
            type="email"
            className="w-full p-2 border rounded-md"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date of Birth</label>
            <input
              {...form.register("dateOfBirth")}
              type="date"
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.dateOfBirth && (
              <p className="text-sm text-red-500">
                {form.formState.errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <select
              {...form.register("gender")}
              className="w-full p-2 border rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Change Password</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? "Cancel" : "Change Password"}
            </Button>
          </div>

          {isChangingPassword && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <input
                  {...form.register("currentPassword")}
                  type="password"
                  className="w-full p-2 border rounded-md"
                />
                {form.formState.errors.currentPassword && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <input
                  {...form.register("newPassword")}
                  type="password"
                  className="w-full p-2 border rounded-md"
                />
                {form.formState.errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <input
                  {...form.register("confirmPassword")}
                  type="password"
                  className="w-full p-2 border rounded-md"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
