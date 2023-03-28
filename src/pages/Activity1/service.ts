interface GiveScoreRequest {
  cgId: number,
  cgName: string,
  activityId: number,
  activityName: string,	
  commentContent?: string,
  score: number,	
  userCode: number,
  userName: string,
  extra?: string	
}

interface GetMainCommentListRequest {
  activityId: number; // cg活动id	
  circleId: number; //评论人工号	
  pageNo: number;
  pageSize?: number
}
interface SubmitMainCommentRequest {
  appCode: string; // cg-app	
  entityId: number; // 评论实体	
  content: string; // 评论内容	
  commenter: string; // 评论人	
  commenterCode: number; // 评论人工号	
  extra?: string; // 扩展信息	
  module: number; // 评论模块	
  idempotent: string; // 接口幂等字段
}

interface SubmitReplyCommentRequest {
  commentId: number; // 主评论id	
  appCode: string; // app标识	
  entityId: string; // 评论实体id	
  content: string; // 评论内容	
  commenter: string; // 评论人姓名	
  commenterCode: number; // 评论人工号	
  extra?: string; //扩展信息	
  parentId?: number; // 回复评论id, 若回复的是主评论，该字段可以为null	
  idempotent: string; // 接口幂等字段	
  module: string; // 应用模块标识
}

interface SubmitReplyCommentListRequest {
  id?: number;	 // 回复评论id	
  commentId: number; // 主评id	
  activityId: number; // 评论实体	
  circleId: number; // 应用模块标识
  pageNo: number;
  pageSize?: number;
}

interface DeleteMainCommentRequest {
  id: number; // 评论主键id	
  activityId: number; // 应用模块标识	
}

interface DeleteReplyCommentRequest {
  // appCode?: string; // app标识	
  // module: string; // 应用模块	
  // entityId?: string; // 评论实体	
  // commenterCode: number; // 评论人工号	
  id: number; //评论id
}

interface CommentLikeRequest {
  circleId: number; // 应用模块	
  activityId: number; // 评论实体	
  relationId: number; // 关联id	
  type: number; // 点赞类型，0=主评点赞; 1=复评点赞	
  liked: number; // 操作类型, 0=取消点赞; 1=点赞
}
class Activity1Service {
  //活动列表
 
  fetchActivity1List(_: any): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  //活动关注

  putFollowed(_: any): any {
    return new Promise((resolve, reject) => {
      resolve(true)
    });
  }

  // 关注列表

  getAllFollowedList(_: any): any{
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 活动搜索
  searchActivityList(_: any): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 取消关注

  // 主评论列表http://weapons.ke.com/project/8974/interface/api/711284

  getCommentList(_: Partial<GetMainCommentListRequest>): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 提交主评论

  submitMainComment(_: Partial<SubmitMainCommentRequest>): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 提交回复评论http://weapons.ke.com/project/8974/interface/api/712063

  submitReplyComment(_: Partial<SubmitReplyCommentRequest>): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 回复评论列表查询
  getReplyCommentList(_: Partial<SubmitReplyCommentListRequest>): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }


  deleteMainComment(_: Partial<DeleteMainCommentRequest>): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 删除回复评论http://weapons.ke.com/project/8974/interface/api/716838

  deleteReplyComment(_: Partial<DeleteReplyCommentRequest>): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 活动打分http://weapons.ke.com/project/8974/interface/api/717797

  giveScore(_: Partial<GiveScoreRequest>): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 评分详情

  getScoreDetail(_: any): any {
    return new Promise((resolve, reject) => {
      resolve([])
    });
  }

  // 评论点赞http://weapons.ke.com/project/8974/interface/api/716847
  commentLike(_: Partial<CommentLikeRequest>): any {
    return new Promise((resolve, reject) => {
      resolve(true)
    });
  }

  // 转发统计

  shareActivity(_: any): any {
    return new Promise((resolve, reject) => {
      resolve(10)
    });
  }
}

export default new Activity1Service();
