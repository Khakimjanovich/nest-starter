import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { Permission } from "./entities/permission.entity";
import { GetIndexPermissionsDto } from "./dto/get-index-permissions.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Permissions")
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {
  }

  @ApiOperation({ summary: "Getting the list of the permissions!" })
  @ApiResponse({
    status: 200, schema: {
      example: {
        data: [
          {
            id: 1,
            name: "permissions.index",
            label: "Browse Permission",
            created_at: "2022-01-02",
            updated_at: "2022-01-02"
          }
        ],
        count: 3
      }
    }
  })
  @Get()
  index(@Query() { take, skip, keyword }: GetIndexPermissionsDto) {
    console.log(take, skip, keyword);
    return this.permissionsService.paginate({ take, skip, keyword });
  }

  @ApiOperation({ summary: "Getting the specific permission!" })
  @ApiResponse({
    status: 200, schema: {
      example: {
        "data": {
          "id": 1,
          "name": "permissions.index",
          "label": "Read permission edit",
          "created_at": "2022-08-08T13:35:58.000Z",
          "updated_at": "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Get(":id")
  show(@Param("id") id: string): Promise<{ data: Permission }> {
    return this.permissionsService.findOneById(+id);
  }

  @ApiOperation({ summary: "Storing a permission!" })
  @ApiResponse({
    status: 201, schema: {
      example: {
        "data": {
          "id": 1,
          "name": "permissions.index",
          "label": "Read permission edit",
          "created_at": "2022-08-08T13:35:58.000Z",
          "updated_at": "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Post()
  store(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @ApiOperation({ summary: "Updating a specific permission!" })
  @ApiResponse({
    status: 200, schema: {
      example: {
        "data": {
          "id": 1,
          "name": "permissions.index",
          "label": "Read permission edit",
          "created_at": "2022-08-08T13:35:58.000Z",
          "updated_at": "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<{ data: Permission }> {
    return this.permissionsService.update(+id, updatePermissionDto);
  }
}
