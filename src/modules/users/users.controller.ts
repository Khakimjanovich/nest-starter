import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetIndexUsersDto } from "./dto/get-index-users.dto";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }


  @ApiOperation({ summary: "Getting the list of the users!" })
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
  index(@Query() { page, page_size, search }: GetIndexUsersDto) {
    return this.usersService.paginate({ page, page_size, search });
  }

  @Get(":id")
  show(@Param("id") id: string) {
    return this.usersService.findOneById(+id);
  }

  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch("/:id/password")
  updatePassword(@Param("id") id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(+id, updateUserPasswordDto);
  }
}
