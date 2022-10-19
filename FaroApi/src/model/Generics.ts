import { RowDataPacket } from "mysql2";

export interface KeywordDB extends RowDataPacket {
  keyword: string;
}

export interface selectCount extends RowDataPacket {
  countResult: number;
}
