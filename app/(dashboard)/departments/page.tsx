"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Users, AlertCircle, CheckCircle, Clock, ArrowRight } from "lucide-react"

const initialDepartments = [
  {
    id: "dept-001",
    name: "Sanitation Department",
    manager: "Rajesh Kumar",
    employees: 45,
    totalIssues: 28,
    solvedIssues: 20,
    pendingIssues: 8,
    description: "Waste Management and City Cleanliness",
  },
  {
    id: "dept-002",
    name: "Water Department",
    manager: "Priya Sharma",
    employees: 32,
    totalIssues: 35,
    solvedIssues: 22,
    pendingIssues: 13,
    description: "Water Supply and Distribution Management",
  },
  {
    id: "dept-003",
    name: "Electricity Department",
    manager: "Amit Singh",
    employees: 28,
    totalIssues: 42,
    solvedIssues: 30,
    pendingIssues: 12,
    description: "Street Lighting and Electrical Infrastructure",
  },
  {
    id: "dept-004",
    name: "Public Works Department (PWD)",
    manager: "Sunita Patel",
    employees: 65,
    totalIssues: 58,
    solvedIssues: 35,
    pendingIssues: 23,
    description: "Road Maintenance and Public Infrastructure",
  },
]

const initialUnassignedIssues = [
  {
    id: "ISS-009",
    title: "Broken street light near school",
    category: "Street Light",
    priority: "high",
    createdAt: "2024-01-16",
  },
  {
    id: "ISS-010",
    title: "Road cracks developing on Bridge Road",
    category: "Road Damage",
    priority: "medium",
    createdAt: "2024-01-15",
  },
  {
    id: "ISS-011",
    title: "Water leakage from main pipeline",
    category: "Water Supply",
    priority: "high",
    createdAt: "2024-01-14",
  },
  {
    id: "ISS-012",
    title: "Stray animals near garbage collection point",
    category: "Others",
    priority: "low",
    createdAt: "2024-01-13",
  },
]

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-chart-3 text-white",
  high: "bg-chart-2 text-white",
  critical: "bg-chart-4 text-white",
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(initialDepartments)
  const [unassignedIssues, setUnassignedIssues] = useState(initialUnassignedIssues)
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  const assignIssueToDepartment = () => {
    if (!selectedIssue || !selectedDepartment) return

    // Remove issue from unassigned list
    const issueToAssign = unassignedIssues.find((issue) => issue.id === selectedIssue)
    if (!issueToAssign) return

    setUnassignedIssues(unassignedIssues.filter((issue) => issue.id !== selectedIssue))

    // Update department stats
    setDepartments(
      departments.map((dept) =>
        dept.name === selectedDepartment
          ? {
              ...dept,
              totalIssues: dept.totalIssues + 1,
              pendingIssues: dept.pendingIssues + 1,
            }
          : dept,
      ),
    )

    // Reset selection and close dialog
    setSelectedIssue(null)
    setSelectedDepartment("")
    setIsAssignDialogOpen(false)
  }

  const calculateEfficiency = (solved: number, total: number) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Departments</h1>
        <p className="text-muted-foreground">Manage departments and assign issues</p>
      </div>

      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{department.name}</CardTitle>
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{department.employees} employees</span>
              </div>
              <div className="text-sm">
                <strong>Manager:</strong> {department.manager}
              </div>

              {/* Issue Stats */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Issues</span>
                  <Badge variant="outline">{department.totalIssues}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Solved</span>
                  <Badge className="bg-chart-1 text-white">{department.solvedIssues}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending</span>
                  <Badge className="bg-chart-2 text-white">{department.pendingIssues}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Efficiency</span>
                  <Badge variant="outline">
                    {calculateEfficiency(department.solvedIssues, department.totalIssues)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Overview</CardTitle>
          <CardDescription>Detailed breakdown of department issue handling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Total Issues</TableHead>
                  <TableHead>Solved</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Efficiency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell>{department.manager}</TableCell>
                    <TableCell>{department.employees}</TableCell>
                    <TableCell>{department.totalIssues}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-chart-1" />
                        {department.solvedIssues}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-chart-2" />
                        {department.pendingIssues}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          calculateEfficiency(department.solvedIssues, department.totalIssues) >= 70
                            ? "bg-chart-1 text-white"
                            : calculateEfficiency(department.solvedIssues, department.totalIssues) >= 50
                              ? "bg-chart-3 text-white"
                              : "bg-chart-2 text-white"
                        }
                      >
                        {calculateEfficiency(department.solvedIssues, department.totalIssues)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Unassigned Issues */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Unassigned Issues</CardTitle>
              <CardDescription>Issues that need to be assigned to departments</CardDescription>
            </div>
            <Badge variant="outline" className="bg-chart-4 text-white">
              {unassignedIssues.length} unassigned
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {unassignedIssues.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unassignedIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">{issue.id}</TableCell>
                      <TableCell>{issue.title}</TableCell>
                      <TableCell>{issue.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={priorityColors[issue.priority as keyof typeof priorityColors]}
                        >
                          {issue.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{issue.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedIssue(issue.id)}>
                              Assign
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Assign Issue to Department</DialogTitle>
                              <DialogDescription>
                                Select a department to assign this issue: {issue.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                  {departments.map((dept) => (
                                    <SelectItem key={dept.id} value={dept.name}>
                                      {dept.name} - {dept.manager}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setIsAssignDialogOpen(false)
                                    setSelectedIssue(null)
                                    setSelectedDepartment("")
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={assignIssueToDepartment} disabled={!selectedDepartment}>
                                  Assign Issue
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No unassigned issues at the moment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
