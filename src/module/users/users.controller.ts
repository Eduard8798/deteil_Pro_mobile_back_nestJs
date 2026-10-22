import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  MessageResponseDTO,
  UpdateUserDTO, UpdateUserPassword,
  UserResponseDTO,
  UserSummaryDTO,
} from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('user-order-list')
  @ApiOperation({
    summary: 'User summary',
    description:
      'Returns short information about the authenticated user. Use GET /order to get the full order list.',
  })
  @ApiOkResponse({
    type: UserSummaryDTO,
    description: 'User information has been retrieved successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Bearer token is missing or invalid.',
  })
  getOrderList(@Req() req) {
    return this.userService.getOrderList(req.user);
  }

  // @Post('create-user')
  // createUsers(@Body() dto: CreateUserDTO) {
  //     return this.userService.createUser(dto);
  // }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('update-user')
  @ApiOperation({
    summary: 'Update profile',
    description: 'Updates the authenticated user name or phone number.',
  })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({
    type: UserResponseDTO,
    description: 'The user profile has been updated successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Bearer token is missing or invalid.',
  })
  updateUser(@Body() dto: UpdateUserDTO, @Req() req) {
    const updateUserId = req.user.id;

    return this.userService.updateUser(dto, updateUserId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('update-password')
  @ApiOperation({
    summary: 'Update password',
    description: 'Updates the password for the specified phone number.',
  })
  @ApiBody({ type: UpdateUserPassword })
  @ApiOkResponse({
    description: 'The password has been updated successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Bearer token is missing or invalid.',
  })
  userUpdatePassword(@Body() dto: UpdateUserPassword) {
    return this.userService.updatePassword(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description:
      'Deletes a user by ID. This operation is allowed only for users with the ADMIN role.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID of the user to delete.',
  })
  @ApiOkResponse({
    type: MessageResponseDTO,
    description:
      'Deletion result or a message that the current user has insufficient permissions.',
  })
  @ApiUnauthorizedResponse({
    description: 'Bearer token is missing or invalid.',
  })
  deleteUser(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const deleteUserId = req.user.id;

    return this.userService.deleteUser(deleteUserId, id);
  }
}
