import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("/register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Request() request) {
    return request.user;
  }
}
