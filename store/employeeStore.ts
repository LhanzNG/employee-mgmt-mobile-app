import { create } from 'zustand';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'onboarding' | 'inactive' | 'terminated';
  photo?: string;
  manager?: string;
  salary?: number;
}

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<Employee>;
  updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  getEmployee: (id: string) => Employee | undefined;
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'john.smith@company.com',
    phone: '(555) 123-4567',
    hireDate: '2022-03-15',
    status: 'active',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    manager: 'Sarah Johnson',
    salary: 90000
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'Engineering Manager',
    department: 'Engineering',
    email: 'sarah.johnson@company.com',
    phone: '(555) 234-5678',
    hireDate: '2021-08-10',
    status: 'active',
    photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    salary: 130000
  },
  {
    id: '3',
    name: 'Michael Brown',
    position: 'Product Manager',
    department: 'Product',
    email: 'michael.brown@company.com',
    phone: '(555) 345-6789',
    hireDate: '2023-01-05',
    status: 'active',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    manager: 'Emily Wilson',
    salary: 110000
  },
  {
    id: '4',
    name: 'Emily Wilson',
    position: 'Director of Product',
    department: 'Product',
    email: 'emily.wilson@company.com',
    phone: '(555) 456-7890',
    hireDate: '2021-04-20',
    status: 'active',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    salary: 145000
  },
  {
    id: '5',
    name: 'David Martinez',
    position: 'UX Designer',
    department: 'Design',
    email: 'david.martinez@company.com',
    phone: '(555) 567-8901',
    hireDate: '2023-04-01',
    status: 'onboarding',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    manager: 'Lisa Chen',
    salary: 85000
  },
  {
    id: '6',
    name: 'Lisa Chen',
    position: 'Design Lead',
    department: 'Design',
    email: 'lisa.chen@company.com',
    phone: '(555) 678-9012',
    hireDate: '2022-07-15',
    status: 'active',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    salary: 105000
  },
  {
    id: '7',
    name: 'Robert Taylor',
    position: 'Marketing Specialist',
    department: 'Marketing',
    email: 'robert.taylor@company.com',
    phone: '(555) 789-0123',
    hireDate: '2022-11-10',
    status: 'active',
    photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    manager: 'Jennifer Adams',
    salary: 75000
  },
  {
    id: '8',
    name: 'Jennifer Adams',
    position: 'Marketing Director',
    department: 'Marketing',
    email: 'jennifer.adams@company.com',
    phone: '(555) 890-1234',
    hireDate: '2021-09-15',
    status: 'active',
    photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    salary: 120000
  },
  {
    id: '9',
    name: 'Daniel Lee',
    position: 'Data Analyst',
    department: 'Data',
    email: 'daniel.lee@company.com',
    phone: '(555) 901-2345',
    hireDate: '2023-02-20',
    status: 'active',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    manager: 'William Johnson',
    salary: 80000
  },
  {
    id: '10',
    name: 'William Johnson',
    position: 'Data Science Manager',
    department: 'Data',
    email: 'william.johnson@company.com',
    phone: '(555) 012-3456',
    hireDate: '2021-12-01',
    status: 'active',
    photo: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    salary: 125000
  }
];

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: mockEmployees,
  isLoading: false,
  error: null,
  
  fetchEmployees: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ employees: mockEmployees, isLoading: false });
    } catch (error) {
      console.error('Error fetching employees:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch employees' 
      });
    }
  },
  
  addEmployee: async (employee) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newEmployee = {
        ...employee,
        id: Date.now().toString()
      };
      
      set(state => ({
        employees: [...state.employees, newEmployee],
        isLoading: false
      }));
      
      return newEmployee;
    } catch (error) {
      console.error('Error adding employee:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to add employee' 
      });
      throw error;
    }
  },
  
  updateEmployee: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        employees: state.employees.map(emp => 
          emp.id === id ? { ...emp, ...updates } : emp
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error updating employee:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update employee' 
      });
      throw error;
    }
  },
  
  deleteEmployee: async (id) => {
    try {
      set({ isLoading: true, error: null });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        employees: state.employees.filter(emp => emp.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error deleting employee:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete employee' 
      });
      throw error;
    }
  },
  
  getEmployee: (id) => {
    return get().employees.find(emp => emp.id === id);
  },
}));