# Mystery Management System - User Flow

## System Overview
A church/organization management system for tracking members, attendance, events, and services with department-based organization.

## Core Entities
- **Members**: Regular members and visitors with department assignments
- **Departments**: Organizational units with designated heads
- **Services**: Regular weekly worship services
- **Events**: Special one-time or recurring events
- **Attendance**: Check-in records for services and events

## User Flows

### 1. Member Management Flow

#### Adding New Members
1. User accesses member registration form
2. Enters member details (name, phone, address, gender, member type)
3. Optionally assigns to department
4. System validates unique phone number
5. Member is created with unique ID

#### Managing Departments
1. Admin creates departments with unique names
2. Assigns members to departments
3. Designates department heads (isHead flag)
4. Views department membership lists

### 2. Service & Event Management Flow

#### Setting Up Services
1. Admin creates regular services (Sunday Service, Bible Study, etc.)
2. Defines day of week, start/end times
3. Services become available for attendance tracking

#### Creating Events
1. Admin creates special events with dates and times
2. Sets event duration (start date, optional end date)
3. Events become available for attendance tracking

### 3. Attendance Tracking Flow

#### Check-in Process
1. **For Members**: 
   - System looks up by phone number
   - Auto-fills member details from database
   - Records attendance for current service/event

2. **For Visitors**:
   - Manual entry of visitor information
   - Creates temporary attendance record
   - Marks as visitor type

#### Attendance Management
1. View all attendance records
2. Filter by service, event, date, or member type
3. Track attendance status (present/absent)
4. Generate attendance reports

### 4. Analytics & Reporting Flow

#### Dashboard Overview
1. User accesses analytics dashboard
2. Views key metrics:
   - Total members by department
   - Attendance trends
   - Service/event participation rates
   - Member growth statistics

#### Filtered Reports
1. Generate reports by date range
2. Filter by department, service, or event
3. Export attendance data
4. Track individual member attendance history

### 5. Data Management Flow

#### Search & Filter
1. **Members**: Search by name, phone, department
2. **Attendance**: Filter by service, event, date, member type
3. **Events**: View upcoming events, filter by date

#### CRUD Operations
1. **Create**: Add new members, departments, services, events
2. **Read**: View individual records and lists
3. **Update**: Modify member details, department assignments
4. **Delete**: Remove members, departments (with validation)

## API Endpoints Structure

### Member Management
- `POST /api/members/new` - Register new member
- `GET /api/members/all` - List all members
- `GET /api/members/filter` - Search members
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Remove member

### Attendance System
- `POST /api/attendance/checkin` - Record attendance
- `GET /api/attendance/all` - View all attendance
- `GET /api/attendance/filter` - Filter attendance records

### Event & Service Management
- `POST /api/events/new` - Create event
- `GET /api/events/upcoming` - View upcoming events
- `POST /api/services/new` - Create service

### Department Management
- `POST /api/departments/new` - Create department
- `POST /api/departments/:id/add-member` - Assign member
- `DELETE /api/departments/:deptId/:memberId` - Remove member

### Analytics
- `GET /api/overview` - Dashboard analytics

## Key Features

### Data Integrity
- Unique phone numbers for members
- Indexed phone lookups for fast attendance
- Automatic timestamps for all records

### Flexible Attendance
- Supports both members and visitors
- Links to either services or events
- Tracks attendance status and timing

### Department Organization
- Hierarchical member organization
- Department head designation
- Member transfer between departments

### Reporting Capabilities
- Real-time attendance tracking
- Historical data analysis
- Filtered reporting by multiple criteria

This system provides a comprehensive solution for managing church/organization membership, tracking attendance, and generating insights through analytics.