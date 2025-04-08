import os from 'os';
import path from 'path';

/**
 * @param toPath 目标路径
 * @description 将路径转换为桌面路径
 * @example toDesktop('test.txt') => /Users/username/Desktop/test.txt
 * @returns 
 */
export function toDesktop(toPath: string) {
    const homedir = os.homedir();
    const desktopPath = path.join(homedir, 'Desktop', toPath);
    return desktopPath;
}

