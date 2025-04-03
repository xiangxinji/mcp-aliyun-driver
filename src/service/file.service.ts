import { http } from "../utils/https.js";
import { BaseService } from "./base.service.js";
import {
  IFileCopyResult,
  IFileListItem,
  IFileListResult,
  IFileMoveResult,
} from "../typings/file.js";

export class FileService extends BaseService {
  /**
   * 文件列表
   * @param param0
   * @returns
   */
  async GetFileList({
    drive_id,
    limit = 100,
    type = "all",
    parent_file_id = "root",
  }: {
    drive_id: string;
    limit?: number;
    parent_file_id?: string;
    type?: "all" | "file" | "folder";
  }) {
    const response = await http.post<IFileListResult>(
      "/adrive/v1.0/openFile/list",
      {
        drive_id,
        limit,
        type,
        parent_file_id,
      }
    );

    return response.data;
  }

  /**
   * 搜索文件列表
   */
  async SearchFileList({
    drive_id,
    limit = 100,
    query,
  }: {
    drive_id: string;
    limit?: number;
    query: string;
  }) {
    const response = await http.post<IFileListResult>(
      "/adrive/v1.0/openFile/search",
      {
        drive_id,
        limit,
        return_total_count: true,
        query,
      }
    );
    return response.data;
  }

  /**
   * 获取文件详情信息
   */
  async GetFileInfo({
    drive_id,
    file_id,
  }: {
    drive_id: string;
    file_id: string;
  }) {
    const response = await http.post<IFileListItem>(
      "/adrive/v1.0/openFile/get",
      {
        drive_id,
        file_id,
      }
    );
    return response.data;
  }

  /**
   * 根据 Path 获取文件信息
   */
  async GetFileInfoByPath({
    drive_id,
    path,
  }: {
    drive_id: string;
    path: string;
  }) {
    const response = await http.post<IFileListItem>(
      "/adrive/v1.0/openFile/get_by_path",
      {
        drive_id,
        path,
      }
    );
    return response.data;
  }

  /**
   * 移动文件
   * @param param0
   * @returns
   */
  async MoveFile({
    drive_id,
    file_id,
    to_parent_file_id,
    check_name_mode = "ignore",
    new_name,
  }: {
    drive_id: string;
    file_id: string;
    to_parent_file_id: string;
    check_name_mode: "ignore" | "rename" | "refuse";
    new_name?: string;
  }) {
    return await http.post<IFileMoveResult>("/adrive/v1.0/openFile/move", {
      drive_id,
      file_id,
      to_parent_file_id,
      check_name_mode,
      new_name,
    });
  }

  /**
   * 复制文件
   * @param param0
   * @returns
   */
  async CopyFile({
    drive_id,
    file_id,
    to_parent_file_id,
    auto_rename,
  }: {
    drive_id: string;
    file_id: string;
    to_drive_id: string;
    to_parent_file_id: string;
    auto_rename: boolean;
  }) {
    return await http.post<IFileCopyResult>("/adrive/v1.0/openFile/copy", {
      drive_id,
      file_id,
      to_parent_file_id,
      auto_rename,
    });
  }
}
