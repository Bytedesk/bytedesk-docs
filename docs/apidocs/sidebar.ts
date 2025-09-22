import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
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
          id: "api/login-agent-with-access-token",
          label: "使用 AccessToken 登录（客服工作台）",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
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
          id: "api/admin-change-password",
          label: "管理员重置成员密码",
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
          id: "api/list-messages-by-thread",
          label: "获取会话消息列表",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
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
      ],
    },
  ],
};

export default sidebar.apisidebar;
