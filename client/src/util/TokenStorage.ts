export default class TokenStorage {
  private static TOKEN_LOCAL_STORAGE_KEY = 'legendary-carnival-token';

  public static get(): string | null {
    if (!window.localStorage) return null;
      
    return window.localStorage.getItem(TokenStorage.TOKEN_LOCAL_STORAGE_KEY);
  }

  public static set(value: string): void {
    if (window.localStorage) {
      window.localStorage.setItem(TokenStorage.TOKEN_LOCAL_STORAGE_KEY, value);
    }
  }

  public static clear(): void {
    if (window.localStorage) {
      window.localStorage.removeItem(TokenStorage.TOKEN_LOCAL_STORAGE_KEY);
    }
  }
}