import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "bytedesk/bytedesk-api",
    },
    {
      type: "category",
      label: "auth",
      link: {
        type: "doc",
        id: "bytedesk/auth",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "bytedesk/login-agent-with-access-token",
          label: "使用 AccessToken 登录（客服工作台）",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/login-admin-with-access-token",
          label: "使用 AccessToken 登录（管理后台）",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/refresh-token",
          label: "刷新 Bearer Token",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "bytedesk/login-with-password",
          label: "账号密码登录",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "bytedesk/logout",
          label: "退出登录",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "bytedesk/get-scan-qr-code",
          label: "获取扫码登录二维码",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/get-scan-status",
          label: "轮询扫码状态",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/confirm-scan-login",
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
        id: "bytedesk/users",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "bytedesk/get-current-user-profile",
          label: "获取当前用户信息",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/get-user-by-id",
          label: "获取用户信息",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/update-user",
          label: "更新用户",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "bytedesk/delete-user",
          label: "删除用户",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "bytedesk/list-users",
          label: "查询用户列表",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/create-user",
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
        id: "bytedesk/threads",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "bytedesk/list-threads",
          label: "查询会话列表",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/create-thread",
          label: "创建会话",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "bytedesk/get-thread-by-id",
          label: "获取会话详情",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/update-thread",
          label: "更新会话",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "bytedesk/delete-thread",
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
        id: "bytedesk/messages",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "bytedesk/send-message",
          label: "发送消息",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "bytedesk/get-message-by-id",
          label: "获取消息详情",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "bytedesk/delete-message",
          label: "删除消息",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "bytedesk/list-messages-by-thread",
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
          id: "bytedesk/schemas/authrequest",
          label: "AuthRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/authtoken",
          label: "AuthToken",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/tokenrefreshrequest",
          label: "TokenRefreshRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/user",
          label: "User",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/usercreaterequest",
          label: "UserCreateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/userupdaterequest",
          label: "UserUpdateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/thread",
          label: "Thread",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/threadcreaterequest",
          label: "ThreadCreateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/threadupdaterequest",
          label: "ThreadUpdateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/message",
          label: "Message",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/messagesendrequest",
          label: "MessageSendRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/apierror",
          label: "ApiError",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/scanqrcoderesponse",
          label: "ScanQRCodeResponse",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "bytedesk/schemas/scanstatusresponse",
          label: "ScanStatusResponse",
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
