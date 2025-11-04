export const fetchToolsUseCase = (repo: { fetchAll: () => Promise<any[]> }) => {
    return async () => {
    const items = await repo.fetchAll();
    // aquí puedes mapear/validar según entidades del dominio
    return items;
    }
    }