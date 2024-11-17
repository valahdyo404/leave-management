"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/atoms/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/atoms/Dialog"
import { format } from "date-fns"

const leaveFormSchema = z.object({
  employeeId: z.string().min(1, "Please select an employee"),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
})

type LeaveFormValues = z.infer<typeof leaveFormSchema>

interface LeaveRequestFormProps {
  isOpen: boolean
  onClose: () => void
  initialData?: LeaveFormValues
  onSubmit: (data: LeaveFormValues) => void
  employees: Array<{ id: number; firstName: string; lastName: string }>
}

export function LeaveRequestForm({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  employees,
}: LeaveRequestFormProps) {
  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: initialData || {
      employeeId: "",
      reason: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    },
  })

  const handleSubmit = (data: LeaveFormValues) => {
    onSubmit(data)
    onClose()
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Leave Request" : "New Leave Request"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee</label>
            <select
              {...form.register("employeeId")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
            {form.formState.errors.employeeId && (
              <p className="text-sm text-red-500">{form.formState.errors.employeeId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reason</label>
            <textarea
              {...form.register("reason")}
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.reason && (
              <p className="text-sm text-red-500">{form.formState.errors.reason.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <input
              {...form.register("startDate")}
              type="date"
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.startDate && (
              <p className="text-sm text-red-500">{form.formState.errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <input
              {...form.register("endDate")}
              type="date"
              className="w-full p-2 border rounded-md"
            />
            {form.formState.errors.endDate && (
              <p className="text-sm text-red-500">{form.formState.errors.endDate.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}