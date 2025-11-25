export interface Member {
  id: string;
  firstname: string;
  lastname: string;
  other_names: string;
  department_id: string | null;
  memberType: string;
  isHead: boolean;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  gender: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  endDate: string;
  startTime: string;
  endTime: string;
  created_at: string;
  updated_at: string;
  attendances: any[];
}

export interface GenderCount {
  _count: {
    id: number;
  };
  gender: string;
}

export interface Department {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  _count: {
    members: number;
  };
}

export interface AnalyticsData {
  totalMembers: Member[];
  firstTimers: Member[];
  upcomingEvts: Event[];
  presentToday: Member[];
  genders: GenderCount[];
  deptPopulation: Department[];
  absentToday: Member[];
}
