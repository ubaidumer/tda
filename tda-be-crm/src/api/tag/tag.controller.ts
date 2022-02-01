import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { CreateTagValidationDecorator } from 'src/decorators/tag/createTagValidation.decorator';
import { GetAllTagValidationDecorator } from 'src/decorators/tag/getAllTagValidation.decorator';
import { UpdateTagActivateValidationDecorator } from 'src/decorators/tag/updateTagActivateValidation.decorator';
import { UpdateTagValidationDecorator } from 'src/decorators/tag/updateTagValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTagDto } from 'src/dto/tag/createTag.dto';
import { GetAllTagDto } from 'src/dto/tag/getAllTag.dto';
import { UpdateTagDto } from 'src/dto/tag/updateTag.dto';
import { UpdateTagActivateDto } from 'src/dto/tag/updateTagActivate.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
  async getTagList(@PaginationValidationDecorator() query: PaginationDto,
  @GetAllTagValidationDecorator() body:GetAllTagDto) {
    return await this.tagService.findTagList(query,body);
  }
  @Get('Active')
  @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
  async getActiveTagList(@PaginationValidationDecorator() query: PaginationDto,
  @GetAllTagValidationDecorator() body:GetAllTagDto) {
    body.is_activated=1;
    return await this.tagService.findTagList(query,body);
  }
  @Get('/:id')
  @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
  async getTagById(@IDValidationDecorator() param: {id:number}) {
    return await this.tagService.findTagById(param);
  }
  @Post()
  @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
  async postTag(@CreateTagValidationDecorator() body: CreateTagDto) {
    return await this.tagService.createTag(body);
  }
  @Patch('Activate/:id')
  @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
  async putTagStatusById(@IDValidationDecorator() param: {id:number},@UpdateTagActivateValidationDecorator() body:UpdateTagActivateDto) {
    return await this.tagService.updateTagStatus(param,body);
  }
  @Put('/:id')
  @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
  async putTagById(@IDValidationDecorator() param: {id:number}, @UpdateTagValidationDecorator() body:UpdateTagDto) {
    return await this.tagService.updatedTag(param, body);
  }
  @Patch('BulkActivate')
  @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
  async putTagBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateTagActivateValidationDecorator() body2:UpdateTagActivateDto) {
    return await this.tagService.updateTagBulkStatus(body1,body2);
  }
}
