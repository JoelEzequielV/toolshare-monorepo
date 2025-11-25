import { vi } from "vitest";
import { LoginUseCase } from "../loginUseCase";

test("LoginUseCase llama al repo y retorna token", async () => {
  const mockRepo = {
    login: vi.fn().mockResolvedValue({ token: "abc", user: { id: 1, name: "Test", email: "t@t" } }),
  };

  const useCase = new LoginUseCase(mockRepo);
  const result = await useCase.execute("t@t", "123");
  expect(mockRepo.login).toHaveBeenCalledWith("t@t", "123");
  expect(result.token).toBe("abc");
});
