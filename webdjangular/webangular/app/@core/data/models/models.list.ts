import { UserModel } from './User.model';
import { GroupModel } from './Group.model';
import { PermissionModel } from './Permission.model';
import { ContentTypeModel } from './ContentType.model';
import { PageModel } from './Page.model';

export var modelList = {
	User: UserModel,
	Group: GroupModel,
	Page: PageModel,
	Permission: PermissionModel,
	ContentType: ContentTypeModel
}