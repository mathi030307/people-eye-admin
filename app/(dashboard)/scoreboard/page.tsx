"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, TrendingUp, Target, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const departmentRankings = [
  {
    id: "dept-003",
    name: "Public Works Department (PWD)",
    manager: "Sunita Patel",
    solvedIssues: 35,
    totalIssues: 58,
    efficiency: 60,
    avgResolutionTime: "3.2 days",
    streak: 7,
    monthlyTarget: 40,
    badge: "Infrastructure Expert",
  },
  {
    id: "dept-004",
    name: "Electricity Department",
    manager: "Amit Singh",
    solvedIssues: 30,
    totalIssues: 42,
    efficiency: 71,
    avgResolutionTime: "1.8 days",
    streak: 5,
    monthlyTarget: 35,
    badge: "Quick Response",
  },
  {
    id: "dept-002",
    name: "Water Department",
    manager: "Priya Sharma",
    solvedIssues: 22,
    totalIssues: 35,
    efficiency: 63,
    avgResolutionTime: "2.5 days",
    streak: 4,
    monthlyTarget: 30,
    badge: "Reliable Service",
  },
  {
    id: "dept-001",
    name: "Sanitation Department",
    manager: "Rajesh Kumar",
    solvedIssues: 20,
    totalIssues: 28,
    efficiency: 71,
    avgResolutionTime: "2.1 days",
    streak: 6,
    monthlyTarget: 25,
    badge: "Clean City Champion",
  },
].sort((a, b) => b.solvedIssues - a.solvedIssues)

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-8 w-8 text-yellow-500" />
    case 2:
      return <Medal className="h-8 w-8 text-gray-400" />
    case 3:
      return <Award className="h-8 w-8 text-amber-600" />
    default:
      return (
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>
      )
  }
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "from-yellow-400 to-yellow-600"
    case 2:
      return "from-gray-300 to-gray-500"
    case 3:
      return "from-amber-400 to-amber-600"
    default:
      return "from-muted to-muted-foreground/20"
  }
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Infrastructure Expert":
      return "bg-chart-1 text-white"
    case "Quick Response":
      return "bg-chart-2 text-white"
    case "Reliable Service":
      return "bg-chart-3 text-white"
    case "Clean City Champion":
      return "bg-chart-4 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function ScoreboardPage() {
  const topPerformer = departmentRankings[0]
  const totalSolved = departmentRankings.reduce((sum, dept) => sum + dept.solvedIssues, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Department Scoreboard</h1>
        <p className="text-muted-foreground">Rankings based on civic issues resolved and performance metrics</p>
      </div>

      {/* Top Performer Highlight */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Top Performer</CardTitle>
          <CardDescription>This month's leading department</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <h3 className="text-3xl font-bold text-primary">{topPerformer.name}</h3>
            <p className="text-muted-foreground">Managed by {topPerformer.manager}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-1">{topPerformer.solvedIssues}</div>
              <div className="text-sm text-muted-foreground">Issues Solved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-2">{topPerformer.efficiency}%</div>
              <div className="text-sm text-muted-foreground">Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-3">{topPerformer.avgResolutionTime}</div>
              <div className="text-sm text-muted-foreground">Avg Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-4">{topPerformer.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Department Rankings</h2>
        <div className="grid gap-4">
          {departmentRankings.map((department, index) => {
            const rank = index + 1
            const progressToTarget = Math.min((department.solvedIssues / department.monthlyTarget) * 100, 100)

            return (
              <Card
                key={department.id}
                className={`relative overflow-hidden ${rank <= 3 ? "border-2" : ""} ${
                  rank === 1
                    ? "border-yellow-500/50"
                    : rank === 2
                      ? "border-gray-400/50"
                      : rank === 3
                        ? "border-amber-500/50"
                        : ""
                }`}
              >
                {/* Gradient background for top 3 */}
                {rank <= 3 && <div className={`absolute inset-0 bg-gradient-to-r ${getRankColor(rank)} opacity-5`} />}

                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Rank and Department Info */}
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">{getRankIcon(rank)}</div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{department.name}</h3>
                          <Badge className={getBadgeColor(department.badge)}>{department.badge}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Manager: {department.manager}</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Target className="h-4 w-4 text-chart-1" />
                          <span className="text-2xl font-bold text-chart-1">{department.solvedIssues}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Issues Solved</div>
                      </div>

                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="h-4 w-4 text-chart-2" />
                          <span className="text-2xl font-bold text-chart-2">{department.efficiency}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>

                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="h-4 w-4 text-chart-3" />
                          <span className="text-lg font-bold text-chart-3">{department.avgResolutionTime}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Avg Resolution</div>
                      </div>

                      <div>
                        <div className="text-2xl font-bold text-chart-4 mb-1">{department.streak}</div>
                        <div className="text-xs text-muted-foreground">Day Streak</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress to Monthly Target */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Target Progress</span>
                      <span className="font-medium">
                        {department.solvedIssues}/{department.monthlyTarget} ({Math.round(progressToTarget)}%)
                      </span>
                    </div>
                    <Progress value={progressToTarget} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance Summary</CardTitle>
          <CardDescription>Combined statistics across all departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-chart-1 mb-2">{totalSolved}</div>
              <div className="text-sm text-muted-foreground">Total Issues Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chart-2 mb-2">
                {Math.round(
                  departmentRankings.reduce((sum, dept) => sum + dept.efficiency, 0) / departmentRankings.length,
                )}
                %
              </div>
              <div className="text-sm text-muted-foreground">Average Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chart-3 mb-2">
                {(
                  departmentRankings.reduce((sum, dept) => sum + Number.parseFloat(dept.avgResolutionTime), 0) /
                  departmentRankings.length
                ).toFixed(1)}{" "}
                days
              </div>
              <div className="text-sm text-muted-foreground">Average Resolution Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
