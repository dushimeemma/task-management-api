import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getAllTasks: jest.fn(),
  findOneBy: jest.fn(),
  createTask: jest.fn(),
});

const mockUser = {
  id: Date.now().toString(),
  username: 'testUser',
  password: 'testPassword',
  tasks: [],
};

const mockTask = {
  id: Date.now().toString(),
  title: 'test title',
  description: 'test description',
  status: TaskStatus.OPEN,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('should get all tasks', async () => {
      taskRepository.getAllTasks.mockResolvedValue('some value');
      const res = await tasksService.getAllTasks(null, mockUser);
      expect(res).toEqual('some value');
    });
  });

  describe('getTaskById', () => {
    it('should get a single task by id', async () => {
      taskRepository.findOneBy.mockResolvedValue(mockTask);
      const res = await tasksService.getTaskById(mockTask.id, mockUser);
      expect(res).toEqual(mockTask);
    });
    it('should not get a single task when id is wrong', async () => {
      taskRepository.findOneBy.mockResolvedValue(mockTask);
      const res = await tasksService.getTaskById('diff id', mockUser);
      expect(res).toEqual(mockTask);
    });
  });

  describe('createTask', () => {
    it('should ', async () => {
      const mockCreateTaskDto = {
        title: 'test title dto',
        description: 'test description dto',
      };
      taskRepository.createTask.mockResolvedValue(mockCreateTaskDto, mockUser);
      const res = await tasksService.createTask(mockCreateTaskDto, mockUser);
      expect(res).toEqual(mockCreateTaskDto);
    });
  });
});
