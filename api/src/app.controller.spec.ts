import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchPaginationFilterDto } from './dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Search endpoints', () => {
    it('should return issues', async () => {
      const paginationFilter: SearchPaginationFilterDto = {
        page: 1,
        per_page: 2,
        q: 'notro',
      };

      const response = await appController.getIssues(paginationFilter);

      console.log(response); // Log the response for debugging

      expect(response).toBeDefined();
      expect(response).toHaveProperty('items');
      expect(Array.isArray(response.items)).toBe(true);

      if (response.items.length > 0) {
        expect(response.items[0]).toEqual(expect.any(Object));
      }
    });

    it('should return repositories', async () => {
      const paginationFilter: SearchPaginationFilterDto = {
        page: 1,
        per_page: 2,
        q: 'notro',
      };

      const response = await appController.getRepositories(paginationFilter);

      expect(response).toBeDefined();
      expect(response).toHaveProperty('items');
      expect(Array.isArray(response.items)).toBe(true);

      if (response.items.length > 0) {
        expect(response.items[0]).toEqual(expect.any(Object));
      }
    });
  });
});
