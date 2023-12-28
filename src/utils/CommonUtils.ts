import * as Mongoose from 'mongoose';

export class CommonUtils {
  public static toObjectId(n: string): ObjectId {
    return Mongoose.Types.ObjectId.createFromHexString(n);
  }

  /**
     Takes a string representing a language and attempts to extract the language code from it.
     If the language code cannot be extracted, it returns the original input string.

     @param language - A string representing the user's language
     @returns The language code extracted from the input string in uppercase, or the original input string if it cannot be split or the second element is not present
     @example parseUserLanguage('it-IT') => 'IT'
     */
  public static parseUserLanguage(language: string): string {
    try {
      return language.split('-')[0].toUpperCase();
    } catch {}
    return language;
  }

  /**
   * Takes a string parameter fullPath representing the full path of a file or directory
   *
   * @param fullPath
   * @returns a string representing the name of the file or the name of the last directory in the path.
   * @example
   *
   * getNameByFullPath("Accessories/Control Devices/868 SLH/868 SLH_732920_RevA_IT.pdf"); => "868 SLH_732920_RevA.pdf"
   * getNameByFullPath("Accessories/Control Devices/868 SLH/"); => "868 SLH"
   *
   */
  public static getNameByFullPath(fullPath: string): string {
    try {
      const element = fullPath.split('/');
      if (fullPath[fullPath.length - 1] === '/') {
        return element[element.length - 2];
      }
      const fullFileName = element[element.length - 1];
      const index = fullFileName.lastIndexOf('_');
      if (index !== -1) {
        return `${fullFileName.substring(0, index)}.pdf`;
      }
      return fullFileName;
    } catch {}
    return fullPath;
  }

  /**
   * It returns an array of languages
   * @param userLanguage - The user's language.
   * @returns An array of strings that represent fallback languages - including the main user language.
   */
  public static getFileFallBackLanguages(userLanguage: string): string[] {
    const languages = new Set([userLanguage, 'EN', 'MULTI']);
    return Array.from(languages);
  }
}
