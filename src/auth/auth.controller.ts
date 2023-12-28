import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {VersionedJsonController} from '../common/decorators/VersionedJsonController';
import {V1BaseRoute} from '../utils/routes/V1BaseRoute';
import {Get, Post, Request, UseGuards} from '@nestjs/common';
import {BaseRoute} from '../utils/routes/BaseRoute';
import {LocalAuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";

@VersionedJsonController(V1BaseRoute.API_VERSION, '/authentication')
@ApiBearerAuth('Authorization')
@ApiTags('Auth')
export class AuthController extends BaseRoute {
    constructor(private authService: AuthService) {
        super();
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
