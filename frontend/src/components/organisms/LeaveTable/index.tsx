"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/Button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { LeaveRequestForm } from "@/components/molecules/Form/LeaveRequestForm"
import { leavesData, employeesData } from "@/config/dummy-data"

export function LeaveTable() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingLeave, setEditingLeave] = useState<any>(null)

  const handleAddLeave = () => {
    setEditingLeave(null)
    setIsFormOpen(true)
  }

  const handleEditLeave = (leave: any) => {
    setEditingLeave(leave)
    setIsFormOpen(true)
  }

  const handleDeleteLeave = (leaveId: number) => {
    console.log('Delete leave:', leaveId)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Leave Requests</h2>
          <Button onClick={handleAddLeave} className="flex items-center space-x-2">
            <Plus size={16} />
            <span>New Leave Request</span>
          </Button>
        </div>
        {/* Table content */}
      </div>

      <LeaveRequestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingLeave}
        onSubmit={(data) => {
          console.log('Submit leave:', data)
          setIsFormOpen(false)
        }}
        employees={employeesData}
      />
    </>
  )
}