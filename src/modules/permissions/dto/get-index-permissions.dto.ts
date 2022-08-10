import { Transform } from "class-transformer";

export class GetIndexPermissionsDto {
  @Transform(({ value }) => parseInt(value))
  take: string;
  @Transform(({ value }) => parseInt(value))
  skip: string;

  keyword: string;
}