import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Mail,
  MessageCircle,
  Plus,
  Users,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react"

 const  StudentDashboard = () => {
  const [currentMonth, setCurrentMonth] = useState("June 2025")

  const attendanceData = {
    present: 25,
    absent: 2,
    halfDay: 0,
    total: 27,
  }

  const todaysClasses = [
    { subject: "English", time: "09:00 - 09:45 AM", status: "Completed", color: "green" },
    { subject: "Chemistry", time: "10:45 - 11:30 AM", status: "Completed", color: "green" },
    { subject: "Physics", time: "11:30 - 12:15 AM", status: "Remaining", color: "orange" },
  ]

  const homeWorks = [
    { subject: "Physics", title: "Write about Theory of Pendulum", teacher: "Aaron", dueDate: "Due by - 16 Jun 2024" },
    {
      subject: "Chemistry",
      title: "Chemistry - Change of Elements",
      teacher: "Helena",
      dueDate: "Due by - 16 Jun 2024",
    },
    {
      subject: "Maths",
      title: "Maths - Problems to Solve Page 21",
      teacher: "Morgan",
      dueDate: "Due by - 21 Jun 2024",
    },
    {
      subject: "English",
      title: "English - Vocabulary Introduction",
      teacher: "Daniel Josua",
      dueDate: "Due by - 21 Jun 2024",
    },
  ]

  const faculties = [
    { name: "Aaron", subject: "Chemistry", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Helena", subject: "English", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Morgan", subject: "Physics", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Daniel Josua", subject: "Spanish", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Teresa", subject: "Maths", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Jacquelin", subject: "Biology", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const leaveStatus = [
    { type: "Emergency Leave", date: "Date - 15 Jun 2024", status: "Pending", color: "blue" },
    { type: "Medical Leave", date: "Date - 15 Jun 2024", status: "Approved", color: "green" },
    { type: "Medical Leave", date: "Date - 16 Jun 2024", status: "Declined", color: "red" },
    { type: "Fever", date: "Date - 16 Jun 2024", status: "Approved", color: "green" },
  ]

  const feeReminders = [
    { type: "Transport Fees", amount: "$2500", dueDate: "25 May 2024" },
    { type: "Book Fees", amount: "$2000", dueDate: "25 May 2024" },
    { type: "Exam Fees", amount: "$2500", dueDate: "25 May 2024" },
    { type: "Mess Fees", amount: "$2500 + $150", dueDate: "27 May 2024", isNew: true },
    { type: "Hostel", amount: "$2500", dueDate: "25 May 2024" },
  ]

  const noticeBoard = [
    { title: "New Syllabus Instructions", date: "Added on - 13 Mar 2024" },
    { title: "World Environment Day Program... !!!", date: "Added on - 21 Apr 2024" },
    { title: "Exam Preparation Notification", date: "Added on - 13 Mar 2024" },
    { title: "Online Classes Preparation", date: "Added on - 24 May 2024" },
    { title: "Exam Time Table Release", date: "Added on - 24 May 2024" },
    { title: "English Exam Preparation", date: "Added on - 23 Mar 2024" },
  ]

  const syllabusProgress = [
    { subject: "Maths", progress: 85, color: "bg-blue-500" },
    { subject: "Physics", progress: 70, color: "bg-green-500" },
    { subject: "Chemistry", progress: 90, color: "bg-purple-500" },
    { subject: "Biology", progress: 60, color: "bg-yellow-500" },
    { subject: "English", progress: 95, color: "bg-red-500" },
    { subject: "Spanish", progress: 40, color: "bg-pink-500" },
    { subject: "Japanese", progress: 75, color: "bg-indigo-500" },
  ]

  const todoItems = [
    { task: "Send Reminder to Students", time: "01:00 PM", status: "Completed" },
    { task: "Create Routine to new staff", time: "04:30 PM", status: "Yet to Start" },
    { task: "Extra Class Info to Students", time: "04:55 PM", status: "Yet to Start" },
    { task: "Fees for Upcoming Academics", time: "04:55 PM", status: "Yet to Start" },
    { task: "English - Essay on Visit", time: "05:55 PM", status: "Yet to Start" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>Student Dashboard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Student Profile Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-white">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">Angelo Riana</h2>
                    <p className="text-blue-100">Class - IX - C | Roll No - 30545</p>
                    <Badge className="bg-green-500 text-white mt-2">1st Quarterly</Badge>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Class and Attendance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Today's Class */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Today's Class</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="mx-2">15 May 2024</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysClasses.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{cls.subject[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{cls.subject}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {cls.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={cls.status === "Completed" ? "default" : "secondary"}
                      className={
                        cls.color === "green" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                      }
                    >
                      {cls.status === "Completed" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {cls.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Attendance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Attendance</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <span>This Week</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500 mb-2">No of total working days 28 Days</p>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray={`${(attendanceData.present / attendanceData.total) * 100}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {Math.round((attendanceData.present / attendanceData.total) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{attendanceData.present}</p>
                    <p className="text-xs text-gray-500">Present</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{attendanceData.absent}</p>
                    <p className="text-xs text-gray-500">Absent</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{attendanceData.halfDay}</p>
                    <p className="text-xs text-gray-500">Half Day</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Last 7 Days</p>
                  <div className="flex space-x-1">
                    {["M", "T", "W", "T", "F", "S"].map((day, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center text-white ${
                          index < 4 ? "bg-green-500" : index === 4 ? "bg-red-500" : "bg-gray-300"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">Pay Fees</p>
            </Card>
            <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Exam Result</p>
            </Card>
            <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="font-medium">Calendar</p>
            </Card>
            <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Attendance</p>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Performance</CardTitle>
              <div className="text-sm text-gray-500">2024 - 2025</div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[75, 65, 80, 70, 85].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-200 rounded-t-lg relative" style={{ height: `${height}%` }}>
                      <div className="w-full bg-blue-500 rounded-t-lg absolute bottom-0" style={{ height: "60%" }} />
                    </div>
                    <p className="text-xs mt-2 text-gray-500">
                      {["Quarter 1", "Quarter 2", "Half yearly", "Model", "Final"][index]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Avg. Exam Score</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-200 rounded-full mr-2"></div>
                  <span>Avg. Attendance</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Faculties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Class Faculties</CardTitle>
              <div className="flex space-x-2">
                <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
                <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {faculties.map((faculty, index) => (
                  <div key={index} className="text-center">
                    <Avatar className="w-12 h-12 mx-auto mb-2">
                      <AvatarImage src={faculty.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {faculty.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm">{faculty.name}</p>
                    <p className="text-xs text-gray-500">{faculty.subject}</p>
                    <div className="flex justify-center space-x-2 mt-2">
                      <Mail className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600" />
                      <MessageCircle className="w-4 h-4 text-gray-400 cursor-pointer hover:text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leave Status, Exam Result, Fees Reminder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Leave Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Leave Status</CardTitle>
                <span className="text-sm text-gray-500">This Month</span>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaveStatus.map((leave, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{leave.type}</p>
                      <p className="text-xs text-gray-500">{leave.date}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : leave.status === "Declined"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {leave.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Exam Result */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Exam Result</CardTitle>
                <span className="text-sm text-gray-500">1st Quarter</span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { subject: "Mat", score: 100, color: "bg-blue-500" },
                    { subject: "Phy", score: 92, color: "bg-green-500" },
                    { subject: "Che", score: 90, color: "bg-purple-500" },
                    { subject: "Eng", score: 82, color: "bg-orange-500" },
                    { subject: "Bio", score: 80, color: "bg-red-500" },
                  ].map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-8">{subject.subject}</span>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${subject.color}`} style={{ width: `${subject.score}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-medium w-8">{subject.score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fees Reminder */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Fees Reminder</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {feeReminders.map((fee, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          fee.type === "Transport Fees"
                            ? "bg-blue-500"
                            : fee.type === "Book Fees"
                              ? "bg-green-500"
                              : fee.type === "Exam Fees"
                                ? "bg-purple-500"
                                : fee.type === "Mess Fees"
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{fee.type}</p>
                        <p className="text-xs text-gray-500">{fee.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">Last Date</p>
                      <p className="text-xs text-gray-500">{fee.dueDate}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Notice Board and Syllabus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notice Board */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Notice Board</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {noticeBoard.map((notice, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">{notice.title}</p>
                        <p className="text-xs text-gray-500">{notice.date}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Syllabus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    These status are obtained from the syllabus completion on the respective subjects.
                  </p>
                </div>
                <div className="space-y-3">
                  {syllabusProgress.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{subject.subject}</span>
                        <span className="text-sm text-gray-500">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Schedules */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Schedules</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                <Plus className="w-4 h-4 mr-1" />
                Add New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="flex items-center justify-between mb-4">
                  <ChevronLeft className="w-5 h-5 cursor-pointer" />
                  <h3 className="font-semibold">{currentMonth}</h3>
                  <ChevronRight className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-500 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`p-2 hover:bg-blue-50 cursor-pointer rounded ${
                        day === 15 ? "bg-blue-600 text-white" : ""
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div>
                  <h4 className="font-medium text-sm mb-2">Exams</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-red-50 rounded border-l-4 border-red-500">
                      <p className="font-medium text-sm">1st Quarterly</p>
                      <p className="text-xs text-gray-500">Mathematics</p>
                      <p className="text-xs text-gray-500">01:30 - 02:15 PM</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-red-600">15 Days More</span>
                        <span className="text-xs text-gray-500">Room No - 15</span>
                      </div>
                    </div>
                    <div className="p-2 bg-red-50 rounded border-l-4 border-red-500">
                      <p className="font-medium text-sm">2nd Quarterly</p>
                      <p className="text-xs text-gray-500">Physics</p>
                      <p className="text-xs text-gray-500">01:30 - 02:15 PM</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-red-600">20 Days More</span>
                        <span className="text-xs text-gray-500">Room No - 15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Home Works */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Home Works</CardTitle>
              <div className="text-sm text-gray-500">All Subjects</div>
            </CardHeader>
            <CardContent className="space-y-3">
              {homeWorks.map((work, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                      work.subject === "Physics"
                        ? "bg-orange-500"
                        : work.subject === "Chemistry"
                          ? "bg-green-500"
                          : work.subject === "Maths"
                            ? "bg-red-500"
                            : "bg-blue-500"
                    }`}
                  >
                    {work.subject[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{work.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">{work.teacher[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">{work.teacher}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{work.dueDate}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Todo */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Todo</CardTitle>
              <div className="text-sm text-gray-500">Today</div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todoItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      item.status === "Completed" ? "bg-green-500 border-green-500" : "border-gray-300"
                    }`}
                  >
                    {item.status === "Completed" && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${item.status === "Completed" ? "line-through text-gray-500" : "font-medium"}`}
                    >
                      {item.task}
                    </p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      item.status === "Completed" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard;