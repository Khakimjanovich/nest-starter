import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { Permission } from "./entities/permission.entity";
import { GetIndexPermissionsDto } from "./dto/get-index-permissions.dto";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {
  }

  @Get()
  index(@Query() { take, skip, keyword }: GetIndexPermissionsDto) {
    console.log(take,skip,keyword)
    return this.permissionsService.paginate({ take, skip, keyword });
  }

  @Get(":id")
  show(@Param("id") id: string): Promise<{ data: Permission }> {
    return this.permissionsService.findOneById(+id);
  }

  @Post()
  store(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<{ data: Promise<Permission> }> {
    return this.permissionsService.update(+id, updatePermissionDto);
  }
}
