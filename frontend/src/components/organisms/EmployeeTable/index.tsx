"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/Button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { EmployeeForm } from "@/components/molecules/Form/EmployeeForm"
import { employeesData } from "@/config/dummy-data"

export function EmployeeTable() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<any>(null)

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setIsFormOpen(true)
  }

  const handleEditEmployee = (employee: any) => {
    setEditingEmployee(employee)
    setIsFormOpen(true)
  }

  const handleDeleteEmployee = (employeeId: number) => {
    console.log('Delete employee:', employeeId)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Employees</h2>
          <Button onClick={handleAddEmployee} className="flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Employee</span>
          </Button>
        </div>
        {/* Table content */}
      </div>

      <EmployeeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingEmployee}
        onSubmit={(data) => {
          console.log('Submit employee:', data)
          setIsFormOpen(false)
        }}
      />
    </>
  )
}
