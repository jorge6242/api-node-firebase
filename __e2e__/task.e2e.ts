import app from "../app";
import request from "supertest";

const TASK_MOCK = { title: "e2e TEST - Task 1", description: "e2e TEST  - Description 1", status: "completed" };
const API = '/api/v1/tasks';

describe("e2e - Server Config", () => {
  let testApp: any = null;
  let serverApp: any = null;
  beforeAll(() => {
    testApp = app;
    serverApp = testApp.listen(3001);
  });

  afterAll(async () => {
    serverApp.close();
  });

  describe("e2e - Tasks", () => {
    test("Endpoint GET - api/v1/tasks", async () => {
      const storeRes = await request(testApp).post(API).send(TASK_MOCK).set("Accept", "application/json").expect(200);
      const getResponse: request.Response = await request(testApp).get(API).expect(200);
      expect(getResponse.body.message?.length).toBeTruthy();
      if (storeRes.body?.message?.id) {
        await request(testApp).delete(`${API}/${storeRes.body.message.id}`).expect(200);
      }
    });

    test("Endpoint POST - api/v1/tasks", async () => {
      const storeRes = await request(testApp).post(API).send(TASK_MOCK).set("Accept", "application/json").expect(200);;
      expect(storeRes.body.message.message).toEqual('Task created');
      if (storeRes.body?.message?.id) {
       await request(testApp).delete(`${API}/${storeRes.body.message.id}`).expect(200);
      }
    });

    test("Endpoint PUT - api/v1/tasks/:id", async () => {
      const storeRes = await request(testApp).post(API).send(TASK_MOCK).set("Accept", "application/json").expect(200);
      const updateRes = await request(testApp).put(`${API}/${storeRes.body.message.id}`).send(TASK_MOCK).expect(200);
      expect(updateRes.body.message).toEqual('Task updated');
      if (storeRes.body?.message?.id) {
       await request(testApp).delete(`${API}/${storeRes.body.message.id}`).expect(200);
      }
    });

    test("Endpoint DELETE - api/v1/tasks/:id", async () => {
      const storeRes = await request(testApp).post(API).send(TASK_MOCK).set("Accept", "application/json").expect(200);
       const deleteRes = await request(testApp).delete(`${API}/${storeRes.body.message.id}`).expect(200);
       expect(deleteRes.body.message).toEqual('Task deleted');
    });
  });
});
