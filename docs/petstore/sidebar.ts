import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "petstore/bytedesk-api-accesstoken-rest",
    },
    {
      type: "category",
      label: "authentication",
      link: {
        type: "doc",
        id: "petstore/authentication",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "petstore/login-agent-with-access-token",
          label: "使用 AccessToken 登录（客服工作台）",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "petstore/login-admin-with-access-token",
          label: "使用 AccessToken 登录（管理后台）",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "users",
      link: {
        type: "doc",
        id: "petstore/users",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "petstore/get-current-user-profile",
          label: "获取当前用户信息",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "tickets",
      link: {
        type: "doc",
        id: "petstore/tickets",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "petstore/list-tickets",
          label: "获取工单列表",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "petstore/create-ticket",
          label: "创建工单",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "petstore/update-ticket",
          label: "更新工单",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "petstore/delete-ticket",
          label: "删除工单",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method delete",
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
          id: "petstore/schemas/user",
          label: "User",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "petstore/schemas/ticket",
          label: "Ticket",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "petstore/schemas/ticketcreaterequest",
          label: "TicketCreateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "petstore/schemas/ticketupdaterequest",
          label: "TicketUpdateRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "petstore/schemas/apierror",
          label: "ApiError",
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
