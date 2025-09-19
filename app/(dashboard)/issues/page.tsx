"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const statusColors = {
  pending: "bg-chart-2 text-white",
  "in-progress": "bg-chart-3 text-white",
  solved: "bg-chart-1 text-white",
  critical: "bg-chart-4 text-white",
};

export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("https://people-eye-server.onrender.com/api/reports");
        const data = await res.json();
        const reportsArray = Array.isArray(data) ? data : data.reports || [];
        setIssues(reportsArray);
        setFilteredIssues(reportsArray);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    fetchReports();
  }, []);

  const filterIssues = (status: string, search: string) => {
    let filtered = issues;

    if (status !== "all") {
      filtered = filtered.filter((issue) => issue.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (issue) =>
          issue.title?.toLowerCase().includes(search.toLowerCase()) ||
          issue.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    filterIssues(value, searchTerm);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    filterIssues(statusFilter, value);
  };

  const getStatusCount = (status: string) => {
    return issues.filter((issue) => issue.status === status).length;
  };

  const acceptIssue = async (issueId: string) => {
    try {
      // You can call API to update status to "accepted" if needed
      const updated = issues.map((i) =>
        i._id === issueId ? { ...i, status: "solved" } : i
      );
      setIssues(updated);
      filterIssues(statusFilter, searchTerm);
    } catch (err) {
      console.error("Error accepting issue:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Issues Management</h1>
        <p className="text-muted-foreground">Track and manage all reported issues</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{issues.length}</div>
            <p className="text-sm text-muted-foreground">Total Issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-chart-2">{getStatusCount("pending")}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-chart-3">{getStatusCount("in-progress")}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-chart-1">{getStatusCount("solved")}</div>
            <p className="text-sm text-muted-foreground">Solved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Issues List</CardTitle>
          <CardDescription>Manage and track all reported issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Issues Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue._id}>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell>{issue.description}</TableCell>
                    <TableCell>{issue.category}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[issue.status as keyof typeof statusColors]}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {issue.images?.map((img: string, idx: number) => (
                          <Image
                            key={idx}
                            src={img}
                            alt={`Issue ${idx}`}
                            width={50}
                            height={50}
                            className="cursor-pointer rounded"
                            onClick={() => setSelectedImage(img)}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => acceptIssue(issue._id)}
                        disabled={issue.status === "solved"}
                      >
                        Accept
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIssues.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No issues found.</div>
          )}
        </CardContent>
      </Card>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Preview"
              width={1000}
              height={700}
              className="rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
