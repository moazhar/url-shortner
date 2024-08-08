class SessionUtility {
  private userSessionMap;

  private static instance: SessionUtility;

  constructor() {
    this.userSessionMap = new Map();
  }

  public static getInstance() {
    if (!SessionUtility.instance) {
      SessionUtility.instance = new SessionUtility();
    }

    return SessionUtility.instance;
  }

  public setUserSession(id: string, user: Record<string, any>) {
    this.userSessionMap.set(id, user);
  }

  public getUserSession(id: string) {
    return this.userSessionMap.get(id);
  }
}

export default SessionUtility;
