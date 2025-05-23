import {DBModel} from '@/database/_deprecated/core/types/db';
import {DB_File, DB_FileSchema} from '@/database/_deprecated/schemas/files';
import {clientS3Storage} from '@/services/file/ClientS3';
import {nanoid} from '@/utils/uuid';

import {BaseModel} from '../core';
import {createHeaderWithAuth} from "@/services/_auth";

class _FileModel extends BaseModel<'files'> {
  constructor() {
    super('files', DB_FileSchema);
  }

  async create(file: DB_File) {
    const id = nanoid();

    return this._addWithSync(file, `file-${id}`);
  }

  async findById(id: string): Promise<DBModel<DB_File> | undefined> {
    const item = await this.table.get(id);
    if (!item) return;
    let arrayBuffer = item.data;
    if (!arrayBuffer) {
      const hash = (item.url as string).replace('client-s3://', '');
      const fileItem = await clientS3Storage.getObject(hash);
      if (!fileItem) throw new Error('file not found');
      arrayBuffer = await fileItem.arrayBuffer()
    }
    let base64 = Buffer.from(arrayBuffer).toString('base64');
    let accessUrl = item.accessUrl;
    if (!accessUrl) {
      if (process.env.NEXT_PUBLIC_UPLOAD_URL) {
        const headers = await createHeaderWithAuth()
        const fd = new FormData()
        fd.append('file', new File([arrayBuffer], item.name))
        try {
          const res = await fetch(process.env.NEXT_PUBLIC_UPLOAD_URL, {
            body: fd,
            headers: headers,
            method: 'POST'
          })
          const resJson = await res.json()
          accessUrl = resJson.url
          this.table.update(id, {...item, accessUrl})
        } catch (e) {
          console.error(e)
        }
      } else {
        accessUrl = `data:${item.fileType};base64,${base64}`
      }
    }
    return {...item, base64, url: accessUrl};
  }

  async delete(id: string) {
    return this.table.delete(id);
  }

  async clear() {
    return this.table.clear();
  }
}

export const FileModel = new _FileModel();
