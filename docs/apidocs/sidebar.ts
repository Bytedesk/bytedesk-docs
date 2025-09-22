import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Authentication",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/bytedesk-api",
        },
        {
          type: "category",
          label: "auth",
          link: {
            type: "doc",
            id: "api/auth",
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/login-admin-with-access-token",
              label: "使用 AccessToken 登录（管理后台）",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/refresh-token",
              label: "刷新 Bearer Token",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/register",
              label: "用户注册",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/login-with-username-password",
              label: "用户名密码登录",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/send-mobile-code",
              label: "发送短信验证码",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/login-with-mobile-code",
              label: "手机号验证码登录",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/send-email-code",
              label: "发送邮箱验证码",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/login-with-email-code",
              label: "邮箱验证码登录",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/login-with-access-token",
              label: "使用 AccessToken 登录",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/get-scan-qr-code",
              label: "获取扫码登录二维码",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/get-scan-status",
              label: "轮询扫码状态",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/confirm-scan-login",
              label: "扫码确认登录",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/bytedesk-api",
        },
        {
          type: "category",
          label: "users",
          link: {
            type: "doc",
            id: "api/users",
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/get-current-user-profile",
              label: "获取当前用户信息",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/change-password",
              label: "用户修改密码",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/change-email",
              label: "修改邮箱",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/change-mobile",
              label: "修改手机号",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/user-logout",
              label: "用户登出",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/get-user-by-id",
              label: "获取用户信息",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/update-user",
              label: "更新用户",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method put",
            },
            {
              type: "doc",
              id: "api/delete-user",
              label: "删除用户",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method delete",
            },
            {
              type: "doc",
              id: "api/list-users",
              label: "查询用户列表",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/create-user",
              label: "创建用户",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "IM",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/bytedesk-api",
        },
        {
          type: "category",
          label: "threads",
          link: {
            type: "doc",
            id: "api/threads",
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/list-threads",
              label: "查询会话列表",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/create-thread",
              label: "创建会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/get-thread-by-id",
              label: "获取会话详情",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/update-thread",
              label: "更新会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method put",
            },
            {
              type: "doc",
              id: "api/delete-thread",
              label: "删除会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method delete",
            },
            {
              type: "doc",
              id: "api/query-threads-by-invite",
              label: "查询邀请会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-threads-by-topic",
              label: "根据主题查询会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-threads-by-topic-and-owner",
              label: "根据主题和用户查询会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-threads-by-user-topics",
              label: "根据用户UID查询所有会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/update-thread-top",
              label: "更新会话置顶状态",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-star",
              label: "更新会话标星状态",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-mute",
              label: "更新会话静音状态",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-hide",
              label: "更新会话隐藏状态",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-fold",
              label: "更新会话折叠状态",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-user",
              label: "更新会话用户信息",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-tag-list",
              label: "更新会话标签列表",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-unread",
              label: "更新会话未读状态",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-thread-note",
              label: "更新会话备注",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/close-thread",
              label: "关闭会话",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
          ],
        },
        {
          type: "category",
          label: "messages",
          link: {
            type: "doc",
            id: "api/messages",
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/send-message",
              label: "发送消息",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/get-message-by-id",
              label: "获取消息详情",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/delete-message",
              label: "删除消息",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method delete",
            },
            {
              type: "doc",
              id: "api/query-unread-messages",
              label: "查询未读消息（迁移到企业版）",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "menu__list-item--deprecated api-method get",
            },
            {
              type: "doc",
              id: "api/query-messages-by-thread-topic",
              label: "根据主题查询消息",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-messages-by-thread-uid",
              label: "根据会话UID查询消息",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/send-rest-message",
              label: "发送离线消息（REST）",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/mark-message-as-read",
              label: "标记消息为已读（迁移到企业版）",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "menu__list-item--deprecated api-method post",
            },
            {
              type: "doc",
              id: "api/mark-thread-messages-as-read",
              label: "批量标记会话消息为已读（迁移到企业版）",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "menu__list-item--deprecated api-method post",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Tickets",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/bytedesk-api",
        },
        {
          type: "category",
          label: "tickets",
          link: {
            type: "doc",
            id: "api/tickets",
          },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "api/query-tickets-by-topic",
              label: "根据主题查询工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-tickets-by-thread-uid",
              label: "根据会话UID查询工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-tickets-by-org",
              label: "按组织查询工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-tickets-by-user",
              label: "按用户查询工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/get-ticket-by-uid",
              label: "根据UID查询工单详情",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/create-ticket",
              label: "新建工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/update-ticket",
              label: "更新工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/delete-ticket-by-uid",
              label: "删除工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/claim-ticket",
              label: "认领工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/start-ticket",
              label: "开始处理工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/unclaim-ticket",
              label: "退回工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/transfer-ticket",
              label: "转派工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/hold-ticket",
              label: "挂起工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/resume-ticket",
              label: "恢复工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/pend-ticket",
              label: "待回应工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/reopen-ticket",
              label: "重新打开工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/escalate-ticket",
              label: "升级工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/resolve-ticket",
              label: "完成工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/verify-ticket",
              label: "客户验证工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/close-ticket-action",
              label: "关闭工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/cancel-ticket",
              label: "取消工单",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method post",
            },
            {
              type: "doc",
              id: "api/query-ticket-task-history",
              label: "查询工单任务历史",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-ticket-process-history",
              label: "查询工单流程实例历史",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
            {
              type: "doc",
              id: "api/query-ticket-activity-history",
              label: "查询工单活动历史",
              customProps: {
                apiLabel: "API Reference",
              },
              className: "api-method get",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/schemas/authrequest",
          label: "AuthRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/authresponse",
          label: "AuthResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/authtoken",
          label: "AuthToken",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/tokenrefreshrequest",
          label: "TokenRefreshRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/user",
          label: "User",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/userrequest",
          label: "UserRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/usercreaterequest",
          label: "UserCreateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/userupdaterequest",
          label: "UserUpdateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/thread",
          label: "Thread",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/threadcreaterequest",
          label: "ThreadCreateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/threadupdaterequest",
          label: "ThreadUpdateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/threadrequest",
          label: "ThreadRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/threadresponse",
          label: "ThreadResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/messagerequest",
          label: "MessageRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/messageresponse",
          label: "MessageResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/userprotobuf",
          label: "UserProtobuf",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/message",
          label: "Message",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/messagesendrequest",
          label: "MessageSendRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/apierror",
          label: "ApiError",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/scanqrcoderesponse",
          label: "ScanQRCodeResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/scanstatusresponse",
          label: "ScanStatusResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/changepasswordrequest",
          label: "ChangePasswordRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/adminchangepasswordrequest",
          label: "AdminChangePasswordRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/changeemailrequest",
          label: "ChangeEmailRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/changemobilerequest",
          label: "ChangeMobileRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/codesendrequest",
          label: "CodeSendRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/okresponse",
          label: "OkResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/ticketrequest",
          label: "TicketRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/ticketattachmentresponse",
          label: "TicketAttachmentResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/ticketresponse",
          label: "TicketResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/tickethistorytaskresponse",
          label: "TicketHistoryTaskResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/tickethistoryprocessresponse",
          label: "TicketHistoryProcessResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/tickethistoryactivityresponse",
          label: "TicketHistoryActivityResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
