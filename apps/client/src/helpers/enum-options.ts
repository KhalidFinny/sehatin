export class EnumOptions {
  public static fromEnum<T extends Record<string, string | number>>(obj: T): Array<{ label: string; value: string }> {
    return Object.entries(obj).map(([key, value]) => ({ label: String(value), value: key }));
  }
}