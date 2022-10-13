import { OkPacket } from "mysql2";
import { dbPublic } from "../../databaseCon/Database";
import { KeywordDB, selectCount } from "../../model/Generics";

export class KeywordDAO {
  getKeywordsByCareer(careerId: number): Promise<string[]> {
    const keywords: string[] = [];
    return new Promise((resolve, reject) => {
      dbPublic.query<KeywordDB[]>(
        "select * from KEYWORD natural join CAREER_KEYWORD where idCareer= ?",
        [careerId],
        (err, res) => {
          if (err) reject(err);
          else {
            res.forEach((word) => {
              keywords.push(word.keyword);
            });
            resolve(keywords);
          }
        }
      );
    });
  }

  getKeywords(): Promise<KeywordDB[]> {
    return new Promise((resolve, reject) => {
      dbPublic.query<KeywordDB[]>("select * from KEYWORD", async (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });
  }
}