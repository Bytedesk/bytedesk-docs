import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "petstore/bytedesk-api-openapi-3-0",
    },
    {
      type: "category",
      label: "user",
      link: {
        type: "doc",
        id: "petstore/user",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "petstore/get-user-profile",
          label: "Get user profile",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "conversation",
      link: {
        type: "doc",
        id: "petstore/conversation",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "petstore/get-conversation-list",
          label: "Get conversation list",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "message",
      link: {
        type: "doc",
        id: "petstore/message",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "petstore/send-message",
          label: "Send a message",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "api-method post",
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
          id: "petstore/schemas/conversation",
          label: "Conversation",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "petstore/schemas/message",
          label: "Message",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "petstore/schemas/messagerequest",
          label: "MessageRequest",
          customProps: {
            apiLabel: "API Reference",
          },
          className: "schema",
        },
        {
          type: "doc",
          id: "petstore/schemas/apiresponse",
          label: "ApiResponse",
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
