import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { http } from '../utils/http';

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();
// 代表执行所有的测试之前，先来执行一下回调函数
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); // 重置mock路由
afterAll(() => server.close()); // 所有测试跑完后关闭mock路由
// 测试但愿
test('http发送异步请求', async () => {
  const endpoint = 'test-endpoint';
  const mockResult = { mockValue: 'mock' };
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );
  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});
