export class Text {
  public static truncateText(text: string, maxLength: number = 8, truncateLength: number = 7) {
    if (text.length > maxLength && window.innerWidth < 768) return text.substring(0, truncateLength) + "...";
    return text;
  }
}